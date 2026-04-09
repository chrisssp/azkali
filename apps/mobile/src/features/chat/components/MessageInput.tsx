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
    // Agregamos py-4 para dar aire arriba y abajo
    <Box className="px-4 py-2">
      <Box className="flex-row items-center gap-3">
        <Input
          className="flex-1 rounded-2xl border-primary-200 h-12" // Forzamos altura similar al botón
          variant="outline"
          size="lg"
        >
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
            backgroundColor: isDisabled ? '#CCE5D9' : '#006341',
            alignItems: 'center',
            justifyContent: 'center',
            // Opcional: un ligero margen para evitar que roce bordes si el layout cambia
            marginTop: 'auto',
            marginBottom: 'auto'
          }}
        >
          <Ionicons
            name="send"
            size={20}
            color={isDisabled ? '#99CCB3' : '#FFFFFF'}
            style={{ marginLeft: 2 }} // Corrección visual para centrar el icono de flecha
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}