import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper, GlobalHeader } from '@/components/layout';

interface RegisterLayoutProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  onNext?: () => void;
  onContinue?: () => Promise<void>;
  nextButtonText?: string;
  currentStep?: number;
  totalSteps?: number;
  children: React.ReactNode;
}

export const RegisterLayout: React.FC<RegisterLayoutProps> = ({
  title,
  subtitle,
  onBack,
  onNext,
  onContinue,
  nextButtonText = 'Siguiente',
  children,
}) => {
  const insets = useSafeAreaInsets();

  const handlePress = async () => {
    if (onContinue) {
      await onContinue();
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <ScreenWrapper header={<GlobalHeader mode="back" title={title} subtitle={subtitle} onBackPress={onBack} />}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 12 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <VStack space="md" className="flex-1 mt-6">
            {children}
          </VStack>
        </ScrollView>

        <Box
          className="pt-3"
          style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
        >
          <Button
            onPress={handlePress}
            className="w-full bg-primary-700 rounded-2xl"
            size="xl"
          >
            <ButtonText className="text-white font-semibold">
              {nextButtonText}
            </ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
