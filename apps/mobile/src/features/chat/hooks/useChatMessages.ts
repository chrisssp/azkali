import { useState, useCallback } from 'react';
import { Message, QuickAction } from '../types';

export const QUICK_ACTIONS: QuickAction[] = [
  { id: '1', label: 'Recuérdame mi próximo pago', iconName: 'alarm' },
  { id: '2', label: '¿En qué gasté más este mes?', iconName: 'pie-chart' },
  { id: '3', label: 'Ayúdame a ajustar mi presupuesto', iconName: 'wallet' },
  { id: '4', label: 'Arma un plan para mi meta de ahorro', iconName: 'flag' },
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
