import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import type { Feature1Item } from '../types';

interface Feature1CardProps {
  item: Feature1Item;
}

const getStatusColor = (status: Feature1Item['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'completed':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status: Feature1Item['status']) => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'pending':
      return 'Pendiente';
    case 'completed':
      return 'Completado';
    default:
      return status;
  }
};

export const Feature1Card: React.FC<Feature1CardProps> = ({ item }) => {
  return (
    <Box className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
      <VStack space="sm">
        <HStack className="justify-between items-start">
          <Text className="text-lg font-semibold flex-1">
            {item.title}
          </Text>
          <Box className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
            <Text className="text-xs font-medium">
              {getStatusLabel(item.status)}
            </Text>
          </Box>
        </HStack>

        <Text className="text-gray-600">
          {item.description}
        </Text>

        <Text className="text-xs text-gray-400 mt-2">
          Creado: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};
