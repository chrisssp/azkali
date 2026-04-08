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
    <ScrollView
      horizontal={true}
      className="px-4 py-3"
    >
      <Box className="flex-row gap-2">
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => onActionPress(action)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-2xl mr-2"
          >
            <Text className="text-sm font-medium text-gray-900">
              {action.emoji} {action.label}
            </Text>
          </Pressable>
        ))}
      </Box>
    </ScrollView>
  );
}
