import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { ScreenWrapper, AuthHeader } from '@/components/layout';

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
  currentStep,
  totalSteps,
  children,
}) => {
  const handlePress = async () => {
    if (onContinue) {
      await onContinue();
    } else if (onNext) {
      onNext();
    }
  };

  const progress =
    currentStep !== undefined && totalSteps !== undefined
      ? currentStep / totalSteps
      : 0;

  return (
    <ScreenWrapper header={<AuthHeader mode="back" title={title} subtitle={subtitle} onBackPress={onBack} />}>
      {currentStep !== undefined && totalSteps !== undefined && (
        <View style={{ height: 6, borderRadius: 999, backgroundColor: '#d1d5db', overflow: 'hidden', marginBottom: 8 }}>
          <View style={{ height: 6, borderRadius: 999, backgroundColor: '#16a34a', width: `${progress * 100}%` }} />
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24, flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <VStack space="md" className="mt-6">
            <Image
              source={require('@/assets/sprites/kali-register.png')}
              style={{ width: 140, height: 140, alignSelf: 'center' }}
              resizeMode="contain"
            />
            {children}
            <Button
              onPress={handlePress}
              className="w-full bg-primary-700 rounded-2xl mt-2"
              size="xl"
            >
              <ButtonText className="text-white font-semibold">
                {nextButtonText}
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
