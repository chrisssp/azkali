import React from 'react';
import { GiftIcon, TrendingUpIcon, SendIcon, TagIcon } from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import type { RewardCardProps } from '../types';

const categoryConfig = {
    shopping: {
        badgeBg: 'bg-success-50',
        badgeText: 'text-success-800',
        icon: TagIcon,
        label: 'COMPRAS',
    },
    cashback: {
        badgeBg: 'bg-info-50',
        badgeText: 'text-info-800',
        icon: TrendingUpIcon,
        label: 'CASHBACK',
    },
    transfer: {
        badgeBg: 'bg-primary-50',
        badgeText: 'text-primary-800',
        icon: SendIcon,
        label: 'TRANSFERENCIA',
    },
    discount: {
        badgeBg: 'bg-warning-50',
        badgeText: 'text-warning-800',
        icon: GiftIcon,
        label: 'DESCUENTO',
    },
};

export const RewardCard: React.FC<RewardCardProps> = ({
    reward,
    onClaim,
    isLoading = false,
}) => {
    const config = categoryConfig[reward.category];
    const IconComponent = config.icon;

    const handleClaim = async () => {
        try {
            await onClaim(reward.id);
        } catch (error) {
            console.error('Error claiming reward:', error);
        }
    };

    return (
        <Card className="bg-white rounded-2xl shadow-soft-2 border border-outline-100">
            <VStack space="md" className="p-6">
                {/* Title with Icon */}
                <HStack space="md" className="items-center">
                    <IconComponent size={24} color="#006341" />
                    <Text className="text-lg font-bold text-primary-900 flex-1">
                        {reward.title}
                    </Text>
                </HStack>

                {/* Category Badge */}
                <Box
                    className={`${config.badgeBg} ${config.badgeText} self-start rounded-md px-2 py-1`}
                >
                    <Text className="text-2xs font-bold uppercase tracking-wider">
                        {config.label}
                    </Text>
                </Box>

                {/* Description */}
                <Text className="text-sm text-typography-500">
                    {reward.description}
                </Text>

                {/* Claim Button - Alineado a la derecha */}
                <HStack className="justify-between items-center mt-4">
                    <Text className="text-xs text-typography-400">Toca para reclamar</Text>
                    <Button
                        className="bg-primary-900 rounded-lg shadow-hard-5 px-6 py-2"
                        onPress={handleClaim}
                        disabled={isLoading}
                    >
                        <ButtonText className="text-typography-white font-bold text-sm">
                            {isLoading ? 'Canjeando...' : `${reward.cost} tokens`}
                        </ButtonText>
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
};