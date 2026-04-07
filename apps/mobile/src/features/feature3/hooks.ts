import { useState, useEffect } from 'react';
import type { Feature3Data } from './types';
import { fetchFeature3Data } from './api';

export const useFeature3 = () => {
  const [data, setData] = useState<Feature3Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const items = await fetchFeature3Data();
        setData(items);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, isLoading, error };
};
