import React, { useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Dimensions,
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
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const WELCOME_HERO_HEIGHT = SCREEN_HEIGHT * 0.48;
const WELCOME_CURVE_DEPTH = 40;
const ANIMATED_HEADER_HEIGHT = 90;
const SVG_CANVAS_HEIGHT = WELCOME_HERO_HEIGHT + WELCOME_CURVE_DEPTH * 2;
const SPRING = { damping: 26, stiffness: 130, mass: 1 };

type HeaderMode = 'tokens' | 'settings' | 'back' | 'animated-login' | 'animated-register' | 'animated-verify';

interface GlobalHeaderProps {
  mode?: HeaderMode;
  title?: string;
  subtitle?: string;
  tokens?: number;
  progress?: number;
  onSettingsPress?: () => void;
  onBackPress?: () => void;
}

/**
 * GlobalHeader - Header reutilizable para todas las interfaces
 * 
 * Modos:
 * - 'tokens': Tokens a la izquierda, ícono configuración a la derecha
 * - 'settings': Tokens a la izquierda, ícono configuración a la derecha
 * - 'back': Solo muestra ícono de volver a la izquierda detrás del nombre
 * - 'animated-login': Header animado para LoginScreen
 * - 'animated-register': Header animado para RegisterScreen
 * - 'animated-verify': Header animado para VerifyScreen
 */
export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  mode = 'settings',
  title = 'Interfaz',
  subtitle,
  tokens = 0,
  progress = 0,
  onSettingsPress,
  onBackPress,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSettingsPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      router.push('/settings');
    }
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  // Animated header shared logic
  const bandHeight = useSharedValue(WELCOME_HERO_HEIGHT);
  const curveDepth = useSharedValue(WELCOME_CURVE_DEPTH * 2);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    if (mode.startsWith('animated-')) {
      bandHeight.value = WELCOME_HERO_HEIGHT;
      curveDepth.value = WELCOME_CURVE_DEPTH * 2;
      contentOpacity.value = 0;

      bandHeight.value = withSpring(ANIMATED_HEADER_HEIGHT, SPRING);
      curveDepth.value = withSpring(0, SPRING);
      contentOpacity.value = withDelay(
        260,
        withTiming(1, { duration: 320, easing: Easing.out(Easing.ease) }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

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

  // Animated headers with morphing curve
  if (mode.startsWith('animated-')) {
    const headerTitles: Record<string, string> = {
      'animated-login': 'Iniciar sesión',
      'animated-register': title,
      'animated-verify': 'Verificar código',
    };

    const headerTitle = headerTitles[mode] || title;

    return (
      <Animated.View style={containerStyle}>
        <Svg
          width={SCREEN_WIDTH}
          height={SVG_CANVAS_HEIGHT}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <AnimatedPath animatedProps={animatedPathProps} fill="#006341" />
        </Svg>

        <Animated.View
          className="absolute top-0 left-0 right-0 px-6 flex-row items-center"
          style={[{ paddingTop: insets.top + 56, paddingBottom: 20 }, contentStyle]}
        >
          <Pressable 
            className="p-2 rounded-full bg-primary-800 mr-4" 
            onPress={handleBackPress}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </Pressable>

          <Box>
            <Text className="text-xl font-bold text-white">{headerTitle}</Text>
            {subtitle && (
              <Text className="text-xs text-primary-100 mt-0.5">{subtitle}</Text>
            )}
          </Box>
        </Animated.View>
      </Animated.View>
    );
  }

  // Modo: Tokens a la izquierda + Configuración a la derecha (sin texto)
  // Usado en: Chat, Recompensas, Tokens
  if (mode === 'tokens' || mode === 'settings') {
    return (
      <HStack className="items-center justify-between px-6 pt-14 pb-5 bg-primary-700 border-b border-primary-800">
        <HStack className="items-center bg-warning-100 border border-warning-200 px-3 py-1.5 rounded-full" space="xs">
          <FontAwesome5 name="coins" size={16} color="#F59E0B" />
          <Text className="text-md font-bold text-warning-900 ml-1">
            {tokens}
          </Text>
        </HStack>

        <Pressable 
          className="p-2 rounded-full bg-primary-800" 
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </HStack>
    );
  }

  // Modo: Solo ícono de volver a la izquierda + Nombre
  // Usado en: Detalles, Configuración, Pantallas secundarias
  if (mode === 'back') {
    return (
      <HStack className="items-center px-6 pt-14 pb-5 bg-primary-700 border-b border-primary-800">
        <Pressable 
          className="p-2 rounded-full bg-primary-800 mr-4" 
          onPress={handleBackPress}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </Pressable>
        
        <Box>
          <Text className="text-xl font-bold text-white">{title}</Text>
          {subtitle && (
            <Text className="text-xs text-primary-100 mt-0.5">{subtitle}</Text>
          )}
        </Box>
      </HStack>
    );
  }

  return null;
};
