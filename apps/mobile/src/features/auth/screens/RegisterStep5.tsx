import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Home, Plane, Shield, TrendingUp, type LucideIcon } from 'lucide-react-native';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import type { RegisterStepProps } from '../types';

const GOALS: { value: string; label: string; icon: LucideIcon; description: string }[] = [
  {
    value: 'libertad_financiera',
    label: 'Libertad financiera',
    icon: TrendingUp,
    description: 'Construir activos y flujos de ingreso pasivo que te permitan vivir sin depender de un empleo. El sistema optimizará tus hábitos hacia la independencia económica a largo plazo.',
  },
  {
    value: 'fondo_emergencia',
    label: 'Fondo de emergencia',
    icon: Shield,
    description: 'Acumular entre 3 y 6 meses de tus gastos fijos para cubrir imprevistos sin endeudarte. La estabilidad empieza aquí.',
  },
  {
    value: 'grandes_adquisiciones',
    label: 'Grandes adquisiciones',
    icon: Home,
    description: 'Planificar y ahorrar para compras importantes: casa, vehículo, educación o negocio propio. Cada peso cuenta hacia tu objetivo.',
  },
  {
    value: 'experiencias',
    label: 'Experiencias y estilo de vida',
    icon: Plane,
    description: 'Disfrutar viajes, cultura y momentos únicos sin descuidar tus finanzas. Vivir bien hoy sin hipotecar el mañana.',
  },
];

interface GoalCardProps {
  label: string;
  icon: LucideIcon;
  description: string;
  isSelected: boolean;
  onPress: () => void;
}

function GoalCard({ label, icon: IconComponent, isSelected, onPress }: Omit<GoalCardProps, 'description'>) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        padding: 16,
        borderRadius: 16,
        borderWidth: isSelected ? 2.5 : 1.5,
        borderColor: isSelected ? '#006341' : '#e5e7eb',
        backgroundColor: isSelected ? '#E6F2EC' : '#ffffff',
        alignItems: 'center',
        minHeight: 110,
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <IconComponent size={28} color={isSelected ? '#006341' : '#6B7280'} strokeWidth={1.5} />
      <Text
        style={{
          fontSize: 13,
          fontWeight: isSelected ? '700' : '600',
          color: isSelected ? '#006341' : '#111',
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function RegisterStep6({ form }: RegisterStepProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <VStack space="lg">
      <Text className="text-sm text-typography-500">
        Elige la meta que mejor te representa. Esto guiará cómo el sistema te ayudará.
      </Text>

      <FormControl isInvalid={!!errors.financialGoals}>
        <Controller
          control={control}
          name="financialGoals"
          rules={{
            validate: (val) =>
              (val && val.length > 0) || 'Selecciona una meta',
          }}
          render={({ field: { onChange, value } }) => {
            const selected: string[] = value ?? [];
            const selectedGoal = GOALS.find((g) => g.value === selected[0]);

            const pick = (goalValue: string) => {
              onChange([goalValue]);
            };

            return (
              <View style={{ gap: 12 }}>
                {/* Row 1 */}
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  {GOALS.slice(0, 2).map((goal) => (
                    <GoalCard
                      key={goal.value}
                      label={goal.label}
                      icon={goal.icon}
                      isSelected={selected[0] === goal.value}
                      onPress={() => pick(goal.value)}
                    />
                  ))}
                </View>
                {/* Row 2 */}
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  {GOALS.slice(2, 4).map((goal) => (
                    <GoalCard
                      key={goal.value}
                      label={goal.label}
                      icon={goal.icon}
                      isSelected={selected[0] === goal.value}
                      onPress={() => pick(goal.value)}
                    />
                  ))}
                </View>

                {/* Description panel */}
                {selectedGoal && (
                  <View
                    style={{
                      borderRadius: 14,
                      backgroundColor: '#E6F2EC',
                      borderWidth: 1,
                      borderColor: '#b6d8c6',
                      padding: 16,
                      gap: 4,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#006341' }}>
                      {selectedGoal.label}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#374151', lineHeight: 20 }}>
                      {selectedGoal.description}
                    </Text>
                  </View>
                )}
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
