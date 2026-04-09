import React, { useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Must match AnimatedHero constants from the welcome screen
const HERO_HEIGHT = SCREEN_HEIGHT * 0.48;
const CURVE_DEPTH = 40;
const WELCOME_CONTAINER = HERO_HEIGHT + CURVE_DEPTH * 2;

const AnimatedPath = Animated.createAnimatedComponent(Path);

type HeaderMode = 'tokens' | 'settings' | 'back';

interface AuthHeaderProps {
  mode?: HeaderMode;
  title?: string;
  subtitle?: string;
  tokens?: number;
  onSettingsPress?: () => void;
  onBackPress?: () => void;
}

/**
 * AuthHeader – animated header for login and register screens.
 * Morphs from the welcome screen's semi-sphere shape to a compact rectangle.
 * Accepts the same props as GlobalHeader so it can be swapped in without
 * changing call sites.
 */
export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title = '',
  subtitle,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Compact header height – matches GlobalHeader back-mode visual height
  const COMPACT = insets.top + 68;

  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withTiming(1, { duration: 620, easing: Easing.out(Easing.cubic) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackPress = () => {
    if (onBackPress) onBackPress();
    else router.back();
  };

  // Total container height: flat area + curve overhang
  const containerH = useDerivedValue(() =>
    interpolate(t.value, [0, 1], [WELCOME_CONTAINER, COMPACT])
  );

  // Curve overhang decreases to 0 (flat rectangle)
  const curveOverhang = useDerivedValue(() =>
    interpolate(t.value, [0, 1], [CURVE_DEPTH * 2, 0])
  );

  // Flat bottom edge of the green fill within the SVG
  const innerH = useDerivedValue(() => containerH.value - curveOverhang.value);

  // Logo fades out in the first 40% of the animation
  const logoOpacity = useDerivedValue(() =>
    interpolate(t.value, [0, 0.4], [1, 0], Extrapolation.CLAMP)
  );

  // Header controls fade in during the last 50%
  const contentOpacity = useDerivedValue(() =>
    interpolate(t.value, [0.5, 1], [0, 1], Extrapolation.CLAMP)
  );

  const containerStyle = useAnimatedStyle(() => ({
    width: SCREEN_WIDTH,
    height: containerH.value,
    overflow: 'hidden',
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  // Animate the SVG path: semi-sphere → flat rectangle
  const animatedPathProps = useAnimatedProps(() => {
    'worklet';
    const h = innerH.value;
    const overhang = curveOverhang.value;
    return {
      d: `M 0 0 L ${SCREEN_WIDTH} 0 L ${SCREEN_WIDTH} ${h} Q ${SCREEN_WIDTH / 2} ${h + overhang} 0 ${h} Z`,
    };
  });

  return (
    <Animated.View style={containerStyle}>
      {/* Green morphing shape */}
      <Svg
        width={SCREEN_WIDTH}
        height={WELCOME_CONTAINER}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <AnimatedPath fill="#006341" animatedProps={animatedPathProps} />
      </Svg>

      {/* Logo – fades out as shape collapses */}
      <Animated.View
        style={[
          logoStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: WELCOME_CONTAINER,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Image
          source={require('@/assets/logotipo-white.png')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          accessibilityLabel="Azkali logo"
        />
      </Animated.View>

      {/* Back button + title – fades in once shape is compact */}
      <Animated.View
        style={[
          contentStyle,
          {
            position: 'absolute',
            top: insets.top + 10,
            left: 0,
            right: 0,
            paddingHorizontal: 24,
          },
        ]}
      >
        <HStack className="items-center">
          <Pressable
            onPress={handleBackPress}
            className="p-2 rounded-full bg-primary-800 mr-4"
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
      </Animated.View>
    </Animated.View>
  );
};
