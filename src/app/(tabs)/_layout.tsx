import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={size}
              color={typeof color === 'string' ? color : 'gray'}
            />
          ),
        }}
      />    

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={typeof color === 'string' ? color : 'gray'}
            />
          ),
        }}
      />
    </Tabs>
  );
}