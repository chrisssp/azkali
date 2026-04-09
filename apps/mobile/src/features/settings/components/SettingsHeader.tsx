import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';

const HEADER_HEIGHT = 90;

interface SettingsHeaderProps {
  title: string;
}

export function SettingsHeader({ title }: SettingsHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: HEADER_HEIGHT + insets.top,
        backgroundColor: '#006341',
        paddingTop: insets.top + 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <ArrowLeft color="#fff" size={22} />
      </Pressable>
      <Text className="text-xl font-bold text-white ml-3">{title}</Text>
    </View>
  );
}
