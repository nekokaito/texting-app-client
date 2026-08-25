import { Stack, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../../../../constants/Colors";

import chats from "../../../../assets/data/chats.json";
import messagesData from "../../../../assets/data/messages.json";

const CURRENT_USER_ID = 101;

export default function ChatInfoPage() {
  const { id } = useLocalSearchParams();

  /*
   * Find current chat
   *
   * CHAT.CHAT_ID
   */
  const currentChat = chats.find((chat) => String(chat.chat_id) === String(id));

  /*
   * Find the other member
   *
   * CHAT_MEMBER → USERS
   */
  const otherUser = currentChat?.members?.find(
    (member) => member.user_id !== CURRENT_USER_ID,
  );

  /*
   * Messages belonging to this chat
   *
   * MESSAGE.CHAT_ID
   */
  const chatMessages = messagesData.filter(
    (message) => String(message.chat_id) === String(currentChat?.chat_id),
  );

  /*
   * Number of attachments
   *
   * Later this will come from ATTACHMENT.
   */
  const attachmentCount = chatMessages.filter(
    (message) => message.message_type && message.message_type !== "TEXT",
  ).length;

  if (!currentChat || !otherUser) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>User information not found</Text>
      </View>
    );
  }

  const profileImage =
    otherUser.profile_image ||
    otherUser.img ||
    otherUser.avatar ||
    "https://i.pravatar.cc/300?img=12";

  const displayName = otherUser.display_name || otherUser.name || "User";

  const phone = otherUser.phone_number || otherUser.phone || "";

  const username = otherUser.username || "";

  return (
    <>
      <Stack.Screen
        options={{
          title: "Info",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* =========================
            PROFILE
        ========================= */}

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: profileImage,
            }}
            style={styles.profileImage}
          />

          <Text style={styles.name}>{displayName}</Text>

          {username !== "" && <Text style={styles.username}>@{username}</Text>}

          {phone !== "" && <Text style={styles.phone}>{phone}</Text>}
        </View>

        {/* =========================
            ACTIONS
        ========================= */}

        <View style={styles.actionsCard}>
          <Pressable
            style={styles.action}
            onPress={() =>
              Alert.alert(
                "Notifications",
                "Chat notification settings will be added later.",
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.primary}
              />
            </View>

            <Text style={styles.actionText}>Notifications</Text>

            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </Pressable>

          <View style={styles.separator} />

          <Pressable
            style={styles.action}
            onPress={() =>
              Alert.alert(
                "Starred Messages",
                "Starred messages will be added later.",
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons name="star-outline" size={24} color={Colors.primary} />
            </View>

            <Text style={styles.actionText}>Starred Messages</Text>

            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </Pressable>
        </View>

        {/* =========================
            MEDIA
        ========================= */}

        <Text style={styles.sectionTitle}>Media, Links and Docs</Text>

        <Pressable
          style={styles.mediaCard}
          onPress={() =>
            Alert.alert(
              "Media",
              "Media, links and documents will be displayed here.",
            )
          }
        >
          <View style={styles.mediaIcon}>
            <Ionicons name="images-outline" size={25} color={Colors.primary} />
          </View>

          <View style={styles.mediaTextContainer}>
            <Text style={styles.mediaTitle}>Media, Links and Docs</Text>

            <Text style={styles.mediaSubtitle}>{attachmentCount} items</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </Pressable>

        {/* =========================
            PRIVACY / SECURITY
        ========================= */}

        <Text style={styles.sectionTitle}>Privacy and Security</Text>

        <View style={styles.actionsCard}>
          <View style={styles.action}>
            <View style={styles.actionIcon}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={Colors.primary}
              />
            </View>

            <View style={styles.actionTextContainer}>
              <Text style={styles.actionText}>Encryption</Text>

              <Text style={styles.description}>
                Messages are protected with end-to-end encryption.
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            CHAT SETTINGS
        ========================= */}

        <Text style={styles.sectionTitle}>Chat Settings</Text>

        <View style={styles.actionsCard}>
          <Pressable
            style={styles.action}
            onPress={() =>
              Alert.alert(
                "Wallpaper",
                "Chat wallpaper settings will be added later.",
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="color-palette-outline"
                size={24}
                color={Colors.primary}
              />
            </View>

            <Text style={styles.actionText}>Wallpaper</Text>

            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </Pressable>

          <View style={styles.separator} />

          <Pressable
            style={styles.action}
            onPress={() =>
              Alert.alert(
                "Clear Chat",
                "Clear chat functionality will be connected to the backend later.",
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons name="trash-outline" size={24} color="#D9534F" />
            </View>

            <Text style={[styles.actionText, styles.dangerText]}>
              Clear Chat
            </Text>
          </Pressable>
        </View>

        {/* =========================
            BLOCK / REPORT
        ========================= */}

        <View style={styles.actionsCard}>
          <Pressable
            style={styles.action}
            onPress={() =>
              Alert.alert(
                `Block ${displayName}?`,
                "This will later create a record in BLOCKED_USER.",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Block",
                    style: "destructive",
                    onPress: () => {
                      console.log("Block user:", otherUser.user_id);
                    },
                  },
                ],
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons name="ban-outline" size={24} color="#D9534F" />
            </View>

            <Text style={[styles.actionText, styles.dangerText]}>
              Block {displayName}
            </Text>
          </Pressable>

          <View style={styles.separator} />

          <Pressable
            style={styles.action}
            onPress={() =>
              Alert.alert(
                "Report User",
                "Report functionality will be connected to the backend later.",
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons name="flag-outline" size={24} color="#D9534F" />
            </View>

            <Text style={[styles.actionText, styles.dangerText]}>
              Report User
            </Text>
          </Pressable>
        </View>

        <Text style={styles.chatId}>Chat ID: {currentChat.chat_id}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  contentContainer: {
    paddingBottom: 40,
  },

  /* =========================
     PROFILE
  ========================= */

  profileSection: {
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingTop: 25,
    paddingBottom: 25,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },

  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },

  username: {
    fontSize: 15,
    color: Colors.gray,
    marginTop: 3,
  },

  phone: {
    fontSize: 15,
    color: Colors.gray,
    marginTop: 5,
  },

  /* =========================
     SECTION
  ========================= */

  sectionTitle: {
    fontSize: 14,
    color: Colors.gray,
    paddingHorizontal: 18,
    paddingTop: 25,
    paddingBottom: 8,
    fontWeight: "500",
  },

  /* =========================
     CARDS
  ========================= */

  actionsCard: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },

  action: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    width: 42,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  actionTextContainer: {
    flex: 1,
  },

  actionText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  description: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 3,
    marginRight: 10,
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginLeft: 42,
  },

  dangerText: {
    color: "#D9534F",
  },

  /* =========================
     MEDIA
  ========================= */

  mediaCard: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },

  mediaIcon: {
    width: 45,
    alignItems: "flex-start",
  },

  mediaTextContainer: {
    flex: 1,
  },

  mediaTitle: {
    fontSize: 16,
    color: "#000",
  },

  mediaSubtitle: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 3,
  },

  /* =========================
     FOOTER
  ========================= */

  chatId: {
    textAlign: "center",
    color: Colors.gray,
    fontSize: 12,
    marginTop: 30,
  },

  /* =========================
     ERROR
  ========================= */

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  errorText: {
    color: Colors.gray,
    fontSize: 16,
  },
});
