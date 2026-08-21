import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

//Tab layout for the app, this is where we define the tabs and their icons, as well as some styling for the tab bar and headers. The useSegments hook is used to determine the current route segment, which allows us to conditionally hide the tab bar on certain screens (like when viewing a specific chat).

export default function TabsLayout() {
  const segments = useSegments();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.background,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveBackgroundColor: Colors.background,
          tabBarActiveBackgroundColor: Colors.background,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="updates"
          options={{
            title: "Updates",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="update" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="calls"
          options={{
            title: "Calls",
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="phone-outline"
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="communities"
          options={{
            title: "Communities",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="people" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
            headerShown: false,
            tabBarStyle: {
              backgroundColor: Colors.background,
              display: segments[2] === "[id]" ? "none" : "flex",
            },
          }}
        />

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
