import React, { useEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { ArrowLeft } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Must mirror AnimatedHero constants exactly so the morph starts flush
const WELCOME_HERO_HEIGHT = SCREEN_HEIGHT * 0.48;
const WELCOME_CURVE_DEPTH = 40; // same as AnimatedHero's CURVE_DEPTH

// Target (resting) state of the login header
const LOGIN_HEADER_HEIGHT = 130;

// Spring config: enough damping to avoid visible bounce, natural settle
const SPRING = { damping: 26, stiffness: 130, mass: 1 };

// Max SVG canvas height — covers the full starting artwork
const SVG_CANVAS_HEIGHT = WELCOME_HERO_HEIGHT + WELCOME_CURVE_DEPTH * 2;

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const insets = useSafeAreaInsets();

  // Start from the exact size/curve that AnimatedHero leaves behind
  const bandHeight = useSharedValue(WELCOME_HERO_HEIGHT);
  const curveDepth = useSharedValue(WELCOME_CURVE_DEPTH * 2);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Morph the band height and curve simultaneously
    bandHeight.value = withSpring(LOGIN_HEADER_HEIGHT, SPRING);
    curveDepth.value = withSpring(0, SPRING);

    // Reveal the header content once the morph is well underway
    contentOpacity.value = withDelay(
      260,
      withTiming(1, { duration: 320, easing: Easing.out(Easing.ease) }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Container shrinks with the band — form body slides up naturally
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

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const handleLogin = async (emailOrPhone: string, password: string) => {
    try {
      await login({ email: emailOrPhone, password });
      router.replace('/(tabs)/feature1');
    } catch {
      // Error is surfaced through the hook's error state
    }
  };

  return (
    <Box className="flex-1 bg-white">
      {/* ── Animated black header — morphs from welcome curve ─────── */}
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
            contentStyle,
          ]}
        >
          <Pressable
            onPress={() => router.replace('/welcome')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Icon as={ArrowLeft} size="xl" className="text-white" />
          </Pressable>

          <Text className="text-2xl font-bold text-white mt-3">
            Iniciar sesión
          </Text>
        </Animated.View>
      </Animated.View>

      {/* ── Form body ────────────────────────────────────────────── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formWrapper}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error?.message}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};

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
  scrollContent: {
    flexGrow: 1,
  },
});

