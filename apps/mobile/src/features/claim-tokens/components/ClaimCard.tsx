import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { FontAwesome5 } from '@expo/vector-icons'; 

// Ajusta la interfaz según las propiedades reales de tu objeto "token"
interface ClaimCardProps {
  token: {
    id: string;
    amount: number;
    category: string; // ej. "RACHA" o "BIENVENIDA"
    description: string;
  };
  onClaim: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ token, onClaim, isLoading }) => {
  // Le damos color dinámico al badge para que se vea igual de pulido que las recompensas
  const isRacha = token.category?.toUpperCase() === 'RACHA';
  const badgeBg = isRacha ? 'bg-error-50' : 'bg-success-50'; // Fondo pastel
  const badgeText = isRacha ? 'text-error-800' : 'text-success-800'; // Texto oscuro
  const iconColor = isRacha ? '#E85562' : '#006341'; // Icono rojo para racha, verde corporativo para otros

  const handleClaim = async () => {
    await onClaim(token.id);
  };

  return (
    <Box className="bg-white rounded-2xl shadow-soft-2 border border-outline-100 overflow-hidden">
      <VStack space="md" className="p-6">
        
        {/* Fila superior: Ícono + Cantidad (Armonía con RewardCard) */}
        <HStack space="md" className="items-center">
          <FontAwesome5 name={isRacha ? "fire" : "star"} size={20} color={iconColor} />
          <Text className="text-lg font-bold text-primary-900 flex-1">
            +{token.amount} Tokens
          </Text>
        </HStack>

        {/* Badge de Categoría */}
        <Box className={`${badgeBg} self-start rounded-md px-2 py-1`}>
          <Text className={`text-2xs font-bold uppercase tracking-wider ${badgeText}`}>
            {token.category || 'RECOMPENSA'}
          </Text>
        </Box>

        {/* Descripción */}
        <Text className="text-sm text-typography-500">
          {token.description}
        </Text>

        {/* Fila inferior: Texto de ayuda y Botón oscuro */}
        <HStack className="justify-between items-center mt-2">
          <Text className="text-xs text-typography-400">Toca para reclamar</Text>
          <Button
            className="bg-primary-900 rounded-lg shadow-hard-5 px-8 py-2"
            onPress={handleClaim}
            disabled={isLoading}
          >
            <ButtonText className="text-typography-white font-bold text-sm">
              {isLoading ? 'Cargando...' : 'Canjear'}
            </ButtonText>
          </Button>
        </HStack>

      </VStack>
    </Box>
  );
};