import { useState, useEffect } from 'react';
import type { RedeemedKali } from './types';
import { fetchRedeemedKalis } from './api';

export const useRedeemedKalis = () => {
  const [items, setItems] = useState<RedeemedKali[]>([]);
  const [totalKalis, setTotalKalis] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchRedeemedKalis();
      setItems(result.items);
      setTotalKalis(result.totalKalis);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { items, totalKalis, isLoading, error, refetch: load };
};
