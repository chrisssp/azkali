import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';

import { PulsingLogo } from '../components';

export function SplashScreenView() {
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      // Hide the native Expo splash now that our animated screen is mounted
      await SplashScreen.hideAsync();

      // Simulate initial asset loading while the pulse animation plays
      await new Promise<void>((resolve) => setTimeout(resolve, 2500));

      router.replace('/(auth)/login');
    }

    prepare();
  }, [router]);

  return (
    <Box className="flex-1 bg-white">
      <Center className="flex-1">
        <PulsingLogo />
      </Center>
    </Box>
  );
}
