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
    <HStack className="items-center justify-between px-6 pt-12 pb-4 bg-background-50 border-b border-outline-200">
      
      {/* Izquierda: Nombre y Barra de progreso */}
      <Box className="flex-1 mr-4">
        <Text className="text-xl font-bold text-typography-900 mb-1">{userName}</Text>
        <Box className="w-32 h-1.5 bg-outline-200 rounded-full overflow-hidden">
          <Box 
            className="h-full bg-primary-700 rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </Box>
      </Box>

      {/* Derecha: Monedas y Engrane */}
      <HStack className="items-center" space="md">
        <HStack className="items-center bg-warning-50 px-2 py-1 rounded-full" space="xs">
          <FontAwesome5 name="coins" size={16} color="#F59E0B" />
          <Text className="text-md font-bold text-warning-800 ml-1">{tokens}</Text>
        </HStack>
        
        {showSettings && (
          <Pressable onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color="#A6A6A6" />
          </Pressable>
        )}
      </HStack>

    </HStack>
  );
};