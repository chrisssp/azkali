import React from 'react';
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
    // Reducimos el py-4 inicial si sientes que hay mucho aire arriba/abajo
    <Box className="px-4 py-2">
      <Box className="flex-row flex-wrap gap-3 justify-center">
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => onActionPress(action)}
            className="w-[45%] h-32 p-4 bg-white border rounded-3xl items-center justify-center gap-2"
            style={{
              borderColor: '#A3A3A3',
            }}
          >
            {/* Emoji centrado */}
            <Text className="text-3xl">{action.emoji}</Text>

            {/* Texto centrado y con alineación de texto central */}
            <Text
              className="text-[14px] font-bold text-gray-800 text-center leading-tight"
            >
              {action.label}
            </Text>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
}