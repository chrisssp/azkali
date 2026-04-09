import React from 'react';
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

const PROFILE_TYPE_OPTIONS = [
  { label: 'Estudiante', value: 'estudiante' },
  { label: 'Empleado', value: 'empleado' },
  { label: 'No empleado', value: 'no_empleado' },
  { label: 'Ejecutivo', value: 'ejecutivo' },
  { label: 'Emprendedor', value: 'emprendedor' },
  { label: 'Freelancer / Independiente', value: 'freelancer' },
  { label: 'Empresario', value: 'empresario' },
  { label: 'Jubilado / Pensionado', value: 'jubilado' },
  { label: 'Ama de casa', value: 'ama_de_casa' },
];

const PERSONALITY_OPTIONS = [
  { label: 'Alegre', value: 'alegre' },
  { label: 'Inteligente', value: 'inteligente' },
  { label: 'Analítico', value: 'analitico' },
  { label: 'Creativo', value: 'creativo' },
  { label: 'Empático', value: 'empatico' },
  { label: 'Organizado', value: 'organizado' },
  { label: 'Curioso', value: 'curioso' },
  { label: 'Sociable', value: 'sociable' },
  { label: 'Ambicioso', value: 'ambicioso' },
  { label: 'Responsable', value: 'responsable' },
  { label: 'Aventurero', value: 'aventurero' },
  { label: 'Tranquilo', value: 'tranquilo' },
];

export function RegisterStep5({ form }: RegisterStepProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <VStack space="lg">
      <Text className="text-sm text-typography-500">
        Cuéntanos un poco sobre ti para personalizar tu experiencia.
      </Text>

      {/* Perfil profesional */}
      <FormControl isInvalid={!!errors.profileType}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            ¿Cuál es tu situación actual?
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="profileType"
          rules={{ required: 'Selecciona tu situación actual' }}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger variant="outline" size="xl" className="rounded-xl mt-1">
                <SelectInput placeholder="Selecciona una opción..." />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {PROFILE_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />
        {errors.profileType && (
          <FormControlError>
            <FormControlErrorText>{errors.profileType.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Personalidad */}
      <FormControl isInvalid={!!errors.personality}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            ¿Cómo te describirías?
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="personality"
          rules={{ required: 'Selecciona tu personalidad' }}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger variant="outline" size="xl" className="rounded-xl mt-1">
                <SelectInput placeholder="Selecciona tu personalidad..." />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {PERSONALITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />
        {errors.personality && (
          <FormControlError>
            <FormControlErrorText>{errors.personality.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
