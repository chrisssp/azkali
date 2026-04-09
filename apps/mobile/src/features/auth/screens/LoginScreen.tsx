import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { useRouter } from 'expo-router';
import { ScreenWrapper, AuthHeader } from '@/components/layout';

export function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper header={<AuthHeader mode="back" title="Iniciar sesión" onBackPress={() => router.replace('/welcome')} />}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 12, flex: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <VStack space="md">
            <VStack space="xs" className="items-center">
              <Text className="text-3xl font-bold text-primary-700 text-center">
                Bienvenido de vuelta
              </Text>
              <Text className="text-sm text-typography-500 text-center">
                Accede a tu cuenta para continuar
              </Text>
            </VStack>

            <Image
              source={require('@/assets/sprites/kali-login.png')}
              style={{ width: 160, height: 160, alignSelf: 'center' }}
              resizeMode="contain"
            />

            <FormControl className="mt-6">
              <FormControlLabel>
                <FormControlLabelText className="text-sm font-medium text-typography-700">
                  Correo electrónico
                </FormControlLabelText>
              </FormControlLabel>
              <Input variant="outline" size="xl" className="rounded-xl mt-1">
                <InputField
                  placeholder="usuario@ejemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText className="text-sm font-medium text-typography-700">
                  Contraseña
                </FormControlLabelText>
              </FormControlLabel>
              <Input variant="outline" size="xl" className="rounded-xl mt-1">
                <InputField placeholder="••••••••" secureTextEntry />
              </Input>
            </FormControl>

            <HStack className="justify-between items-center">
              <Text className="text-sm text-primary-700 font-medium">
                ¿Olvidaste tu contraseña?
              </Text>
            </HStack>

            <Button
              onPress={() => router.replace('/chat')}
              className="w-full bg-primary-700 rounded-2xl mt-2"
              size="xl"
            >
              <ButtonText className="text-white font-semibold">
                Iniciar sesión
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>

        <Box style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}>
          <HStack className="items-center justify-center">
            <Text className="text-sm text-typography-600">
              ¿No tienes cuenta?{' '}
            </Text>
            <Button
              variant="link"
              onPress={() => router.push('/register/step-1')}
              className="p-0"
            >
              <ButtonText className="text-primary-700 font-semibold text-sm">
                Crea una
              </ButtonText>
            </Button>
          </HStack>
        </Box>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
