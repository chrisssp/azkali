import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { Button, ButtonText } from '@/components/ui/button';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Must mirror AnimatedHero constants exactly so the morph starts flush
const WELCOME_HERO_HEIGHT = SCREEN_HEIGHT * 0.48;
const WELCOME_CURVE_DEPTH = 40; // same as AnimatedHero's CURVE_DEPTH

// Target (resting) state of the login header
const LOGIN_HEADER_HEIGHT = 90;

// Spring config: enough damping to avoid visible bounce, natural settle
const SPRING = { damping: 26, stiffness: 130, mass: 1 };

// Max SVG canvas height — covers the full starting artwork
const SVG_CANVAS_HEIGHT = WELCOME_HERO_HEIGHT + WELCOME_CURVE_DEPTH * 2;

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const insets = useSafeAreaInsets();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // Start from the exact size/curve that AnimatedHero leaves behind
  const bandHeight = useSharedValue(WELCOME_HERO_HEIGHT);
  const curveDepth = useSharedValue(WELCOME_CURVE_DEPTH * 2);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Explicitly reset to the starting position on every mount so that
    // re-visits (e.g. welcome → login → welcome → login) always animate
    // correctly regardless of any stale Reanimated state.
    bandHeight.value = WELCOME_HERO_HEIGHT;
    curveDepth.value = WELCOME_CURVE_DEPTH * 2;
    contentOpacity.value = 0;

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
      router.replace('/(tabs)/chat');
    } catch {
      // Error is surfaced through the hook's error state
    }
  };

  return (
    <Box className="flex-1 bg-white">
      {/* ── Animated green header — morphs from welcome curve ─────── */}
      <Animated.View style={containerStyle}>
        <Svg
          width={SCREEN_WIDTH}
          height={SVG_CANVAS_HEIGHT}
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        >
          <AnimatedPath animatedProps={animatedPathProps} fill="#006341" />
        </Svg>

        <Animated.View
          className="absolute top-0 left-0 right-0 px-5 flex-row items-center"
          style={[
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

          <Text className="text-2xl font-bold text-white ml-3">
            Iniciar sesión
          </Text>
        </Animated.View>
      </Animated.View>

      {/* ── Form body ────────────────────────────────────────────── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 12 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LoginForm
            emailOrPhone={emailOrPhone}
            onChangeEmailOrPhone={setEmailOrPhone}
            password={password}
            onChangePassword={setPassword}
            error={error?.message}
            onSubmit={() => handleLogin(emailOrPhone, password)}
          />
        </ScrollView>

        <Box
          className="px-6 pt-3 bg-white"
          style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
        >
          <Button
            onPress={() => handleLogin(emailOrPhone, password)}
            isDisabled={isLoading}
            className="w-full bg-primary-700 rounded-2xl"
            size="xl"
          >
            <ButtonText className="text-white font-semibold">
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </ButtonText>
          </Button>

          <Pressable
            className="mt-4 items-center"
            onPress={() => router.push('/(auth)/register' as never)}
          >
            <Text className="text-sm text-typography-500 text-center">
              ¿Aún no tienes una cuenta?
            </Text>
          </Pressable>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

