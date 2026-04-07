-- ============================================================
-- AZKALI — Schema SQL para Supabase (PostgreSQL)
-- VibeCoders · Talent Hackathon 2026
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLA: users
-- ============================================================
CREATE TABLE users (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             VARCHAR(120)    NOT NULL,
  email            VARCHAR(255)    NOT NULL,
  user_type        VARCHAR(20)     NOT NULL CHECK (user_type IN ('banked', 'unbanked', 'informal')),
  declared_income  DECIMAL(12,2),
  is_banked        BOOLEAN         NOT NULL DEFAULT FALSE,
  resilience_score INT             NOT NULL DEFAULT 0 CHECK (resilience_score >= 0 AND resilience_score <= 1000),
  last_active_at   TIMESTAMP,
  created_at       TIMESTAMP       NOT NULL DEFAULT NOW(),

  CONSTRAINT users_email_unique UNIQUE (email)
);

-- ============================================================
-- TABLA: bank_accounts
-- ============================================================
CREATE TABLE bank_accounts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_type VARCHAR(30)     NOT NULL CHECK (account_type IN ('guardadito', 'tarjeta_azteca', 'manual')),
  balance      DECIMAL(12,2)   NOT NULL DEFAULT 0,
  status       VARCHAR(20)     NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'closed')),
  synced_at    TIMESTAMP,

  -- Un usuario no puede tener dos cuentas del mismo tipo
  CONSTRAINT bank_accounts_user_type_unique UNIQUE (user_id, account_type)
);

-- Usuarios no bancarizados solo pueden tener 1 cuenta de tipo manual
CREATE OR REPLACE FUNCTION check_manual_account_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.account_type = 'manual' THEN
    IF (SELECT COUNT(*) FROM bank_accounts
        WHERE user_id = NEW.user_id AND account_type = 'manual') > 0 THEN
      RAISE EXCEPTION 'Un usuario no bancarizado solo puede tener una cuenta de tipo manual.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_manual_account_limit
  BEFORE INSERT ON bank_accounts
  FOR EACH ROW EXECUTE FUNCTION check_manual_account_limit();

