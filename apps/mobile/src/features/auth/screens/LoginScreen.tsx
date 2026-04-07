import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks';

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      router.replace('/(tabs)/feature1');
    } catch (err) {
      // Error manejado por el hook
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <VStack className="flex-1 justify-center px-6" space="xl">
        <Box className="mb-8">
          <Text className="text-3xl font-bold text-center mb-2">
            Bienvenido
          </Text>
          <Text className="text-center text-gray-600">
            Inicia sesión para continuar
          </Text>
        </Box>

        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error?.message}
        />
      </VStack>
    </Box>
  );
};
