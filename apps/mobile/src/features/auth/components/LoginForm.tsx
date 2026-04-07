import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <VStack space="lg" className="w-full">
      <Box>
        <Text className="mb-2 font-medium">Email</Text>
        <Input>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Input>
      </Box>

      <Box>
        <Text className="mb-2 font-medium">Contraseña</Text>
        <Input>
          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
        </Input>
      </Box>

      {error && (
        <Box className="bg-red-50 p-3 rounded-lg">
          <Text className="text-red-600">{error}</Text>
        </Box>
      )}

      <Button
        onPress={handleSubmit}
        isDisabled={isLoading}
        className="mt-4"
      >
        <ButtonText>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </ButtonText>
      </Button>

      <Box className="mt-4 p-3 bg-gray-100 rounded-lg">
        <Text className="text-sm text-gray-600 text-center">
          Credenciales de prueba:{'\n'}
          Email: demo@example.com{'\n'}
          Contraseña: password
        </Text>
      </Box>
    </VStack>
  );
};
