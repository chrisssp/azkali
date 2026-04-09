import { useState, useEffect } from 'react';
import type { RedeemedReward, Reward } from './types';
import { fetchRedeemedRewards, fetchAvailableRewards } from './api';

export const useRedeemedRewards = () => {
  const [items, setItems] = useState<RedeemedReward[]>([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchRedeemedRewards();
      setItems(result.items);
      setTotalTokens(result.totalTokens);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { items, totalTokens, isLoading, error, refetch: load };
};

export const useAvailableRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAvailableRewards();
      setRewards(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  const claimReward = async (id: string) => {
    setClaimingId(id);
    try {
      // TODO: call real claim endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      setClaimingId(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { rewards, isLoading, error, claimingId, claimReward };
};
