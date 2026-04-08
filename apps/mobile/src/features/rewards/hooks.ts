import { useState, useEffect } from 'react';
import type { Reward } from './types';
import { fetchRewardsData, claimReward } from './api';

export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadRewards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchRewardsData();
      setRewards(result.rewards);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRewards();
  }, []);

  return {
    rewards,
    isLoading,
    error,
    refetch: loadRewards,
  };
};

export const useClaimReward = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const claim = async (rewardId: string, userId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await claimReward(rewardId, userId || '');
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    claim,
    isLoading,
    error,
  };
};
