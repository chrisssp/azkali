import { useState, useEffect } from 'react';
import type { Feature1Data } from './types';
import { fetchFeature1Data } from './api';

export const useFeature1 = () => {
  const [data, setData] = useState<Feature1Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFeature1Data();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: loadData,
  };
};
