import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { useRouter } from 'expo-router';

interface PurchaseAnalysisFlowProps {
  triggerClassName?: string;
}

export function PurchaseAnalysisFlow({ triggerClassName = 'self-center mb-3' }: PurchaseAnalysisFlowProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/purchase-analysis')} className={triggerClassName}>
      <Box className="bg-primary-700 border border-primary-800 rounded-full px-4 py-2.5 flex-row items-center justify-center gap-2">
        <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />
        <Text className="text-white font-semibold text-sm">Analiza tu compra</Text>
      </Box>
    </Pressable>
  );
}
