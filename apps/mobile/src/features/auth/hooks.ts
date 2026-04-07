import { useState } from 'react';
import type { AuthResponse, LoginCredentials, AuthError } from './types';
import { login as loginApi, logout as logoutApi } from './api';

export const useAuth = () => {
  const [data, setData] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginApi(credentials);
      setData(response);
      return response;
    } catch (err) {
      const authError: AuthError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
      setData(null);
      setError(null);
    } catch (err) {
      const authError: AuthError = {
        message: err instanceof Error ? err.message : 'Error al cerrar sesión',
      };
      setError(authError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    login,
    logout,
  };
};
