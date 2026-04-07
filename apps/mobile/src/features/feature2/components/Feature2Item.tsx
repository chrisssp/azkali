import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface Feature2ItemProps {
  item: {
    id: string;
    name: string;
    category: string;
    value: number;
  };
}

export const Feature2Item: React.FC<Feature2ItemProps> = ({ item }) => {
  return (
    <Box className="bg-white p-4 mb-2 rounded-lg">
      <Text className="font-bold">{item.name}</Text>
      <Text className="text-gray-600">{item.category}</Text>
      <Text className="text-blue-600">{item.value}</Text>
    </Box>
  );
};
