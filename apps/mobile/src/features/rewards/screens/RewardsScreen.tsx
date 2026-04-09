import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { RewardCard } from '../components';
import { useAvailableRewards } from '../hooks';

export const RewardsScreen: React.FC = () => {
    const { rewards, isLoading, error, claimingId, claimReward } = useAvailableRewards();

    if (isLoading && !rewards.length) {
        return (
            <ScreenWrapper className="flex-1 bg-background-50">
                <Box className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#43B02A" />
                    <Text className="mt-4 text-typography-500">Cargando recompensas...</Text>
                </Box>
            </ScreenWrapper>
        );
    }

    if (error) {
        return (
            <ScreenWrapper className="flex-1 bg-background-50">
                <Box className="flex-1 justify-center items-center px-6">
                    <Text className="text-error-600 text-center">{error.message}</Text>
                </Box>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper className="flex-1 bg-background-50">
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack className="px-6 pb-8" space="sm">
                    <Text className="text-3xl font-extrablack text-primary-900 pt-4 pb-3">
                        Recompensas
                    </Text>

                    {rewards.length > 0 ? (
                        rewards.map((reward) => (
                            <RewardCard
                                key={reward.id}
                                reward={reward}
                                onClaim={claimReward}
                                isLoading={claimingId === reward.id}
                            />
                        ))
                    ) : (
                        <Box className="py-12 items-center">
                            <Text className="text-center text-typography-400">
                                No hay recompensas disponibles en este momento.
                            </Text>
                        </Box>
                    )}
                </VStack>
            </ScrollView>
        </ScreenWrapper>
    );
};

