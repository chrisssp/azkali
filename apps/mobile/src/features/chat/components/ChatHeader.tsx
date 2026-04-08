import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ChatHeaderProps {
  mode?: 'main' | 'auth';
  title?: string;
  userName?: string;
  tokens?: number;
  progress?: number; // 0 a 100
  showSettings?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  mode = 'main',
  title,
  userName = 'Usuario',
  tokens = 0,
  progress = 0,
  showSettings = false,
}) => {
  const router = useRouter();

  if (mode === 'auth') {
    return (
      <HStack className="items-center px-6 py-4 bg-background-dark border-b border-outline-100">
        <Pressable onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text className="text-2xl font-bold text-typography-white">{title}</Text>
      </HStack>
    );
  }

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
};