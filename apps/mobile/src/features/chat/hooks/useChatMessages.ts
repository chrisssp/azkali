import { useState, useCallback } from 'react';
import { Message, QuickAction } from '../types';

export const QUICK_ACTIONS: QuickAction[] = [
  { id: '1', label: 'Crear recordatorio', iconName: 'alarm' },
  { id: '2', label: 'Analizar documento', iconName: 'document-text' },
  { id: '3', label: 'Hacer seguimiento', iconName: 'analytics' },
  { id: '4', label: 'Generar reporte', iconName: 'clipboard' },
];

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addMessage = useCallback((content: string, sender: 'user' | 'kali') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    setInputValue('');

    // Simular respuesta de Kali
    setTimeout(() => {
      addMessage(
        `He recibido tu mensaje: "${inputValue}". En el MVP esto será procesado por la IA.`,
        'kali'
      );
    }, 800);
  }, [inputValue, addMessage]);

  const handleQuickAction = useCallback((action: QuickAction) => {
    setInputValue(action.label);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    addMessage,
    sendMessage,
    quickActions: QUICK_ACTIONS,
    handleQuickAction,
    clearMessages,
  };
}
