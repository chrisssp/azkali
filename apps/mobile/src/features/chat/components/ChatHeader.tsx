import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ChatHeaderProps {
  userName?: string;
}

export function ChatHeader({ userName = 'Usuario' }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <Box className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <Box>
        <Text className="text-xl font-bold text-primary-700">Kali</Text>
        <Text className="text-xs text-gray-500">Asistente IA</Text>
      </Box>
      <Pressable onPress={() => router.push('/(tabs)/settings')}>
        <Ionicons name="settings-outline" size={24} color="#374151" />
      </Pressable>
    </Box>
  );
}
