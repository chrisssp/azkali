export type RewardCategory = 'shopping' | 'cashback' | 'transfer' | 'discount';

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: RewardCategory;
}

export interface RewardCardProps {
  reward: Reward;
  onClaim: (rewardId: string) => Promise<void>;
  isLoading?: boolean;
}
