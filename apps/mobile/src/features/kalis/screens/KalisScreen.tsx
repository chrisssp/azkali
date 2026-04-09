import React, { useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { InfoIcon, CoinsIcon, XIcon } from 'lucide-react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { RedeemedKaliCard } from '../components';
import { useRedeemedKalis } from '../hooks';
import { CONVERSION_RATES } from '../types';

const TERMS = [
    'Los kalis no tienen valor monetario, no son canjeables por efectivo y son intransferibles entre cuentas.',
    'Los kalis acumulados tienen una vigencia de 12 meses a partir de su fecha de emisión. Una vez vencidos no podrán ser recuperados.',
    'Banco Azteca S.A. se reserva el derecho de modificar, suspender o cancelar las tasas de conversión y el programa de kalis en cualquier momento, sin previo aviso.',
    'La acumulación de kalis aplica únicamente en establecimientos participantes del ecosistema Grupo Salinas: Elektra, Totalplay, Italika, TV Azteca y otros afiliados.',
    'Los kalis se acreditan en un plazo máximo de 72 horas hábiles después de confirmada la transacción.',
    'En caso de cancelación, devolución o contracargo de una compra, los kalis correspondientes serán revertidos automáticamente.',
    'El programa de kalis no aplica en compras de divisas, pagos de tarjeta de crédito ni retiros de efectivo.',
    'Banco Azteca no se hace responsable por fallas técnicas que impidan la acreditación de kalis fuera de su control.',
    'Para los Términos y Condiciones completos consulta bancoazteca.com.mx o acude a tu sucursal más cercana.',
];

export const KalisScreen: React.FC = () => {
    const { items, totalKalis, isLoading, error } = useRedeemedKalis();
    const [showModal, setShowModal] = useState(false);

    if (isLoading && !items.length) {
        return (
            <ScreenWrapper className="flex-1 bg-background-50">
                <Box className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#43B02A" />
                    <Text className="mt-4 text-typography-500">Cargando historial...</Text>
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
            <VStack className="flex-1">
                {/* Header */}
                <Text className="text-3xl font-extrablack text-primary-900 px-6 pt-4 pb-3">
                    Kalis
                </Text>

                {/* Kali balance card */}
                <Box className="mx-6 mb-4 bg-primary-900 rounded-2xl px-5 py-4">
                    <Text className="text-xs font-semibold text-primary-200 uppercase tracking-widest mb-1">
                        Kalis acumulados
                    </Text>
                    <HStack className="items-center" space="sm">
                        <CoinsIcon size={26} color="#F59E0B" />
                        <Text className="text-3xl font-extrabold text-white flex-1">
                            {totalKalis.toFixed(2)}
                        </Text>
                        <Pressable
                            onPress={() => setShowModal(true)}
                            className="w-8 h-8 rounded-full bg-primary-700 items-center justify-center"
                            accessibilityLabel="Ver cómo se calculan los kalis"
                            accessibilityRole="button"
                        >
                            <InfoIcon size={16} color="#FFFFFF" />
                        </Pressable>
                    </HStack>
                    <Text className="text-xs text-primary-300 mt-2">
                        Se generan al pagar con tu tarjeta Banco Azteca en el ecosistema Grupo Salinas
                    </Text>
                </Box>

                {/* Section label */}
                <Text className="text-xs font-bold text-typography-400 uppercase tracking-widest px-6 mb-2">
                    Historial de kalis
                </Text>

                {/* List */}
                <ScrollView className="flex-1">
                    <VStack className="px-6 pb-8" space="sm">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <RedeemedKaliCard key={item.id} item={item} />
                            ))
                        ) : (
                            <Box className="py-12 items-center">
                                <Text className="text-center text-typography-400">
                                    Aún no tienes kalis acumulados. ¡Empieza a pagar con tu tarjeta Banco Azteca!
                                </Text>
                            </Box>
                        )}
                    </VStack>
                </ScrollView>
            </VStack>

            {/* Conversion info modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <ModalBackdrop />
                <ModalContent
                    className="bg-white rounded-3xl mx-4"
                    style={{ maxHeight: '85%' }}
                >
                    <ModalHeader className="px-5 pt-5 pb-3">
                        <HStack className="flex-1 items-center" space="sm">
                            <CoinsIcon size={22} color="#B45309" />
                            <Text className="text-xl font-extrabold text-primary-900 flex-1">
                                ¿Cómo se calculan los kalis?
                            </Text>
                        </HStack>
                        <ModalCloseButton>
                            <Box className="w-7 h-7 rounded-full bg-background-100 items-center justify-center">
                                <XIcon size={14} color="#6B7280" />
                            </Box>
                        </ModalCloseButton>
                    </ModalHeader>

                    <ModalBody className="px-5" style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                            <Text className="text-sm text-typography-600 mb-4 leading-6">
                                Cada vez que pagas con tu tarjeta Banco Azteca en establecimientos participantes, obtienes kalis según la siguiente tabla:
                            </Text>

                            {/* Table header */}
                            <Box className="bg-primary-900 rounded-t-xl px-3 py-2.5">
                                <HStack>
                                    <Text className="text-xs font-bold text-white flex-1">Tipo de tarjeta</Text>
                                    <Text className="text-xs font-bold text-white w-20 text-right">por $100</Text>
                                    <Text className="text-xs font-bold text-white w-20 text-right">por $1,000</Text>
                                </HStack>
                            </Box>

                            {/* Table rows */}
                            {CONVERSION_RATES.map((rate, index) => (
                                <Box
                                    key={rate.cardType}
                                    className={`px-3 py-3 border-b border-outline-100 ${index % 2 === 0 ? 'bg-background-50' : 'bg-white'} ${index === CONVERSION_RATES.length - 1 ? 'rounded-b-xl border-0' : ''}`}
                                >
                                    <HStack className="items-center">
                                        <Text className="text-sm font-semibold text-primary-900 flex-1">{rate.label}</Text>
                                        <Text className="text-sm text-warning-700 font-bold w-20 text-right">{rate.per100} K</Text>
                                        <Text className="text-sm text-warning-700 font-bold w-20 text-right">{rate.per1000} K</Text>
                                    </HStack>
                                </Box>
                            ))}

                            <Divider className="my-4" />

                            {/* Legal small print */}
                            <Text className="text-sm font-bold text-typography-500 uppercase tracking-wider mb-3">
                                Términos y condiciones
                            </Text>
                            <VStack space="sm">
                                {TERMS.map((term, i) => (
                                    <HStack key={i} space="xs" className="items-start">
                                        <Text className="text-xs text-typography-400 mt-0.5">•</Text>
                                        <Text className="text-xs text-typography-400 flex-1 leading-5">{term}</Text>
                                    </HStack>
                                ))}
                            </VStack>

                            <Box className="mt-4 mb-2 bg-warning-50 rounded-xl p-3 border border-warning-200">
                                <Text className="text-xs text-warning-800 leading-5 text-center">
                                    Programa regulado por Banco Azteca S.A. Institución de Banca Múltiple. CNBV Autorización No. 0248. Los kalis no constituyen un depósito bancario ni instrumento de inversión.
                                </Text>
                            </Box>
                        </ScrollView>
                    </ModalBody>

                    <ModalFooter className="px-5 pb-5 pt-3">
                        <Button
                            className="flex-1 bg-primary-900 rounded-xl"
                            onPress={() => setShowModal(false)}
                        >
                            <ButtonText className="font-bold text-white">Entendido</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ScreenWrapper>
    );
};
