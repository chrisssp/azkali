import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Visual height of the black section before the curve starts */
const HERO_HEIGHT = SCREEN_HEIGHT * 0.48;

/**
 * How far the quadratic bezier control point dips below HERO_HEIGHT.
 * Doubling this gives the actual visible depth of the concave curve.
 */
const CURVE_DEPTH = 40;

/** Total height the component occupies in the layout (hero + curve dip) */
const CONTAINER_HEIGHT = HERO_HEIGHT + CURVE_DEPTH * 2;

/**
 * SVG path that draws a black shape covering the top half of the screen
 * with a smooth concave (outward dip) curve at the bottom.
 *
 * The quadratic bezier control point is centered below HERO_HEIGHT,
 * producing a banner-like wave that dips into the white section.
 */
const svgPath = [
  `M 0 0`,
  `L ${SCREEN_WIDTH} 0`,
  `L ${SCREEN_WIDTH} ${HERO_HEIGHT}`,
  `Q ${SCREEN_WIDTH / 2} ${HERO_HEIGHT + CURVE_DEPTH * 2} 0 ${HERO_HEIGHT}`,
  'Z',
].join(' ');

export function AnimatedHero() {
  const translateY = useSharedValue(-HERO_HEIGHT * 0.45);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    // Black panel slides down into final position
    translateY.value = withTiming(0, {
      duration: 720,
      easing: Easing.out(Easing.cubic),
    });

    // Logo fades in after panel is almost settled
    logoOpacity.value = withDelay(
      380,
      withTiming(1, {
        duration: 460,
        easing: Easing.out(Easing.ease),
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, panelStyle]}>
      {/* Black shape rendered via SVG so the concave curve is pixel-perfect */}
      <Svg
        width={SCREEN_WIDTH}
        height={CONTAINER_HEIGHT}
        style={StyleSheet.absoluteFill}
      >
        <Path d={svgPath} fill="black" />
      </Svg>

      {/* Logo centered in the flat black portion, above the curve */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image
          source={require('@/assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Azkali icon"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: CONTAINER_HEIGHT,
    overflow: 'visible',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 110,
    height: 110,
  },
});
