import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { RegisterStep5 as PersonalizeStep } from '@/src/features/auth/screens/RegisterStep4';
import type { RegisterFormData } from '@/src/features/auth/types';
import { SettingsHeader } from '../components/SettingsHeader';

export function PersonalizeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const form = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      paternalLastName: '',
      maternalLastName: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      sex: '',
      profileType: '',
      personality: [],
      interests: [],
      monthlyIncome: '',
      financialGoals: [],
    },
    mode: 'onTouched',
  });

  const handleSave = async () => {
    const fields: (keyof RegisterFormData)[] = [
      'profileType',
      'personality',
      'interests',
      'monthlyIncome',
    ];
    const isValid = await form.trigger(fields);
    if (!isValid) return;

    // TODO: persist personalization data when backend is ready
    console.log('Personalization saved:', form.getValues());
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SettingsHeader title="Volver a personalizar" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm text-typography-500 mb-4">
          Ajusta cómo Kali se comunica contigo según tu personalidad e intereses.
        </Text>
        <PersonalizeStep form={form} />
      </ScrollView>

      <Box
        className="px-6 pt-3 bg-white border-t border-outline-100"
        style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
      >
        <Button
          onPress={handleSave}
          className="w-full bg-primary-700 rounded-2xl"
          size="xl"
        >
          <ButtonText className="text-white font-semibold">Guardar</ButtonText>
        </Button>
      </Box>
      </KeyboardAvoidingView>
    </View>
  );
}
