import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { ClaimCard } from '../components/ClaimCard';
import { useClaimTokens, useClaimToken } from '../hooks';

export const ClaimTokensScreen: React.FC = () => {
  const { tokens, isLoading, error } = useClaimTokens();
  const { claim: claimToken, isLoading: isClaimingToken } = useClaimToken();

  const handleClaimToken = async (tokenId: string) => {
    try {
      await claimToken(tokenId);
    } catch (error) {
      console.error('Error claiming token:', error);
    }
  };

  if (isLoading && !tokens.length) {
    return (
      <ScreenWrapper className="flex-1 bg-background-50">

        <Box className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#43B02A" />
          <Text className="mt-4 text-typography-500">Cargando tokens...</Text>
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
        <Text className="text-3xl font-extrablack text-primary-900 px-6 pt-4 pb-2">
          Tokens
        </Text>

        <ScrollView className="flex-1">
          <VStack className="px-6 py-4" space="md">
            {tokens.length > 0 ? (
              tokens.map((token) => (
                <ClaimCard
                  key={token.id}
                  token={token}
                  onClaim={handleClaimToken}
                  isLoading={isClaimingToken}
                />
              ))
            ) : (
              <Box className="py-12 items-center">
                <Text className="text-center text-typography-400">
                  No hay tokens disponibles para canjear en este momento
                </Text>
              </Box>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </ScreenWrapper>
  );
};
