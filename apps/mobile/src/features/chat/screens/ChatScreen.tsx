import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Box } from '@/components/ui/box';
import {
  ChatHeader,
  MessageBubble,
  MessageInput,
  QuickActions,
  WelcomeMessage,
} from '../components';
import { useChatMessages } from '../hooks';

export function ChatScreen() {
  const {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    quickActions,
    handleQuickAction,
  } = useChatMessages();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background-light"
    >
      <ChatHeader />

      {messages.length === 0 ? (
        <Box className="flex-1 bg-background-light">
          <WelcomeMessage />
          <QuickActions
            actions={quickActions}
            onActionPress={handleQuickAction}
          />
        </Box>
      ) : (
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageBubble message={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          inverted
        />
      )}

      <MessageInput
        value={inputValue}
        onChangeText={setInputValue}
        onSend={sendMessage}
      />
    </KeyboardAvoidingView>
  );
}
