import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';

// ─── Progress Bar with circle indicator ──────────────────────────────────────

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const CIRCLE_SIZE = 20;
const BAR_HEIGHT = 8;

function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const [barWidth, setBarWidth] = useState(0);
  const progress = currentStep / totalSteps;

  const handleLayout = (e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  };

  const circleLeft = barWidth * progress - CIRCLE_SIZE / 2;
  const circleTop = (BAR_HEIGHT - CIRCLE_SIZE) / 2; // centres circle on bar

  return (
    <HStack className="items-center" space="sm">
      <View
        style={{ height: BAR_HEIGHT, flex: 1, position: 'relative' }}
        onLayout={handleLayout}
      >
        {/* Track */}
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#E5E7EB',
            borderRadius: BAR_HEIGHT / 2,
          }}
        />
        {/* Fill */}
        {barWidth > 0 && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: barWidth * progress,
              backgroundColor: '#000',
              borderRadius: BAR_HEIGHT / 2,
            }}
          />
        )}
        {/* Circle at the tip */}
        {barWidth > 0 && (
          <View
            style={{
              position: 'absolute',
              left: circleLeft,
              top: circleTop,
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              backgroundColor: '#000',
              borderWidth: 2.5,
              borderColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.18,
              shadowRadius: 3,
              elevation: 3,
            }}
          />
        )}
      </View>
      <Text className="text-xs text-typography-400 font-medium w-8 text-right">
        {currentStep}/{totalSteps}
      </Text>
    </HStack>
  );
}

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ── Black header ── */}
      <Box
        className="bg-black"
        style={{ paddingTop: insets.top + 8, paddingBottom: 24, paddingHorizontal: 16 }}
      >
        <Pressable
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          className="self-start"
        >
          <ArrowLeft color="#fff" size={22} />
        </Pressable>
        <Text className="text-white text-2xl font-bold mt-5">{title}</Text>
      </Box>

      {/* ── White content area ── */}
      <Box className="flex-1 bg-white rounded-tl-3xl rounded-tr-3xl" style={{ marginTop: -16 }}>
        {/* Progress bar */}
        <Box className="px-6 pt-6 pb-2">
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </Box>

        {/* Scrollable step content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {/* Bottom button */}
        <Box
          className="px-6 pt-3"
          style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
        >
          <Button
            className="w-full bg-black rounded-2xl"
            size="xl"
            onPress={onContinue}
            isDisabled={isContinueDisabled}
          >
            <ButtonText className="text-white font-semibold text-base">
              {isLastStep ? 'Guardar' : 'Continuar'}
            </ButtonText>
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}
