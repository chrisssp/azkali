import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Box } from '@/components/ui/box';
import {
  MessageBubble,
  MessageInput,
  PurchaseAnalysisFlow,
  QuickActions,
  TypingIndicator,
  WelcomeMessage,
} from '../components';
import { QUICK_ACTIONS } from '../hooks/useChatMessages';
import type { Message, QuickAction } from '../types';
import { useKaliChat, type KaliShortcut } from '@/hooks/useKaliChat';
import { useGlobalStore } from '@/src/store/useGlobalStore';
import { GlobalHeader } from '@/components/layout';

function quickActionIdToShortcut(id: string): KaliShortcut | null {
  switch (id) {
    case '1': return 'reminder';
    case '2': return 'document';
    case '3': return 'followup';
    case '4': return 'report';
    default: return null;
  }
}

export function ChatScreen() {
  const user = useGlobalStore((s) => s.user);

  const userContext = useMemo(
    () => ({
      name: user?.name ?? 'Usuario',
      monthlyIncome: 0,
      accountType: 'cuenta habitual',
      currentBalance: 0,
      financialGoal: 'mejorar mis finanzas y evitar gastos impulsivos',
    }),
    [user?.name]
  );

  const {
    messages: geminiMessages,
    sendMessage,
    isLoading,
    runShortcut,
    messagesDisplayText,
  } = useKaliChat(userContext);

  const messages: Message[] = useMemo(
    () =>
      geminiMessages.map((m, i) => ({
        id: `${i}-${m.role}`,
        content: messagesDisplayText(m),
        sender: m.role === 'user' ? ('user' as const) : ('kali' as const),
        timestamp: new Date(),
      })),
    [geminiMessages, messagesDisplayText]
  );

  const [inputValue, setInputValue] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages.length, isLoading]);

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text) return;
    await sendMessage(text);
    setInputValue('');
  }, [inputValue, sendMessage]);

  const handleQuickAction = useCallback(
    (action: QuickAction) => {
      const shortcut = quickActionIdToShortcut(action.id);
      if (shortcut) void runShortcut(shortcut);
    },
    [runShortcut]
  );

  return (
    <Box className="flex-1 bg-background-light">
      <GlobalHeader mode="tokens" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
        className="flex-1 bg-background-light"
      >
        {messages.length === 0 ? (
          <Box className="flex-1 bg-background-light">
            <WelcomeMessage userName={userContext.name} />
            <PurchaseAnalysisFlow triggerClassName="self-center mt-1 mb-3" />
            <QuickActions actions={QUICK_ACTIONS} onActionPress={handleQuickAction} />
          </Box>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <MessageBubble message={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
            ListFooterComponent={isLoading ? <TypingIndicator /> : null}
          />
        )}

        <MessageInput
          value={inputValue}
          onChangeText={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </Box>
  );
}