-- Sincronizar is_banked en users cuando cambia bank_accounts
CREATE OR REPLACE FUNCTION sync_is_banked()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET is_banked = EXISTS (
    SELECT 1 FROM bank_accounts
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
      AND account_type != 'manual'
      AND status = 'active'
  )
  WHERE id = COALESCE(NEW.user_id, OLD.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_is_banked
  AFTER INSERT OR UPDATE OR DELETE ON bank_accounts
  FOR EACH ROW EXECUTE FUNCTION sync_is_banked();

-- ============================================================
-- TABLA: frozen_purchases
-- ============================================================
CREATE TABLE frozen_purchases (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_name     VARCHAR(255)  NOT NULL,
  amount           DECIMAL(12,2) NOT NULL CHECK (amount > 0),
  category         VARCHAR(60)   NOT NULL,
  impulsivity_score INT          CHECK (impulsivity_score >= 0 AND impulsivity_score <= 100),
  status           VARCHAR(20)   NOT NULL DEFAULT 'frozen' CHECK (status IN ('frozen', 'converted', 'ignored', 'expired')),
  frozen_until     TIMESTAMP,
  created_at       TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_frozen_purchases_user_id ON frozen_purchases(user_id);
CREATE INDEX idx_frozen_purchases_status  ON frozen_purchases(status);

-- ============================================================
-- TABLA: savings_goals
-- ============================================================
CREATE TABLE savings_goals (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  frozen_purchase_id  UUID          REFERENCES frozen_purchases(id) ON DELETE SET NULL,
  title               VARCHAR(255)  NOT NULL,
  target_amount       DECIMAL(12,2) NOT NULL CHECK (target_amount > 0),
  current_amount      DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
  status              VARCHAR(20)   NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  target_date         TIMESTAMP
);

CREATE INDEX idx_savings_goals_user_id ON savings_goals(user_id);

-- ============================================================
-- TABLA: group_challenges
-- ============================================================
CREATE TABLE group_challenges (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(150)  NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL CHECK (target_amount > 0),
  invite_code   VARCHAR(12)   NOT NULL,
  status        VARCHAR(20)   NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at    TIMESTAMP     NOT NULL DEFAULT NOW(),

  CONSTRAINT group_challenges_invite_code_unique UNIQUE (invite_code)
);

-- ============================================================
-- TABLA: group_members
-- ============================================================
CREATE TABLE group_members (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id           UUID          NOT NULL REFERENCES group_challenges(id) ON DELETE CASCADE,
  user_id            UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contributed_amount DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (contributed_amount >= 0),
  role               VARCHAR(10)   NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member')),

  -- Un usuario no puede aparecer dos veces en el mismo reto
  CONSTRAINT group_members_group_user_unique UNIQUE (group_id, user_id)
);

CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_user_id  ON group_members(user_id);

-- ============================================================
-- TABLA: streaks
-- ============================================================
CREATE TABLE streaks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_member_id UUID        REFERENCES group_members(id) ON DELETE CASCADE,
  type            VARCHAR(12) NOT NULL CHECK (type IN ('individual', 'group')),
  current_count   INT         NOT NULL DEFAULT 0 CHECK (current_count >= 0),
  max_count       INT         NOT NULL DEFAULT 0 CHECK (max_count >= 0),
  is_active       BOOLEAN     NOT NULL DEFAULT TRUE,
  last_check_in   TIMESTAMP,

  -- Cada membresía tiene exactamente una racha grupal
  CONSTRAINT streaks_group_member_unique UNIQUE (group_member_id),

  -- Si type = 'group', group_member_id es obligatorio
  CONSTRAINT streaks_group_requires_member
    CHECK (type != 'group' OR group_member_id IS NOT NULL),

  -- Si type = 'individual', group_member_id debe ser null
  CONSTRAINT streaks_individual_requires_no_member
    CHECK (type != 'individual' OR group_member_id IS NULL)
);

CREATE INDEX idx_streaks_user_id ON streaks(user_id);

-- Cada usuario tiene exactamente una racha individual (índice parcial)
CREATE UNIQUE INDEX streaks_individual_unique ON streaks(user_id, type) WHERE (type = 'individual');

-- Crear racha individual automáticamente al registrar un usuario
CREATE OR REPLACE FUNCTION create_individual_streak()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO streaks (user_id, type)
  VALUES (NEW.id, 'individual');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_create_individual_streak
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION create_individual_streak();

-- Crear racha grupal automáticamente al unirse a un reto
CREATE OR REPLACE FUNCTION create_group_streak()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO streaks (user_id, group_member_id, type)
  VALUES (NEW.user_id, NEW.id, 'group');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_create_group_streak
  AFTER INSERT ON group_members
  FOR EACH ROW EXECUTE FUNCTION create_group_streak();

-- ============================================================
-- TABLA: tokens
-- ============================================================
CREATE TABLE tokens (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance        INT  NOT NULL DEFAULT 0 CHECK (balance >= 0),
  total_earned   INT  NOT NULL DEFAULT 0 CHECK (total_earned >= 0),
  total_redeemed INT  NOT NULL DEFAULT 0 CHECK (total_redeemed >= 0),

  CONSTRAINT tokens_user_unique UNIQUE (user_id)
);

-- Crear billetera de tokens automáticamente al registrar un usuario
CREATE OR REPLACE FUNCTION create_user_tokens()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO tokens (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_create_user_tokens
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION create_user_tokens();

-- ============================================================
-- TABLA: token_transactions
-- ============================================================
CREATE TABLE token_transactions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason     VARCHAR(80) NOT NULL,
  amount     INT         NOT NULL CHECK (amount > 0),
  type       VARCHAR(10) NOT NULL CHECK (type IN ('earn', 'redeem')),
  created_at TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_token_transactions_user_id ON token_transactions(user_id);

-- Actualizar balance en tokens al registrar una transacción
CREATE OR REPLACE FUNCTION apply_token_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'earn' THEN
    UPDATE tokens
    SET balance      = balance + NEW.amount,
        total_earned = total_earned + NEW.amount
    WHERE user_id = NEW.user_id;
  ELSIF NEW.type = 'redeem' THEN
    UPDATE tokens
    SET balance        = balance - NEW.amount,
        total_redeemed = total_redeemed + NEW.amount
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_apply_token_transaction
  AFTER INSERT ON token_transactions
  FOR EACH ROW EXECUTE FUNCTION apply_token_transaction();

-- ============================================================
-- TABLA: rewards_catalog
-- ============================================================
CREATE TABLE rewards_catalog (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(150) NOT NULL,
  partner     VARCHAR(60)  NOT NULL,
  token_cost  INT          NOT NULL CHECK (token_cost > 0),
  reward_type VARCHAR(20)  NOT NULL CHECK (reward_type IN ('physical', 'virtual', 'financial')),
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE
);

-- ============================================================
-- TABLA: redemptions
-- ============================================================
CREATE TABLE redemptions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id    UUID        NOT NULL REFERENCES rewards_catalog(id),
  tokens_spent INT         NOT NULL CHECK (tokens_spent > 0),
  status       VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  barcode_code VARCHAR(60),
  redeemed_at  TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_redemptions_user_id ON redemptions(user_id);

-- ============================================================
-- TABLA: purchase_analyses
-- ============================================================
CREATE TABLE purchase_analyses (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  frozen_purchase_id  UUID      REFERENCES frozen_purchases(id) ON DELETE SET NULL,
  impulsivity_score   INT       NOT NULL CHECK (impulsivity_score >= 0 AND impulsivity_score <= 100),
  ai_verdict          TEXT,
  opportunity_cost_note TEXT,
  chat_history        JSONB,
  analyzed_at         TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_purchase_analyses_user_id           ON purchase_analyses(user_id);
CREATE INDEX idx_purchase_analyses_frozen_purchase_id ON purchase_analyses(frozen_purchase_id);
