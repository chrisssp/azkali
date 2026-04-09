import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { QuickAction } from '../types';

interface QuickActionsProps {
  actions: QuickAction[];
  onActionPress: (action: QuickAction) => void;
}

export function QuickActions({ actions, onActionPress }: QuickActionsProps) {
  return (
    <Box className="px-4 pb-3 pt-1">
      <Box className="flex-row flex-wrap gap-2 justify-center">
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => onActionPress(action)}
            className="px-3 py-2 bg-primary-50 border border-primary-300 rounded-full"
          >
            <Text className="text-xs font-medium text-primary-700">
              {action.emoji} {action.label}
            </Text>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
}
