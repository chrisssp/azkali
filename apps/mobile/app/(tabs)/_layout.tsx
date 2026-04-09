import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalHeader } from '@/components/layout';

const tabBarColors = {
  background: '#FFFFFF',
  border: '#D4D4D4',
  active: '#006341',
  inactive: '#D4D4D4',
};

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarColors.active,
        tabBarInactiveTintColor: tabBarColors.inactive,
        tabBarStyle: {
          backgroundColor: tabBarColors.background,
          borderTopColor: tabBarColors.border,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingTop: 8,
          paddingBottom: 10 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
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
          title: 'Kalis',
          header: () => <GlobalHeader mode="settings" tokens={10} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}