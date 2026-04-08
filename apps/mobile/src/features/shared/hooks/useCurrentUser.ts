import { useEffect, useState } from 'react';
import { supabase } from '@/src/config/supabase';

export const useCurrentUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        // Obtener la sesión actual del usuario autenticado
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (sessionData?.session?.user?.id) {
          setUserId(sessionData.session.user.id);
        } else {
          // Si no hay sesión, mostrar warning en desarrollo
          console.warn('No authenticated user found. useCurrentUser returning null.');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error getting current user'));
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  return { userId, isLoading, error };
};
