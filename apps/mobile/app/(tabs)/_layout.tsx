import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ChatHeader } from '@/src/features/chat';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => (
          <ChatHeader
            userName="Christian"
            tokens={10}
            progress={50}
            showSettings={true}
          />
        ),
        // 2. Estilizamos la barra nativa usando los colores de tu tailwind.config
        tabBarActiveTintColor: '#006341', // primary-700
        tabBarInactiveTintColor: '#A6A6A6', // typography-400
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#EBEBEB', // outline-100
          borderTopWidth: 1,
          elevation: 0, // Quita la sombra en Android para un look más flat
          shadowOpacity: 0, // Quita la sombra en iOS
          height: 60, // Dale un poco de respiro a la barra
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Recompensas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="claim-tokens"
        options={{
          title: 'Tokens',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}