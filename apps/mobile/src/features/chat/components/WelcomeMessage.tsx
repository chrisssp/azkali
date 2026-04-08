import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface WelcomeMessageProps {
  userName?: string;
}

export function WelcomeMessage({ userName = 'Usuario' }: WelcomeMessageProps) {
  return (
    <Box className="flex-1 items-center justify-center px-6">
      <Text className="text-4xl font-bold text-primary-700 mb-4">👋</Text>
      <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
        Hola {userName}
      </Text>
      <Text className="text-lg text-gray-600 text-center">
        ¿Qué quieres hacer hoy?
      </Text>
    </Box>
  );
}
