import { useRouter } from 'expo-router';
import React from 'react';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { AnimatedHero } from '../components';

export function WelcomeScreen() {
  const router = useRouter();

  return (
    <Box className="flex-1 bg-white">
      <AnimatedHero />

      <VStack className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-4xl font-bold text-primary-700 text-center mb-4">
          Toma el control
        </Text>

        <Button
          size="xl"
          variant="solid"
          className="w-full bg-primary-700 rounded-2xl"
          onPress={() => router.replace('/(auth)/login')}
        >
          <ButtonText className="text-white font-semibold text-base">
            Conectar con banco azteca
          </ButtonText>
        </Button>

        <Button
          size="xl"
          variant="outline"
          className="w-full border-primary-700 rounded-2xl bg-transparent"
          onPress={() => router.push('/(auth)/register')}
        >
          <ButtonText className="text-primary-700 font-semibold text-base">
            Continuar sin conectarse
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
