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
import { ChevronDownIcon } from '@/components/ui/icon';
import type { RegisterStepProps } from '../types';

const INCOME_OPTIONS = [
  { label: 'Menos de $5,000', value: 'lt_5000' },
  { label: '$5,000 – $10,000', value: '5000_10000' },
  { label: '$10,000 – $20,000', value: '10000_20000' },
  { label: '$20,000 – $40,000', value: '20000_40000' },
  { label: 'Más de $40,000', value: 'gt_40000' },
];

const OCCUPATION_OPTIONS = [
  { label: 'Empleado del sector privado', value: 'privado' },
  { label: 'Empleado del sector público', value: 'publico' },
  { label: 'Trabajador independiente / Freelance', value: 'freelance' },
  { label: 'Empresario / Dueño de negocio', value: 'empresario' },
  { label: 'Estudiante', value: 'estudiante' },
  { label: 'Otro', value: 'otro' },
];

export function RegisterStep4({ form }: RegisterStepProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <VStack space="md">
      {/* Ingreso mensual aproximado */}
      <FormControl isInvalid={!!errors.monthlyIncome}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Ingreso mensual aproximado
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="monthlyIncome"
          rules={{ required: 'Selecciona un rango de ingreso' }}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger variant="outline" size="xl" className="rounded-xl mt-1">
                <SelectInput placeholder="Selecciona un rango..." />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {INCOME_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />
        {errors.monthlyIncome && (
          <FormControlError>
            <FormControlErrorText>{errors.monthlyIncome.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Ocupación */}
      <FormControl isInvalid={!!errors.occupation}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Ocupación
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="occupation"
          rules={{ required: 'Selecciona tu ocupación' }}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger variant="outline" size="xl" className="rounded-xl mt-1">
                <SelectInput placeholder="Selecciona tu ocupación..." />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {OCCUPATION_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />
        {errors.occupation && (
          <FormControlError>
            <FormControlErrorText>{errors.occupation.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
