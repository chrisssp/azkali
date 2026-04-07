import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

// Keep the native splash visible until our animated screen is ready
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GluestackUIProvider>
  );
}
