import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type HeaderMode = 'tokens' | 'settings' | 'back';

interface GlobalHeaderProps {
  mode?: HeaderMode;
  title?: string;
  subtitle?: string;
  tokens?: number;
  onSettingsPress?: () => void;
  onBackPress?: () => void;
}

/**
 * GlobalHeader - Header reutilizable para todas las interfaces
 * 
 * Modos:
 * - 'tokens': Tokens a la izquierda, ícono configuración a la derecha
 * - 'settings': Tokens a la izquierda, ícono configuración a la derecha
 * - 'back': Solo muestra ícono de volver a la izquierda detrás del nombre
 */
export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  mode = 'settings',
  title = 'Interfaz',
  subtitle,
  tokens = 0,
  onSettingsPress,
  onBackPress,
}) => {
  const router = useRouter();

  const handleSettingsPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      router.push('/settings');
    }
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  // Modo: Tokens a la izquierda + Configuración a la derecha (sin texto)
  // Usado en: Chat, Recompensas, Tokens
  if (mode === 'tokens' || mode === 'settings') {
    return (
      <HStack className="items-center justify-between px-6 pt-14 pb-5 bg-primary-700 border-b border-primary-800">
        <HStack className="items-center bg-warning-100 border border-warning-200 px-3 py-1.5 rounded-full" space="xs">
          <FontAwesome5 name="coins" size={16} color="#F59E0B" />
          <Text className="text-md font-bold text-warning-900 ml-1">
            {tokens}
          </Text>
        </HStack>

        <Pressable 
          className="p-2 rounded-full bg-primary-800" 
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </HStack>
    );
  }

  // Modo: Solo ícono de volver a la izquierda + Nombre
  // Usado en: Detalles, Configuración, Pantallas secundarias
  if (mode === 'back') {
    return (
      <HStack className="items-center px-6 pt-14 pb-5 bg-primary-700 border-b border-primary-800">
        <Pressable 
          className="p-2 rounded-full bg-primary-800 mr-4" 
          onPress={handleBackPress}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </Pressable>
        
        <Box>
          <Text className="text-xl font-bold text-white">{title}</Text>
          {subtitle && (
            <Text className="text-xs text-primary-100 mt-0.5">{subtitle}</Text>
          )}
        </Box>
      </HStack>
    );
  }

  return null;
};
