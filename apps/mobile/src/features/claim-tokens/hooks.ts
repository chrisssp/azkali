import { useState, useEffect } from 'react';
import type { ClaimToken } from './types';
import { fetchClaimTokensData, claimTokens } from './api';

export const useClaimTokens = () => {
  const [tokens, setTokens] = useState<ClaimToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadTokens = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchClaimTokensData('');
      setTokens(result.tokens);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  return {
    tokens,
    isLoading,
    error,
    refetch: loadTokens,
  };
};

export const useClaimToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const claim = async (transactionId: string, userId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await claimTokens(transactionId, userId || '');
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
