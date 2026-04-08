import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
        }}
      />
    </Tabs>
  );
}
