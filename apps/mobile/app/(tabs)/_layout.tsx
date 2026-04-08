import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ChatHeader } from '@/src/features/chat';

const tabBarColors = {
  background: '#006341',
  border: '#003930',
  active: '#FEF5F6',
  inactive: '#B3D8C6',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarColors.active,
        tabBarInactiveTintColor: tabBarColors.inactive,
        tabBarStyle: {
          backgroundColor: tabBarColors.background,
          borderTopColor: tabBarColors.border,
          borderTopWidth: 1,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Recompensas',
          header: () => <ChatHeader mode="main" userName="Christian" tokens={10} progress={50} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="claim-tokens"
        options={{
          title: 'Tokens',
          header: () => <ChatHeader mode="main" userName="Christian" tokens={10} progress={50} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}