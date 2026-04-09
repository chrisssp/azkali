import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 16,
      }}
    >
      <Box
        className={`max-w-xs px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-primary-700'
            : 'bg-primary-50 border border-primary-200'
        }`}
      >
        <Text
          className={`text-base font-medium ${
            isUser ? 'text-white' : 'text-typography-900'
          }`}
        >
          {message.content}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            isUser ? 'text-primary-100' : 'text-primary-600'
          }`}
        >
          {message.timestamp.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Box>
    </Animated.View>
  );
}
