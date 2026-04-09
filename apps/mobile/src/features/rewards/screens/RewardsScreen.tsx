import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { GlobalHeader } from '@/components/layout';
import { RewardCard } from '../components/RewardCard';
import { useAvailableRewards } from '../hooks';

export const RewardsScreen: React.FC = () => {
    const { rewards, isLoading, error, claimingId, claimReward } = useAvailableRewards();
    const router = useRouter();

    if (isLoading && !rewards.length) {
        return (
            <ScreenWrapper header={<GlobalHeader mode="settings" />}>
                <Box className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#43B02A" />
                    <Text className="mt-4 text-typography-500">Cargando recompensas...</Text>
                </Box>
            </ScreenWrapper>
        );
    }

    if (error) {
        return (
            <ScreenWrapper header={<GlobalHeader mode="settings" />}>
                <Box className="flex-1 justify-center items-center">
                    <Text className="text-error-600 text-center">{error.message}</Text>
                </Box>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper header={<GlobalHeader mode="settings" />}>
            <VStack className="flex-1">
                <Button
                    size="xl"
                    className="bg-white border border-outline-200 rounded-xl mb-4 shadow-soft-1"
                    onPress={() => router.push('/rewards-history')}
                >
                    <ButtonText className="text-primary-900 font-semibold">
                        Historial de recompensas
                    </ButtonText>
                </Button>
                <ScrollView className="flex-1">
                    <VStack className="pb-4" space="md">
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
                                    No hay recompensas disponibles en este momento
                                </Text>
                            </Box>
                        )}
                    </VStack>
                </ScrollView>
            </VStack>
        </ScreenWrapper>
    );
};

