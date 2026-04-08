import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ChatHeaderProps {
  mode?: 'main' | 'chat';
  userName?: string;
  tokens?: number;
  progress?: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  mode = 'main',
  userName = 'Usuario',
  tokens = 0,
  progress = 0,
}) => {
  const router = useRouter();

  // Modo Chat: Sin flecha, con ícono de cerrar sesión
  if (mode === 'chat') {
    return (
      <HStack className="items-center justify-between px-6 pt-14 pb-5 bg-primary-700 border-b border-primary-800">
        <Box>
          <Text className="text-xl font-bold text-white">Kali</Text>
          <Text className="text-xs text-primary-100 mt-0.5">Asistente IA</Text>
        </Box>
        <Pressable className="p-2 rounded-full bg-primary-800" onPress={() => router.replace('/')}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </HStack>
    );
  }

  // Modo Main (Para Recompensas y Canjear Tokens)
  return (
    <HStack className="items-end justify-between px-6 pt-14 pb-5 bg-primary-700 border-b border-primary-800">

      <Box className="flex-1 mr-4">
        <Text className="text-xl font-bold text-white mb-1.5">
          {userName}
        </Text>
        <Box className="w-36 h-2 bg-primary-900 rounded-full overflow-hidden">
          <Box
            className="h-full bg-primary-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </Box>
      </Box>

      <HStack className="items-center bg-warning-100 border border-warning-200 px-3 py-1.5 rounded-full" space="xs">
        <FontAwesome5 name="coins" size={16} color="#F59E0B" />
        <Text className="text-md font-bold text-warning-900 ml-1">
          {tokens}
        </Text>
      </HStack>

    </HStack>
  );
};