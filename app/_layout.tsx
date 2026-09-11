import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PhoneFrame from '../components/PhoneFrame';
import { colors } from '../constants/theme';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <PhoneFrame>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { backgroundColor: colors.forest, borderTopWidth: 0 },
              tabBarActiveTintColor: colors.terracotta,
              tabBarInactiveTintColor: colors.cream,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="browse"
              options={{
                title: 'Browse',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="list"
              options={{
                title: 'List',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="add-circle" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="contact"
              options={{
                title: 'Contact',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="mail" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="community"
              options={{
                title: 'Community',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="chatbubbles" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="book/[id]"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="checkout"
              options={{
                href: null,
              }}
            />
          </Tabs>
        </PhoneFrame>
      </CartProvider>
    </SafeAreaProvider>
  );
}
