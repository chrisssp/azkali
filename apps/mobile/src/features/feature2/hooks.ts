import { useState, useEffect } from 'react';
import type { Feature2Item } from './types';
import { fetchFeature2Items } from './api';

export const useFeature2 = () => {
  const [data, setData] = useState<Feature2Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const items = await fetchFeature2Items();
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
