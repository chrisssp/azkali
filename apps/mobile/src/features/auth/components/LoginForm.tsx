import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Pressable } from '@/components/ui/pressable';

interface LoginFormProps {
  onSubmit: (emailOrPhone: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <VStack className="flex-1 px-6 pt-8" space="md">
      <Text className="text-3xl font-bold text-primary-700 mb-4">
        Bienvenido de vuelta
      </Text>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Correo o número
          </FormControlLabelText>
        </FormControlLabel>
        <Input variant="outline" size="lg" className="rounded-xl mt-1">
          <InputField
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Input>
      </FormControl>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Contraseña
          </FormControlLabelText>
        </FormControlLabel>
        <Input variant="outline" size="lg" className="rounded-xl mt-1">
          <InputField
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Input>
        <Pressable className="mt-2 self-start">
          <Text className="text-sm text-typography-500">
            ¿Olvidaste tu contraseña?
          </Text>
        </Pressable>
      </FormControl>

      {error && (
        <Box className="bg-error-50 p-3 rounded-xl">
          <Text className="text-error-700 text-sm">{error}</Text>
        </Box>
      )}

      <Button
        onPress={() => onSubmit(emailOrPhone, password)}
        isDisabled={isLoading}
        className="w-full bg-primary-700 rounded-2xl mt-4"
        size="xl"
      >
        <ButtonText className="text-white font-semibold">
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </ButtonText>
      </Button>

      <Box className="flex-1 justify-end items-center pb-8 pt-4">
        <Pressable onPress={() => router.push('/signup' as never)}>
          <Text className="text-sm text-typography-500 text-center">
            ¿Aún no tienes una cuenta?
          </Text>
        </Pressable>
      </Box>
    </VStack>
  );
};
