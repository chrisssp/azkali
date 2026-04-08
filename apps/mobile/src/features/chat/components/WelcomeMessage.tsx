import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from 'react-native';

interface WelcomeMessageProps {
  userName?: string;
}

export function WelcomeMessage({ userName = 'Usuario' }: WelcomeMessageProps) {
  return (
    <Box className="flex-1 items-center justify-center px-6">
      <Image
        source={require("@/assets/isotipo.png")}
        style={{ width: 100, height: 100, marginBottom: 16 }}
        resizeMode="contain"
        accessibilityLabel="Kali - Asistente IA"
      />
      <Text className="text-2xl font-bold text-typography-900 text-center mb-2">
        Hola {userName}
      </Text>
      <Text className="text-lg text-typography-600 text-center">
        ¿Qué quieres hacer hoy?
      </Text>
    </Box>
  );
}
