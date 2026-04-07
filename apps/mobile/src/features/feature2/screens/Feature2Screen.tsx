import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export const Feature2Screen: React.FC = () => {
  return (
    <Box className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-2xl font-bold">Feature 2</Text>
      <Text className="text-gray-600 mt-2">Implementar según necesidad</Text>
    </Box>
  );
};
