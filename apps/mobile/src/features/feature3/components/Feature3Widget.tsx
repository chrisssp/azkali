import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface Feature3WidgetProps {
  item: {
    id: string;
    title: string;
  };
}

export const Feature3Widget: React.FC<Feature3WidgetProps> = ({ item }) => {
  return (
    <Box className="bg-white p-4 mb-2 rounded-lg">
      <Text className="font-bold">{item.title}</Text>
    </Box>
  );
};
