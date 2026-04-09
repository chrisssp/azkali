import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { ScreenWrapper, GlobalHeader } from '@/components/layout';

// ─── Layout ───────────────────────────────────────────────────────────────────

interface RegisterLayoutProps {
  title: string;
  currentStep: number;
  totalSteps?: number;
  onBack: () => void;
  onContinue: () => void;
  isContinueDisabled?: boolean;
  children: React.ReactNode;
}

export function RegisterLayout({
  title,
  currentStep,
  totalSteps = 5,
  onBack,
  onContinue,
  isContinueDisabled = false,
  children,
}: RegisterLayoutProps) {
  const insets = useSafeAreaInsets();
  const isLastStep = currentStep === totalSteps;
  const progress = currentStep / totalSteps;

  return (
    <ScreenWrapper header={<GlobalHeader mode="animated-register" title={title} onBackPress={onBack} />}>
      {/* ── White content area ── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Progress bar — gray track + green fill, no circle, no label */}
        <Box className="pt-5 pb-2">
          <View className="h-2 bg-outline-100 rounded overflow-hidden">
            <View 
              className="h-full bg-success-600 rounded"
              style={{ width: `${progress * 100}%` }} 
            />
          </View>
        </Box>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 12 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        <Box
          className="pt-3"
          style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
        >
          <Button
            className="w-full bg-primary-700 rounded-2xl"
            size="xl"
            onPress={onContinue}
            isDisabled={isContinueDisabled}
          >
            <ButtonText className="text-white font-semibold text-base">
              {isLastStep ? 'Guardar' : 'Continuar'}
            </ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}


