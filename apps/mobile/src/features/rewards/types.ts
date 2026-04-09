export type CardType =
  | 'debito_guardadito'
  | 'guardadito_go'
  | 'tarjeta_azteca'
  | 'tarjeta_vas'
  | 'oro_garantizada';

export type MerchantCategory = 'retail' | 'telecom' | 'banking' | 'entertainment' | 'other';

export interface RedeemedReward {
  id: string;
  merchant: string;
  merchantCategory: MerchantCategory;
  amountSpent: number;
  tokensEarned: number;
  cardType: CardType;
  redeemedAt: string;
}

export interface RedeemedRewardCardProps {
  item: RedeemedReward;
}

export type RewardCategory = 'shopping' | 'cashback' | 'transfer' | 'discount';

export interface Reward {
  id: string;
  title: string;
  description: string;
  category: RewardCategory;
  cost: number;
}

export interface RewardCardProps {
  reward: Reward;
  onClaim: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export interface CardConversionRate {
  cardType: CardType;
  label: string;
  per100: number;
  per1000: number;
  perUnit: number;
}

export const CONVERSION_RATES: CardConversionRate[] = [
  { cardType: 'debito_guardadito', label: 'Débito Guardadito', per100: 0.20, per1000: 2.00, perUnit: 0.002 },
  { cardType: 'guardadito_go',     label: 'Guardadito Go',     per100: 0.25, per1000: 2.50, perUnit: 0.0025 },
  { cardType: 'tarjeta_azteca',    label: 'Tarjeta Azteca (TAZ)', per100: 0.50, per1000: 5.00, perUnit: 0.005 },
  { cardType: 'tarjeta_vas',       label: 'Tarjeta VAS',       per100: 0.80, per1000: 8.00, perUnit: 0.008 },
  { cardType: 'oro_garantizada',   label: 'Oro Garantizada',   per100: 1.20, per1000: 12.00, perUnit: 0.012 },
];
