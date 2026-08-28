import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";

export default function TabsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },

          headerShadowVisible: false,

          tabBarStyle: {
            backgroundColor: Colors.background,
          },

          tabBarActiveTintColor: Colors.primary,

          tabBarInactiveTintColor: Colors.gray,

          tabBarInactiveBackgroundColor: Colors.background,

          tabBarActiveBackgroundColor: Colors.background,
        }}
      >
        {/* CHAT */}

        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",

            tabBarIcon: ({ size, color }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),

            headerShown: false,
          }}
        />

        {/* CONTACTS */}

        <Tabs.Screen
          name="contacts"
          options={{
            title: "Contacts",

            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),

            headerShown: false,
          }}
        />

        {/* SETTINGS */}

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",

            tabBarIcon: ({ size, color }) => (
              <Ionicons name="cog" size={size} color={color} />
            ),

            headerShown: false,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
