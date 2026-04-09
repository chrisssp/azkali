import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
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
import { Icon, CheckIcon, CloseIcon, ChevronDownIcon } from '@/components/ui/icon';
import type { RegisterStepProps } from '../types';

// ─── Options ─────────────────────────────────────────────────────────────────

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

const INTERESTS_OPTIONS = [
  { label: 'Tecnología', value: 'tecnologia' },
  { label: 'Deportes', value: 'deportes' },
  { label: 'Música', value: 'musica' },
  { label: 'Cine y series', value: 'cine_series' },
  { label: 'Viajes', value: 'viajes' },
  { label: 'Gastronomía', value: 'gastronomia' },
  { label: 'Arte y diseño', value: 'arte_diseno' },
  { label: 'Lectura', value: 'lectura' },
  { label: 'Fitness y salud', value: 'fitness' },
  { label: 'Videojuegos', value: 'videojuegos' },
  { label: 'Fotografía', value: 'fotografia' },
  { label: 'Naturaleza y senderismo', value: 'naturaleza' },
  { label: 'Moda', value: 'moda' },
  { label: 'Finanzas e inversiones', value: 'finanzas' },
  { label: 'Cocina', value: 'cocina' },
];

const INCOME_OPTIONS = [
  { label: 'Menos de $5,000', value: 'lt_5000' },
  { label: '$5,000 – $10,000', value: '5000_10000' },
  { label: '$10,000 – $20,000', value: '10000_20000' },
  { label: '$20,000 – $40,000', value: '20000_40000' },
  { label: 'Más de $40,000', value: 'gt_40000' },
];

// ─── MultiSelect Component ────────────────────────────────────────────────────

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (val: string[]) => void;
  placeholder: string;
  isInvalid?: boolean;
  modalTitle?: string;
}

function MultiSelectField({
  options,
  value,
  onChange,
  placeholder,
  isInvalid = false,
  modalTitle = 'Selecciona',
}: MultiSelectFieldProps) {
  const [open, setOpen] = useState(false);

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const getLabel = (val: string) => options.find((o) => o.value === val)?.label ?? val;

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className={`min-h-[52px] rounded-xl border px-3 py-3 mt-1 flex-row flex-wrap gap-2 items-center ${isInvalid ? 'border-error-500' : 'border-outline-300'}`}
      >
        {value.length === 0 ? (
          <Text className="text-typography-400 text-sm flex-1">{placeholder}</Text>
        ) : (
          value.map((v) => (
            <View
              key={v}
              className="bg-primary-50 border border-primary-200 rounded-full px-2.5 py-1 flex-row items-center gap-1"
            >
              <Text className="text-primary-700 text-xs font-medium">{getLabel(v)}</Text>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  toggle(v);
                }}
                hitSlop={8}
                className="ml-0.5"
              >
                <Icon as={CloseIcon} size="2xs" className="text-primary-500" />
              </Pressable>
            </View>
          ))
        )}
        <View className="ml-auto">
          <Icon as={ChevronDownIcon} size="sm" className="text-typography-400" />
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
        statusBarTranslucent
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <Pressable
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={() => setOpen(false)}
          />
          <View className="bg-background-0 rounded-t-3xl" style={{ maxHeight: '65%' }}>
            <View className="items-center pt-3 pb-1">
              <View className="w-10 h-1 bg-outline-300 rounded-full" />
            </View>
            <Text className="text-base font-semibold text-typography-900 px-5 py-3">
              {modalTitle}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8 }}
            >
              {options.map((opt) => {
                const selected = value.includes(opt.value);
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => toggle(opt.value)}
                    className="flex-row items-center justify-between py-4 border-b border-outline-50"
                  >
                    <Text
                      className={`text-sm ${selected ? 'text-primary-600 font-semibold' : 'text-typography-700'}`}
                    >
                      {opt.label}
                    </Text>
                    <View
                      className={`w-5 h-5 rounded-full border items-center justify-center ${
                        selected ? 'bg-primary-600 border-primary-600' : 'border-outline-300 bg-transparent'
                      }`}
                    >
                      {selected && <Icon as={CheckIcon} size="2xs" className="text-white" />}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View className="px-5 pt-3 pb-8">
              <Pressable
                onPress={() => setOpen(false)}
                className="bg-primary-600 rounded-xl py-3.5 items-center"
              >
                <Text className="text-white font-semibold text-sm">
                  {value.length > 0 ? `Listo (${value.length})` : 'Listo'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// ─── Step 5 ───────────────────────────────────────────────────────────────────

export function RegisterStep5({ form }: RegisterStepProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <VStack space="lg">
      <Text className="text-sm text-typography-500">
        Ajusta el sistema a tu perfil para una experiencia completamente adaptada a ti.
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

      {/* Personalidad — multi-select */}
      <FormControl isInvalid={!!errors.personality}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            ¿Cómo te describirías?
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="personality"
          rules={{
            validate: (v) => (v && v.length > 0) || 'Selecciona al menos una característica',
          }}
          render={({ field: { onChange, value } }) => (
            <MultiSelectField
              options={PERSONALITY_OPTIONS}
              value={value ?? []}
              onChange={onChange}
              placeholder="Selecciona tus rasgos..."
              isInvalid={!!errors.personality}
              modalTitle="Tu personalidad"
            />
          )}
        />
        {errors.personality && (
          <FormControlError>
            <FormControlErrorText>{errors.personality.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Intereses / Hobbies — multi-select */}
      <FormControl isInvalid={!!errors.interests}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            ¿Qué te interesa o apasiona?
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="interests"
          rules={{
            validate: (v) => (v && v.length > 0) || 'Selecciona al menos un interés',
          }}
          render={({ field: { onChange, value } }) => (
            <MultiSelectField
              options={INTERESTS_OPTIONS}
              value={value ?? []}
              onChange={onChange}
              placeholder="Elige tus intereses..."
              isInvalid={!!errors.interests}
              modalTitle="Tus intereses"
            />
          )}
        />
        {errors.interests && (
          <FormControlError>
            <FormControlErrorText>{errors.interests.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

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
    </VStack>
  );
}
