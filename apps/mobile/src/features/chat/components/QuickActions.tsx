import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { QuickAction } from "../types";

interface QuickActionsProps {
  actions: QuickAction[];
  onActionPress: (action: QuickAction) => void;
}

export function QuickActions({ actions, onActionPress }: QuickActionsProps) {
  return (
    // Reducimos el py-4 inicial si sientes que hay mucho aire arriba/abajo
    <Box className="py-2">
      <Box className="flex-row flex-wrap gap-3 justify-center">
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => onActionPress(action)}
            className="w-[45%] h-32 p-4 bg-white border rounded-3xl items-center justify-center gap-2"
            style={{
              borderColor: "#D4D4D4",
            }}
          >
            {/* Icono centrado */}
            <Ionicons name={action.iconName as any} size={32} color="#006341" />

            {/* Texto centrado y con alineación de texto central */}
            <Text className="text-[14px] text-gray-800 text-center leading-tight">
              {action.label}
            </Text>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
}
