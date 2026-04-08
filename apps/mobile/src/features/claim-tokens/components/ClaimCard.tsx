import React from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import type { ClaimCardProps } from '../types';

const getReasonColor = (reason: string) => {
  switch (reason) {
    case 'streak':
      return {
        bg: 'bg-warning-50',
        text: 'text-warning-800',
      };
    case 'welcome':
      return {
        bg: 'bg-success-50',
        text: 'text-success-800',
      };
    case 'referral':
      return {
        bg: 'bg-info-50',
        text: 'text-info-800',
      };
    case 'bonus':
      return {
        bg: 'bg-secondary-50',
        text: 'text-secondary-800',
      };
    case 'milestone':
      return {
        bg: 'bg-primary-50',
        text: 'text-primary-800',
      };
    default:
      return {
        bg: 'bg-background-50',
        text: 'text-background-800',
      };
  }
};

const getReasonLabel = (reason: string) => {
  switch (reason) {
    case 'streak':
      return 'RACHA';
    case 'welcome':
      return 'BIENVENIDA';
    case 'referral':
      return 'REFERRAL';
    case 'bonus':
      return 'BONUS';
    case 'milestone':
      return 'HITO';
    default:
      return reason.toUpperCase();
  }
};

export const ClaimCard: React.FC<ClaimCardProps> = ({ token, onClaim, isLoading }) => {
  const handleClaim = async () => {
    try {
      await onClaim(token.id);
    } catch (error) {
      console.error('Error claiming token:', error);
    }
  };

  const colors = getReasonColor(token.reason);

  return (
    <Card className="bg-white rounded-2xl shadow-soft-2 border border-outline-100">
      <VStack space="md" className="p-6">
        {/* Amount */}
        <Text className="text-4xl font-extrablack text-primary-700">
          +{token.amount}
        </Text>

        {/* Reason Badge */}
        <Box className={`${colors.bg} ${colors.text} rounded-md self-start px-2 py-1`}>
          <Text className="text-2xs font-bold uppercase tracking-wider">
            {getReasonLabel(token.reason)}
          </Text>
        </Box>

        {/* Description */}
        <Text className="text-sm text-typography-500">
          {token.description}
        </Text>

        {/* Claim Button - Right aligned */}
        <HStack className="justify-end mt-2">
          <Button
            className="bg-primary-500 rounded-full shadow-hard-5 px-8 py-2"
            disabled={isLoading}
            onPress={handleClaim}
          >
            <ButtonText className="text-typography-white font-bold">
              {isLoading ? 'Canjeando...' : 'Canjear'}
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};
