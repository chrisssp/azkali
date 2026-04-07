import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Feature1Card } from '../components/Feature1Card';
import { useFeature1 } from '../hooks';

export const Feature1Screen: React.FC = () => {
  const { data, isLoading, error, refetch } = useFeature1();

  if (isLoading && !data) {
    return (
      <Box className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Cargando datos...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex-1 justify-center items-center bg-gray-50 px-6">
        <Text className="text-red-600 text-center mb-4">
          Error: {error.message}
        </Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-gray-50">
      <VStack className="flex-1">
        <Box className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold">Feature 1</Text>
          <Text className="text-gray-600 mt-1">
            {data?.total || 0} elementos en total
          </Text>
        </Box>

        <FlatList
          data={data?.items || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Feature1Card item={item} />}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={['#3b82f6']}
            />
          }
          ListEmptyComponent={
            <Box className="py-12">
              <Text className="text-center text-gray-500">
                No hay datos disponibles
              </Text>
            </Box>
          }
        />
      </VStack>
    </Box>
  );
};
