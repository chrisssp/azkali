import React, { useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import {
    ShoppingBagIcon,
    WifiIcon,
    BuildingIcon,
    StarIcon,
    CoinsIcon,
    TagIcon,
    TrendingUpIcon,
    SendIcon,
    GiftIcon,
    HelpCircleIcon,
} from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalBody,
    ModalFooter,
} from '@/components/ui/modal';
import { CONVERSION_RATES, type ClaimedRewardCardProps, type RedeemedRewardCardProps, type RewardCardProps } from '../types';

type ModalStep = null | 'confirm' | 'loading' | 'success';

const categoryConfig = {
    retail: {
        icon: ShoppingBagIcon,
        label: 'COMERCIO',
        badgeBg: 'bg-success-50',
        badgeText: 'text-success-800',
        iconColor: '#006341',
    },
    telecom: {
        icon: WifiIcon,
        label: 'TELECOM',
        badgeBg: 'bg-info-50',
        badgeText: 'text-info-800',
        iconColor: '#0066CC',
    },
    banking: {
        icon: BuildingIcon,
        label: 'BANCO',
        badgeBg: 'bg-primary-50',
        badgeText: 'text-primary-800',
        iconColor: '#003087',
    },
    entertainment: {
        icon: StarIcon,
        label: 'ENTRETENIMIENTO',
        badgeBg: 'bg-warning-50',
        badgeText: 'text-warning-800',
        iconColor: '#B45309',
    },
    other: {
        icon: CoinsIcon,
        label: 'OTRO',
        badgeBg: 'bg-background-100',
        badgeText: 'text-typography-600',
        iconColor: '#6B7280',
    },
};

function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatMXN(amount: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(amount);
}

export const RedeemedRewardCard: React.FC<RedeemedRewardCardProps> = ({ item }) => {
    const config = categoryConfig[item.merchantCategory];
    const IconComponent = config.icon;
    const cardLabel = CONVERSION_RATES.find((r) => r.cardType === item.cardType)?.label ?? item.cardType;

    return (
        <Card className="bg-white rounded-2xl shadow-soft-2 border border-outline-100">
            <HStack space="md" className="p-4 items-center">
                {/* Category icon */}
                <Box className="w-10 h-10 rounded-full bg-background-50 items-center justify-center">
                    <IconComponent size={20} color={config.iconColor} />
                </Box>

                {/* Main info */}
                <VStack className="flex-1" space="xs">
                    <HStack className="items-center justify-between">
                        <Text className="text-base font-bold text-primary-900">{item.merchant}</Text>
                        <HStack space="xs" className="items-center">
                            <CoinsIcon size={14} color="#B45309" />
                            <Text className="text-sm font-extrabold text-warning-700">
                                +{item.tokensEarned.toFixed(2)}
                            </Text>
                        </HStack>
                    </HStack>

                    <HStack className="items-center justify-between">
                        <Box className={`${config.badgeBg} rounded px-2 py-0.5 self-start`}>
                            <Text className={`text-2xs font-bold uppercase tracking-wider ${config.badgeText}`}>
                                {config.label}
                            </Text>
                        </Box>
                        <Text className="text-xs text-typography-400">{formatDate(item.redeemedAt)}</Text>
                    </HStack>

                    <HStack className="items-center justify-between mt-0.5">
                        <Text className="text-xs text-typography-500">{cardLabel}</Text>
                        <Text className="text-xs text-typography-500">
                            {formatMXN(item.amountSpent)} gastados
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </Card>
    );
};

