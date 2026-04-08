import React from 'react';
import { Controller } from 'react-hook-form';
import { VStack } from '@/components/ui/vstack';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from '@/components/ui/select';
import { CalendarDaysIcon, ChevronDownIcon } from '@/components/ui/icon';
import type { RegisterStepProps } from '../types';

const SEX_OPTIONS = [
  { label: 'Femenino', value: 'femenino' },
  { label: 'Masculino', value: 'masculino' },
  { label: 'Otro', value: 'otro' },
  { label: 'Prefiero no decirlo', value: 'no_decir' },
];

/** Formats text input into DD/MM/AAAA as the user types */
function formatBirthDate(raw: string, previous: string): string {
  // Strip non-numeric except we allow the existing slashes for backspace
  const digits = raw.replace(/\D/g, '');

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

export function RegisterStep3({ form }: RegisterStepProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <VStack space="md">
      {/* Fecha de nacimiento */}
      <FormControl isInvalid={!!errors.birthDate}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Fecha de nacimiento
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="birthDate"
          rules={{
            required: 'La fecha de nacimiento es obligatoria',
            pattern: {
              value: /^\d{2}\/\d{2}\/\d{4}$/,
              message: 'Usa el formato DD/MM/AAAA',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="lg" className="rounded-xl mt-1">
              <InputField
                value={value}
                onChangeText={(text) => {
                  const formatted = formatBirthDate(text, value);
                  onChange(formatted);
                }}
                onBlur={onBlur}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
              />
              <InputSlot className="pr-3" onPress={() => {}}>
                <InputIcon as={CalendarDaysIcon} className="text-typography-400" />
              </InputSlot>
            </Input>
          )}
        />
        {errors.birthDate && (
          <FormControlError>
            <FormControlErrorText>{errors.birthDate.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Sexo */}
      <FormControl isInvalid={!!errors.sex}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Sexo
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="sex"
          rules={{ required: 'Selecciona una opción' }}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger variant="outline" size="lg" className="rounded-xl mt-1">
                <SelectInput placeholder="Selecciona..." />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {SEX_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />
        {errors.sex && (
          <FormControlError>
            <FormControlErrorText>{errors.sex.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
