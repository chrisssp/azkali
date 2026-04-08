import React from 'react';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isLoading?: boolean;
}

export function MessageInput({
  value,
  onChangeText,
  onSend,
  isLoading = false,
}: MessageInputProps) {
  const isDisabled = value.trim().length === 0 || isLoading === true;
  
  return (
    <Box className="px-4 pb-4 bg-white border-t border-outline-100">
      <Box className="flex-row items-end gap-2">
        <Input className="flex-1 rounded-2xl" variant="outline" size="lg">
          <InputField
            placeholder="Escribe un mensaje..."
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#9CA3AF"
          />
        </Input>
        <TouchableOpacity
          onPress={onSend}
          disabled={isDisabled}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: isDisabled ? '#D1D5DB' : '#006341',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
