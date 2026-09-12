import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useSegments } from "expo-router";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useTheme } from "react-native-paper";

import chats from "../../../assets/data/chats.json";

export default function ChatsLayout() {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <Stack
      screenOptions={{
        statusBarStyle: isDark ? "light" : "dark",
        statusBarColor: colors.background,
        navigationBarColor: colors.background,
      }}
    >
      {/* =========================
          CHAT LIST
      ========================= */}

      <Stack.Screen
        name="index"
        options={{
          title: "Chats",

          headerLargeTitle: true,

          headerTransparent: false,

          headerStyle: {
            backgroundColor: colors.background,
          },

          headerTintColor: colors.onSurface,

          headerLargeTitleStyle: {
            fontSize: 34,
            fontWeight: "700",
            color: colors.onSurface,
          },

          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 30,
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  color={colors.primary}
                  size={30}
                />
              </TouchableOpacity>

              <Link href="/contacts" asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="add-circle"
                    color={colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),

          headerSearchBarOptions: {
            placeholder: "Search",
            textColor: colors.onSurface,
            hintTextColor: colors.onSurfaceVariant,
            headerIconColor: colors.primary,
            barTintColor: colors.surface,
          },
        }}
      />

      {/* =========================
          INDIVIDUAL CHAT
      ========================= */}

      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerBackTitleVisible: false,

          headerTitle: () => <ChatHeader />,

          headerStyle: {
            backgroundColor: colors.background,
          },

          headerTintColor: colors.onSurface,
        }}
      />

      {/* =========================
          CHAT INFO
      ========================= */}

      <Stack.Screen
        name="info/[id]"
        options={{
          title: "Info",

          headerBackTitleVisible: false,

          headerStyle: {
            backgroundColor: colors.background,
          },

          headerTintColor: colors.onSurface,
        }}
      />
    </Stack>
  );
}

/* =================================
   CHAT HEADER
================================= */

function ChatHeader() {
  const { colors } = useTheme();

  const segments = useSegments();

  const id = segments[segments.length - 1];

  const currentChat = chats.find((chat) => String(chat.chat_id) === String(id));

  const currentUserId = 101;

  const otherUser = currentChat?.members?.find(
    (member) => member.user_id !== currentUserId,
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingBottom: 4,
      }}
    >
      <Image
        source={{
          uri: otherUser?.profile_image || "https://i.pravatar.cc/150?img=12",
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
        }}
      />

      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.onSurface,
          }}
        >
          {otherUser?.display_name || "User"}
        </Text>
      </View>
    </View>
  );
}
