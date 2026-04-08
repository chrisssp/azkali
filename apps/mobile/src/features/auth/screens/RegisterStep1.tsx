import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import type { RegisterStepProps } from '../types';

export function RegisterStep1({ form }: RegisterStepProps) {
  const {
    control,
    formState: { errors },
  } = form;

  const paternalRef = useRef<any>(null);
  const maternalRef = useRef<any>(null);

  return (
    <VStack space="md">
      <VStack space="xs" className="mb-2">
        <Text className="text-typography-500 text-sm">
          Tu futuro financiero empieza aquí
        </Text>
      </VStack>

      {/* Nombre */}
      <FormControl isInvalid={!!errors.firstName}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Nombre
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: 'El nombre es obligatorio' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="xl" className="rounded-xl mt-1">
              <InputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Tu nombre"
                autoCapitalize="words"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => paternalRef.current?.focus()}
              />
            </Input>
          )}
        />
        {errors.firstName && (
          <FormControlError>
            <FormControlErrorText>{errors.firstName.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Apellido paterno */}
      <FormControl isInvalid={!!errors.paternalLastName}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Apellido paterno
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="paternalLastName"
          rules={{ required: 'El apellido paterno es obligatorio' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="xl" className="rounded-xl mt-1">
              <InputField
                ref={paternalRef}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Apellido paterno"
                autoCapitalize="words"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => maternalRef.current?.focus()}
              />
            </Input>
          )}
        />
        {errors.paternalLastName && (
          <FormControlError>
            <FormControlErrorText>
              {errors.paternalLastName.message}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Apellido materno */}
      <FormControl isInvalid={!!errors.maternalLastName}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Apellido materno
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="maternalLastName"
          rules={{ required: 'El apellido materno es obligatorio' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="xl" className="rounded-xl mt-1">
              <InputField
                ref={maternalRef}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Apellido materno"
                autoCapitalize="words"
                returnKeyType="done"
              />
            </Input>
          )}
        />
        {errors.maternalLastName && (
          <FormControlError>
            <FormControlErrorText>
              {errors.maternalLastName.message}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
