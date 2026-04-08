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
    <Box className="flex-row items-center justify-between px-6 py-4 bg-primary-700 border-b border-primary-800">
      <Box>
        <Text className="text-xl font-bold text-white">Kali</Text>
        <Text className="text-xs text-primary-100">Asistente IA</Text>
      </Box>
      <Pressable onPress={() => router.push('/(tabs)/settings')}>
        <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
      </Pressable>
    </Box>
  );
}
