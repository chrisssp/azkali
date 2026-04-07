# Supabase — Azkali

Documentación del backend local con Supabase para el proyecto **Azkali**. Este directorio contiene la configuración, migraciones y estructura de base de datos del proyecto.

---

## Tabla de contenidos

- [Requisitos](#requisitos)
- [Instalación del CLI](#instalación-del-cli)
- [Levantar el entorno local](#levantar-el-entorno-local)
- [Servicios y puertos](#servicios-y-puertos)
- [Estructura del directorio](#estructura-del-directorio)
- [Esquema de base de datos](#esquema-de-base-de-datos)
- [Migraciones](#migraciones)
- [Variables de entorno](#variables-de-entorno)
- [Comandos útiles](#comandos-útiles)

---

## Requisitos

Antes de levantar Supabase localmente asegúrate de tener instalado:

| Herramienta | Versión mínima | Instalación |
|---|---|---|
| [Docker](https://docs.docker.com/get-docker/) | 20+ | Requerido para correr los servicios |
| [Supabase CLI](https://supabase.com/docs/guides/cli) | 1.0+ | Ver sección abajo |
| [pnpm](https://pnpm.io/) | 9.0+ | `npm install -g pnpm` |
| [Node.js](https://nodejs.org/) | 18+ | Requerido por el CLI via pnpm |

> **Importante:** Docker debe estar corriendo antes de ejecutar cualquier comando de Supabase.

---

## Instalación del CLI

El CLI de Supabase es un binario Go. En Linux la forma más confiable es descargarlo directamente desde GitHub Releases.

### Linux (Fedora, Ubuntu, Arch, etc.)

```bash
# Descargar y extraer el binario
curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz \
  -o /tmp/supabase.tar.gz
tar -xzf /tmp/supabase.tar.gz -C /tmp

# Mover al directorio local de binarios (ya está en el PATH)
mv /tmp/supabase ~/.local/bin/

# Verificar la instalación
supabase --version
```

> Si `~/.local/bin` no existe, créalo con `mkdir -p ~/.local/bin` y asegúrate de que esté en tu PATH agregando `export PATH="$HOME/.local/bin:$PATH"` a tu `~/.bashrc`.

### macOS

```bash
brew install supabase/tap/supabase
```

### Windows

```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

---

## Levantar el entorno local

```bash
# 1. Asegúrate de que Docker esté corriendo
sudo systemctl start docker      
# Linux (systemd)
# o abre Docker Desktop manualmente

# 2. Desde la raíz del monorepo
cd /home/<usuario>/Documentos/AZTECA/azkali

# 3. Levantar todos los servicios
supabase start
```

Al finalizar, el CLI imprimirá las URLs y claves generadas automáticamente:

```
╭──────────────────────────────────────╮
│ 🔧 Development Tools                 │
├─────────┬────────────────────────────┤
│ Studio  │ http://127.0.0.1:54323     │
│ Mailpit │ http://127.0.0.1:54324     │
│ MCP     │ http://127.0.0.1:54321/mcp │
╰─────────┴────────────────────────────╯

╭──────────────────────────────────────────────────────╮
│ 🌐 APIs                                              │
├────────────────┬─────────────────────────────────────┤
│ Project URL    │ http://127.0.0.1:54321              │
│ REST           │ http://127.0.0.1:54321/rest/v1      │
│ GraphQL        │ http://127.0.0.1:54321/graphql/v1   │
│ Edge Functions │ http://127.0.0.1:54321/functions/v1 │
╰────────────────┴─────────────────────────────────────╯

╭───────────────────────────────────────────────────────────────╮
│ ⛁ Database                                                    │
├─────┬─────────────────────────────────────────────────────────┤
│ URL │ postgresql://postgres:postgres@127.0.0.1:54322/postgres │
╰─────┴─────────────────────────────────────────────────────────╯

╭──────────────────────────────────────────────────────────────╮
│ 🔑 Authentication Keys                                       │
├─────────────┬────────────────────────────────────────────────┤
│ Publishable │ <anon-key-generada>                             │
│ Secret      │ <service-role-key-generada>                     │
╰─────────────┴────────────────────────────────────────────────╯
```

> ⚠️ Estas claves son valores por defecto del entorno local. **No las uses en producción.**

---

## Servicios y puertos

| Servicio | Puerto | Descripción |
|---|---|---|
| **REST API** (PostgREST) | `54321` | Endpoints REST y GraphQL automáticos |
| **Base de datos** (Postgres 17) | `54322` | Conexión directa a PostgreSQL |
| **Supabase Studio** | `54323` | Interfaz visual para gestionar la BD |
| **Inbucket** (emails) | `54324` | Captura emails de prueba localmente |
| **Analytics** | `54327` | Logs y analítica del proyecto |
| **Edge Runtime** (Deno 2) | `54321/functions/v1/` | Funciones Edge accesibles via API URL |
| **Inspector Edge** | `8083` | Debugger Chrome para funciones Edge |

---

## Estructura del directorio

```
supabase/
├── config.toml          # Configuración principal del proyecto local
├── migrations/          # Migraciones SQL versionadas
│   └── 20260406023404_init_azkali.sql   # Migración inicial
└── README.md            # Este archivo
```

---

## Esquema de base de datos

### `profiles`

Perfil extendido del usuario, vinculado a `auth.users`.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid` (PK) | Referencia a `auth.users`, se elimina en cascada |
| `username` | `text` (unique) | Nombre de usuario único |
| `tokens_discipline` | `integer` | Tokens de disciplina acumulados (default `0`) |
| `current_level` | `integer` | Nivel actual del usuario (default `1`) |
| `updated_at` | `timestamptz` | Última actualización (default `now()`) |

---

### `impulse_freezer`

Registra compras impulsivas que el usuario decide "congelar" antes de realizar.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid` (PK) | ID generado automáticamente |
| `user_id` | `uuid` (FK) | Referencia a `auth.users` |
| `item_name` | `text` | Nombre del artículo que se quiere comprar |
| `amount` | `numeric(10,2)` | Precio del artículo |
| `impulsivity_score` | `integer` | Puntuación de impulsividad calculada |
| `frozen_until` | `timestamptz` | Fecha hasta la que está congelada la compra (default `+24h`) |
| `status` | `text` | Estado: `frozen`, `saved` o `spent` |
| `created_at` | `timestamptz` | Fecha de creación |

---

### `social_vaults`

Alcancías colaborativas o grupales con una meta de ahorro.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid` (PK) | ID generado automáticamente |
| `name` | `text` | Nombre de la alcancía |
| `target_amount` | `numeric(10,2)` | Meta de ahorro |
| `current_amount` | `numeric(10,2)` | Monto acumulado actual (default `0`) |
| `created_by` | `uuid` (FK) | Usuario que creó la alcancía |
| `created_at` | `timestamptz` | Fecha de creación |

---

## Migraciones

Las migraciones se encuentran en `supabase/migrations/` y se aplican en orden cronológico por el prefijo de timestamp en su nombre.

### Crear una nueva migración

```bash
# Genera un archivo SQL vacío con el timestamp actual
supabase migration new <nombre_descriptivo>

# Ejemplo:
supabase migration new add_transactions_table
```

### Aplicar migraciones

```bash
# Resetea la BD y aplica todas las migraciones desde cero
supabase db reset

# Ver estado de las migraciones aplicadas
supabase migration list
```

### Migrar desde la BD local hacia remota

```bash
supabase db push
```

---

## Variables de entorno

Las variables **no se deben commitear** al repositorio. Crea un archivo `.env.local` en la raíz del monorepo basándote en el siguiente ejemplo:

```env
# Supabase local — Expo usa el prefijo EXPO_PUBLIC_ para exponer vars al cliente
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key-del-supabase-start>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-del-supabase-start>

# Supabase producción (solo en CI/CD o entorno de prod)
# EXPO_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
# EXPO_PUBLIC_SUPABASE_ANON_KEY=<produccion-anon-key>

# Opcional: OpenAI para Supabase Studio AI
OPENAI_API_KEY=<tu-api-key>
```

> Las claves `anon key` y `service_role key` las genera `supabase start` automáticamente para el entorno local.

---

## Comandos útiles

```bash
# Levantar todos los servicios (Studio abre automáticamente en http://127.0.0.1:54323)
supabase start

# Detener todos los servicios
supabase stop

# Ver estado actual y URLs/keys
supabase status

# Resetear BD y re-aplicar migraciones + seeds
supabase db reset

# Crear nueva migración vacía
supabase migration new <nombre>

# Ver migraciones aplicadas
supabase migration list

# Comparar BD local vs remota y generar diff
supabase db diff

# Subir cambios a Supabase remoto
supabase db push

# Generar tipos TypeScript desde el esquema de la BD
# (local)
supabase gen types typescript --local > apps/mobile/src/types/supabase.ts
# (remoto — requiere project-id)
npx supabase gen types typescript --project-id <project-id> > apps/mobile/src/types/supabase.ts

# Ver logs de un servicio específico
supabase logs --service db
supabase logs --service auth
supabase logs --service api
```

---

## Recursos

- [Documentación oficial de Supabase](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Guía de desarrollo local](https://supabase.com/docs/guides/local-development)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Edge Functions con Deno](https://supabase.com/docs/guides/functions)