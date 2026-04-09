import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Box } from '@/components/ui/box';

const DOT_SIZE = 8;
const DOT_COLOR = '#006341';

function Dot({ delay }: { delay: number }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateY, {
          toValue: -6,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(600),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: DOT_COLOR,
        marginHorizontal: 3,
        transform: [{ translateY }],
      }}
    />
  );
}

export function TypingIndicator() {
  return (
    <Box className="flex mb-4 justify-start">
      <Box className="px-4 py-3 rounded-2xl bg-primary-50 border border-primary-200">
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 20 }}>
          <Dot delay={0} />
          <Dot delay={150} />
          <Dot delay={300} />
        </View>
      </Box>
    </Box>
  );
}
