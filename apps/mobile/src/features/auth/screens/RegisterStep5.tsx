import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import type { RegisterStepProps } from '../types';

const GOALS = [
  {
    value: 'libertad_financiera',
    label: 'Libertad financiera',
    emoji: '🚀',
    description: 'Alcanzar independencia económica total',
  },
  {
    value: 'fondo_emergencia',
    label: 'Fondo de emergencia',
    emoji: '🛡️',
    description: 'Tener un colchón para imprevistos',
  },
  {
    value: 'grandes_adquisiciones',
    label: 'Grandes adquisiciones',
    emoji: '🏠',
    description: 'Ahorrar para una compra importante',
  },
  {
    value: 'experiencias',
    label: 'Experiencias y estilo de vida',
    emoji: '✈️',
    description: 'Viajes, cultura y vivir el presente',
  },
];

interface GoalCardProps {
  label: string;
  emoji: string;
  description: string;
  isSelected: boolean;
  onPress: () => void;
}

function GoalCard({ label, emoji, description, isSelected, onPress }: GoalCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        padding: 16,
        borderRadius: 16,
        borderWidth: isSelected ? 2.5 : 1.5,
        borderColor: isSelected ? '#000' : '#D1D5DB',
        backgroundColor: isSelected ? '#F3F4F6' : '#fff',
        alignItems: 'center',
        minHeight: 130,
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: isSelected ? '700' : '600',
          color: '#111',
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 11,
          color: '#6B7280',
          textAlign: 'center',
          lineHeight: 15,
        }}
      >
        {description}
      </Text>
    </Pressable>
  );
}

export function RegisterStep5({ form }: RegisterStepProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <VStack space="lg">
      <Text className="text-sm text-typography-500">
        Elige las metas que mejor te representan. Puedes seleccionar una o varias.
      </Text>

      <FormControl isInvalid={!!errors.financialGoals}>
        <Controller
          control={control}
          name="financialGoals"
          rules={{
            validate: (val) =>
              (val && val.length > 0) || 'Selecciona al menos una meta',
          }}
          render={({ field: { onChange, value } }) => {
            const selected: string[] = value ?? [];

            const toggle = (goalValue: string) => {
              if (selected.includes(goalValue)) {
                onChange(selected.filter((v) => v !== goalValue));
              } else {
                onChange([...selected, goalValue]);
              }
            };

            return (
              <View style={{ gap: 12 }}>
                {/* Row 1 */}
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  {GOALS.slice(0, 2).map((goal) => (
                    <GoalCard
                      key={goal.value}
                      label={goal.label}
                      emoji={goal.emoji}
                      description={goal.description}
                      isSelected={selected.includes(goal.value)}
                      onPress={() => toggle(goal.value)}
                    />
                  ))}
                </View>
                {/* Row 2 */}
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  {GOALS.slice(2, 4).map((goal) => (
                    <GoalCard
                      key={goal.value}
                      label={goal.label}
                      emoji={goal.emoji}
                      description={goal.description}
                      isSelected={selected.includes(goal.value)}
                      onPress={() => toggle(goal.value)}
                    />
                  ))}
                </View>
              </View>
            );
          }}
        />
        {errors.financialGoals && (
          <FormControlError className="mt-2">
            <FormControlErrorText>{errors.financialGoals.message as string}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