const rewardCategoryConfig = {
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
    const config = rewardCategoryConfig[reward.category];
    const IconComponent = config.icon;
    const [modalStep, setModalStep] = useState<ModalStep>(null);

    const handlePressClaimButton = () => {
        setModalStep('confirm');
    };

    const handleConfirm = async () => {
        setModalStep('loading');
        try {
            await onClaim(reward.id);
        } catch (error) {
            console.error('Error claiming reward:', error);
        }
        setTimeout(() => setModalStep('success'), 1000);
    };

    const handleSuccessClose = () => {
        setModalStep(null);
    };

    return (
        <>
            <Card className="bg-white rounded-2xl shadow-soft-2 border border-outline-100">
                <VStack space="md" className="p-4">
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

                    {/* Claim Button */}
                    <HStack className="justify-end items-center mt-4">
                        <Button
                            className="bg-primary-900 rounded-lg shadow-hard-5 px-6 py-2"
                            onPress={handlePressClaimButton}
                            disabled={isLoading}
                        >
                            {!isLoading && <CoinsIcon size={14} color="#F59E0B" style={{ marginRight: 4 }} />}
                            <ButtonText className="text-typography-white font-bold text-sm">
                                {isLoading ? 'Canjeando...' : `${reward.cost} Kalis`}
                            </ButtonText>
                        </Button>
                    </HStack>
                </VStack>
            </Card>

            {/* Confirm modal */}
            <Modal isOpen={modalStep === 'confirm'} onClose={() => setModalStep(null)} size="md">
                <ModalBackdrop />
                <ModalContent className="bg-white rounded-3xl" style={{ width: 320, minHeight: 320 }}>
                    <ModalBody className="p-4" scrollEnabled={false}>
                        <VStack className="items-center" space="md">
                            <Box className="w-16 h-16 rounded-full bg-warning-50 items-center justify-center">
                                <HelpCircleIcon size={36} color="#B45309" />
                            </Box>
                            <Text className="text-base font-bold text-primary-900 text-center leading-6">
                                ¿Seguro que deseas canjear esta recompensa?
                            </Text>
                            <Text className="text-sm text-typography-400 text-center">
                                {reward.title}
                            </Text>
                        </VStack>
                    </ModalBody>
                    <ModalFooter className="flex-row gap-3 p-4">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl border-outline-300"
                            onPress={() => setModalStep(null)}
                        >
                            <ButtonText className="text-typography-600 font-semibold">Cancelar</ButtonText>
                        </Button>
                        <Button
                            className="flex-1 bg-primary-900 rounded-xl"
                            onPress={handleConfirm}
                        >
                            <ButtonText className="text-white font-semibold">Confirmar</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Loading modal */}
            <Modal isOpen={modalStep === 'loading'} onClose={() => {}} size="md">
                <ModalBackdrop />
                <ModalContent className="bg-white rounded-3xl p-0" style={{ width: 320, height: 320 }}>
                    <ModalBody className="mt-0 mb-0" scrollEnabled={false} contentContainerStyle={{ height: 320, justifyContent: 'center', alignItems: 'center' }}>
                        <VStack space="md" style={{ alignItems: 'center' }}>
                            <ActivityIndicator size={48} color="#006341" />
                            <Text className="text-base font-bold text-primary-900">
                                Canjeando...
                            </Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Success modal */}
            <Modal isOpen={modalStep === 'success'} onClose={handleSuccessClose} size="md">
                <ModalBackdrop />
                <ModalContent className="bg-white rounded-3xl" style={{ width: 320, minHeight: 320 }}>
                    <ModalBody className="p-4" scrollEnabled={false}>
                        <VStack className="items-center" space="md">
                            <Image
                                source={require('@/assets/sprites/Kali-congratulation.png')}
                                style={{ width: 140, height: 140, resizeMode: 'contain' }}
                            />
                            <Text className="text-base font-bold text-primary-900 text-center leading-6">
                                Recompensa canjeada exitosamente
                            </Text>
                        </VStack>
                    </ModalBody>
                    <ModalFooter className="p-4">
                        <Button
                            className="flex-1 bg-primary-900 rounded-xl"
                            onPress={handleSuccessClose}
                        >
                            <ButtonText className="text-white font-semibold">Confirmar</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export const ClaimedRewardCard: React.FC<ClaimedRewardCardProps> = ({ item }) => {
    const config = rewardCategoryConfig[item.reward.category];
    const IconComponent = config.icon;

    function formatDate(isoString: string): string {
        const date = new Date(isoString);
        return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    return (
        <Card className="bg-white rounded-2xl shadow-soft-2 border border-outline-100">
            <VStack space="md" className="p-4">
                {/* Title with Icon */}
                <HStack space="md" className="items-center justify-between">
                    <HStack space="md" className="items-center flex-1">
                        <IconComponent size={24} color="#006341" />
                        <Text className="text-lg font-bold text-primary-900 flex-1">
                            {item.reward.title}
                        </Text>
                    </HStack>
                    <Box className="bg-success-50 rounded-full px-3 py-1">
                        <Text className="text-2xs font-bold uppercase tracking-wider text-success-700">
                            Reclamada
                        </Text>
                    </Box>
                </HStack>

                {/* Category Badge */}
                <Box className={`${config.badgeBg} ${config.badgeText} self-start rounded-md px-2 py-1`}>
                    <Text className="text-2xs font-bold uppercase tracking-wider">
                        {config.label}
                    </Text>
                </Box>

                {/* Description */}
                <Text className="text-sm text-typography-500">
                    {item.reward.description}
                </Text>

                {/* Footer */}
                <HStack className="justify-between items-center mt-2">
                    <HStack space="xs" className="items-center">
                        <CoinsIcon size={13} color="#B45309" />
                        <Text className="text-xs font-semibold text-warning-700">
                            {item.reward.cost} Kalis
                        </Text>
                    </HStack>
                    <Text className="text-xs text-typography-400">{formatDate(item.claimedAt)}</Text>
                </HStack>
            </VStack>
        </Card>
    );
};