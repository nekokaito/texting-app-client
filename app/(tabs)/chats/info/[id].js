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

import chatInfoData from "../../../../assets/data/chat-info.json";

export default function ChatInfoPage() {
  const { id } = useLocalSearchParams();

  /*
   * Find API-style chat information
   */
  const chatInfo = chatInfoData.find(
    (item) => String(item.chat.chat_id) === String(id),
  );

  /*
   * If chat doesn't exist
   */
  if (!chatInfo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Chat information not found</Text>
      </View>
    );
  }

  const { chat, user, message_summary } = chatInfo;

  console.log("INFO PAGE ID:", id);
  console.log("CHAT INFO DATA:", chatInfoData);

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
            USER
        ========================= */}

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: user.profile_image || "https://i.pravatar.cc/300?img=12",
            }}
            style={styles.profileImage}
          />

          <Text style={styles.name}>{user.display_name}</Text>

          {user.username && (
            <Text style={styles.username}>@{user.username}</Text>
          )}

          {user.phone_number && (
            <Text style={styles.phone}>{user.phone_number}</Text>
          )}
        </View>

        {/* =========================
            CHAT INFORMATION
        ========================= */}

        <Text style={styles.sectionTitle}>Chat Information</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={Colors.primary}
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Chat ID</Text>

              <Text style={styles.infoValue}>{chat.chat_id}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={24} color={Colors.primary} />

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Chat Type</Text>

              <Text style={styles.infoValue}>{chat.chat_type}</Text>
            </View>
          </View>
        </View>

        {/* =========================
            MEDIA
        ========================= */}

        <Text style={styles.sectionTitle}>Media, Links and Docs</Text>

        <Pressable
          style={styles.card}
          onPress={() =>
            Alert.alert(
              "Media",
              "Media, links and documents will be added later.",
            )
          }
        >
          <View style={styles.infoRow}>
            <Ionicons name="images-outline" size={24} color={Colors.primary} />

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Media, Links and Docs</Text>

              <Text style={styles.infoValue}>
                {message_summary.attachment_count} items
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
        </Pressable>

        {/* =========================
            CHAT OPTIONS
        ========================= */}

        <Text style={styles.sectionTitle}>Chat Settings</Text>

        <View style={styles.card}>
          <Pressable
            style={styles.actionRow}
            onPress={() =>
              Alert.alert(
                "Notifications",
                "Notification settings will be connected later.",
              )
            }
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.primary}
            />

            <Text style={styles.actionText}>Notifications</Text>

            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </Pressable>

          <View style={styles.separator} />

          <Pressable
            style={styles.actionRow}
            onPress={() =>
              Alert.alert(
                "Starred Messages",
                "Starred messages will be added later.",
              )
            }
          >
            <Ionicons name="star-outline" size={24} color={Colors.primary} />

            <Text style={styles.actionText}>Starred Messages</Text>

            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </Pressable>

          <View style={styles.separator} />

          <Pressable
            style={styles.actionRow}
            onPress={() =>
              Alert.alert(
                "Wallpaper",
                "Wallpaper settings will be added later.",
              )
            }
          >
            <Ionicons
              name="color-palette-outline"
              size={24}
              color={Colors.primary}
            />

            <Text style={styles.actionText}>Wallpaper</Text>

            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </Pressable>
        </View>

        {/* =========================
            PRIVACY
        ========================= */}

        <Text style={styles.sectionTitle}>Privacy and Security</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={Colors.primary}
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Encryption</Text>

              <Text style={styles.infoValue}>Messages are protected.</Text>
            </View>
          </View>
        </View>

        {/* =========================
            DANGER
        ========================= */}

        <View style={styles.card}>
          <Pressable
            style={styles.actionRow}
            onPress={() =>
              Alert.alert(
                `Block ${user.display_name}?`,
                "This will later create a BLOCKED_USER record.",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Block",
                    style: "destructive",
                    onPress: () => console.log("Block:", user.user_id),
                  },
                ],
              )
            }
          >
            <Ionicons name="ban-outline" size={24} color="#D9534F" />

            <Text style={[styles.actionText, styles.dangerText]}>
              Block {user.display_name}
            </Text>
          </Pressable>

          <View style={styles.separator} />

          <Pressable
            style={styles.actionRow}
            onPress={() =>
              Alert.alert(
                "Report User",
                "Reporting will be connected to the backend later.",
              )
            }
          >
            <Ionicons name="flag-outline" size={24} color="#D9534F" />

            <Text style={[styles.actionText, styles.dangerText]}>
              Report User
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          {message_summary.message_count} messages
        </Text>
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

  sectionTitle: {
    fontSize: 14,
    color: Colors.gray,
    paddingHorizontal: 18,
    paddingTop: 25,
    paddingBottom: 8,
  },

  card: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },

  infoRow: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 15,
  },

  infoTitle: {
    fontSize: 16,
    color: "#000",
  },

  infoValue: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 3,
  },

  actionRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  actionText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  dangerText: {
    color: "#D9534F",
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginLeft: 40,
  },

  footer: {
    textAlign: "center",
    color: Colors.gray,
    fontSize: 12,
    marginTop: 25,
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  errorText: {
    fontSize: 16,
    color: Colors.gray,
  },
});
