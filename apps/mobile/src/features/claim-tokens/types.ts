export type ClaimReason = 'streak' | 'welcome' | 'referral' | 'bonus' | 'milestone';

export interface ClaimToken {
  id: string;
  amount: number;
  description: string;
  reason: ClaimReason;
}

export interface ClaimCardProps {
  token: ClaimToken;
  onClaim: (tokenId: string) => Promise<void>;
  isLoading?: boolean;
}
