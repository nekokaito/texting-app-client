import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useSegments } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";

import chats from "../../../assets/data/chats.json";
import Colors from "../../../constants/Colors";

export default function ChatsLayout() {
  return (
    <Stack>
      {/* =========================
          CHAT LIST
      ========================= */}

      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",

          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                color={Colors.primary}
                size={30}
              />
            </TouchableOpacity>
          ),

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
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>

              <Link href="/contacts" asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="add-circle"
                    color={Colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),

          headerStyle: {
            backgroundColor: "#fff",
          },

          headerSearchBarOptions: {
            placeholder: "Search",
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
            backgroundColor: Colors.background,
          },
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
            backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  );
}

/* =================================
   CHAT HEADER
================================= */

function ChatHeader() {
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
            color: "#000",
          }}
        >
          {otherUser?.display_name || "User"}
        </Text>
      </View>
    </View>
  );
}
