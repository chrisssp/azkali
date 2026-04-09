import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { GlobalHeader } from '@/components/layout';
import { RedeemedRewardCard } from '../components/RewardCard';
import { useRedeemedRewards } from '../hooks';

export const RewardsHistoryScreen: React.FC = () => {
    const { items, isLoading, error } = useRedeemedRewards();

    if (isLoading && !items.length) {
        return (
            <ScreenWrapper header={<GlobalHeader mode="back" title="Historial de recompensas" />}>
                <Box className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#43B02A" />
                    <Text className="mt-4 text-typography-500">Cargando historial...</Text>
                </Box>
            </ScreenWrapper>
        );
    }

    if (error) {
        return (
            <ScreenWrapper header={<GlobalHeader mode="back" title="Historial de recompensas" />}>
                <Box className="flex-1 justify-center items-center">
                    <Text className="text-error-600 text-center">{error.message}</Text>
                </Box>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper header={<GlobalHeader mode="back" title="Historial de recompensas" />}>
            {items.length > 0 ? (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RedeemedRewardCard item={item} />}
                    ItemSeparatorComponent={() => <Box className="h-3" />}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Box className="flex-1 justify-center items-center">
                    <Text className="text-center text-typography-400">
                        Aún no has canjeado ninguna recompensa
                    </Text>
                </Box>
            )}
        </ScreenWrapper>
    );
};
