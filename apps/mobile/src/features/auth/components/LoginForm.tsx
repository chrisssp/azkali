import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Pressable } from '@/components/ui/pressable';

interface LoginFormProps {
  emailOrPhone: string;
  onChangeEmailOrPhone: (value: string) => void;
  password: string;
  onChangePassword: (value: string) => void;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  emailOrPhone,
  onChangeEmailOrPhone,
  password,
  onChangePassword,
  error,
}) => {
  return (
    <VStack className="px-6 pt-8" space="md">
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
            onChangeText={onChangeEmailOrPhone}
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
            onChangeText={onChangePassword}
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
    </VStack>
  );
};
