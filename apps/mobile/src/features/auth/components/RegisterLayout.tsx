import React, { useEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { ArrowLeft } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mirror AnimatedHero constants exactly so the morph starts flush
const WELCOME_HERO_HEIGHT = SCREEN_HEIGHT * 0.48;
const WELCOME_CURVE_DEPTH = 40;
const REGISTER_HEADER_HEIGHT = 130;
const SVG_CANVAS_HEIGHT = WELCOME_HERO_HEIGHT + WELCOME_CURVE_DEPTH * 2;

const SPRING = { damping: 26, stiffness: 130, mass: 1 };

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

  // Start from the exact dimensions AnimatedHero leaves behind
  const bandHeight = useSharedValue(WELCOME_HERO_HEIGHT);
  const curveDepth = useSharedValue(WELCOME_CURVE_DEPTH * 2);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    bandHeight.value = withSpring(REGISTER_HEADER_HEIGHT, SPRING);
    curveDepth.value = withSpring(0, SPRING);
    contentOpacity.value = withDelay(
      260,
      withTiming(1, { duration: 320, easing: Easing.out(Easing.ease) }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    height: bandHeight.value + curveDepth.value,
  }));

  const animatedPathProps = useAnimatedProps(() => ({
    d: [
      `M 0 0`,
      `L ${SCREEN_WIDTH} 0`,
      `L ${SCREEN_WIDTH} ${bandHeight.value}`,
      `Q ${SCREEN_WIDTH / 2} ${bandHeight.value + curveDepth.value} 0 ${bandHeight.value}`,
      'Z',
    ].join(' '),
  }));

  const headerContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const progress = currentStep / totalSteps;

  return (
    <Box className="flex-1 bg-white">
      {/* ── Animated black header — morphs from welcome curve ── */}
      <Animated.View style={containerStyle}>
        <Svg
          width={SCREEN_WIDTH}
          height={SVG_CANVAS_HEIGHT}
          style={StyleSheet.absoluteFill}
        >
          <AnimatedPath animatedProps={animatedPathProps} fill="black" />
        </Svg>

        <Animated.View
          style={[
            styles.headerContent,
            { paddingTop: insets.top + 10 },
            headerContentStyle,
          ]}
        >
          <Pressable
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ArrowLeft color="#fff" size={22} />
          </Pressable>
          <Text className="text-2xl font-bold text-white mt-3">{title}</Text>
        </Animated.View>
      </Animated.View>

      {/* ── White content area ── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formWrapper}
      >
        {/* Progress bar — gray track + green fill, no circle, no label */}
        <Box className="px-6 pt-5 pb-2">
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </Box>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

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
      </KeyboardAvoidingView>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  formWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
});
