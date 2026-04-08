import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import type { RegisterStepProps } from '../types';

export function RegisterStep2({ form }: RegisterStepProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValue = watch('password');

  return (
    <VStack space="md">
      {/* Correo */}
      <FormControl isInvalid={!!errors.emailOrPhone}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Correo
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="emailOrPhone"
          rules={{ required: 'El correo es obligatorio' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="xl" className="rounded-xl mt-1">
              <InputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="correo@ejemplo.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </Input>
          )}
        />
        {errors.emailOrPhone && (
          <FormControlError>
            <FormControlErrorText>{errors.emailOrPhone.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Contraseña */}
      <FormControl isInvalid={!!errors.password}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Contraseña
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="xl" className="rounded-xl mt-1">
              <InputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Mínimo 8 caracteres"
                secureTextEntry={!showPassword}
              />
              <InputSlot className="pr-3" onPress={() => setShowPassword((v) => !v)}>
                <InputIcon
                  as={showPassword ? Eye : EyeOff}
                  className="text-typography-400"
                />
              </InputSlot>
            </Input>
          )}
        />
        {errors.password && (
          <FormControlError>
            <FormControlErrorText>{errors.password.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Confirmar contraseña */}
      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Confirmar contraseña
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirma tu contraseña',
            validate: (val) =>
              val === passwordValue || 'Las contraseñas no coinciden',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="lg" className="rounded-xl mt-1">
              <InputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Repite tu contraseña"
                secureTextEntry={!showConfirm}
              />
              <InputSlot className="pr-3" onPress={() => setShowConfirm((v) => !v)}>
                <InputIcon
                  as={showConfirm ? Eye : EyeOff}
                  className="text-typography-400"
                />
              </InputSlot>
            </Input>
          )}
        />
        {errors.confirmPassword && (
          <FormControlError>
            <FormControlErrorText>{errors.confirmPassword.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
