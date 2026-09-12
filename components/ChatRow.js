import AppleStyleSwipeableRow from "./AppleStyleSwipeableRow";

import { format } from "date-fns";

import { Link } from "expo-router";

import { Image, Text, TouchableHighlight, View } from "react-native";

import { useTheme } from "react-native-paper";

export default function ChatRow({ chat }) {
  const { colors } = useTheme();

  // Temporary logged-in user for frontend testing
  const currentUserId = 101;

  // Find the other member in a private chat
  const otherUser = chat.members.find(
    (member) => member.user_id !== currentUserId,
  );

  if (!otherUser || !chat.last_message) {
    return null;
  }

  return (
    <AppleStyleSwipeableRow>
      <Link href={`/(tabs)/chats/${chat.chat_id}`} asChild>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor={colors.surfaceVariant}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              paddingLeft: 20,
              paddingVertical: 10,
              marginTop: 10,
              backgroundColor: colors.background,
            }}
          >
            <Image
              source={{ uri: otherUser.profile_image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.onSurface,
                }}
              >
                {otherUser.display_name}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: colors.onSurfaceVariant,
                }}
                numberOfLines={1}
              >
                {chat.last_message.content.length > 40
                  ? `${chat.last_message.content.substring(0, 40)}...`
                  : chat.last_message.content}
              </Text>
            </View>

            <Text
              style={{
                color: colors.onSurfaceVariant,
                paddingRight: 20,
                alignSelf: "flex-start",
              }}
            >
              {format(new Date(chat.last_message.created_at), "MM.dd.yy")}
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  );
}
