import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

import {
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../../../constants/Colors";

import chats from "../../../assets/data/chats.json";
import messagesData from "../../../assets/data/messages.json";

const CURRENT_USER_ID = 101;

export default function ChatPage() {
  const { id } = useLocalSearchParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [replyMessage, setReplyMessage] = useState(null);

  const flatListRef = useRef(null);

  /*
   * Find the current CHAT.
   *
   * CHAT.CHAT_ID
   */
  const currentChat = chats.find((chat) => String(chat.chat_id) === String(id));

  /*
   * Find the other member of the private chat.
   *
   * CHAT_MEMBER → USERS
   */
  const otherUser = currentChat?.members?.find(
    (member) => member.user_id !== CURRENT_USER_ID,
  );

  useEffect(() => {
    if (!currentChat) {
      return;
    }

    /*
     * Get MESSAGE records belonging to this chat.
     *
     * MESSAGE.CHAT_ID → CHAT.CHAT_ID
     */
    const chatMessages = messagesData
      .filter(
        (message) => String(message.chat_id) === String(currentChat.chat_id),
      )
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    setMessages(chatMessages);
  }, [currentChat]);

  /*
   * Send message
   *
   * For now:
   * MESSAGE is added locally.
   *
   * Later:
   * INSERT into Oracle MESSAGE table through API.
   */
  const sendMessage = () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const newMessage = {
      message_id: Date.now(),
      chat_id: currentChat.chat_id,
      sender_id: CURRENT_USER_ID,
      content: trimmedText,
      message_type: "TEXT",
      created_at: new Date().toISOString(),
    };

    setMessages((previousMessages) => [...previousMessages, newMessage]);

    setText("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  /*
   * Long press message → reply
   */
  const handleMessageLongPress = (message) => {
    setReplyMessage(message);
  };

  /*
   * Cancel reply
   */
  const clearReply = () => {
    setReplyMessage(null);
  };

  /*
   * Format message time
   */
  const formatTime = (date) => {
    const messageDate = new Date(date);

    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /*
   * Render individual MESSAGE
   */
  const renderMessage = ({ item }) => {
    const isMine = item.sender_id === CURRENT_USER_ID;

    const sender = currentChat?.members?.find(
      (member) => member.user_id === item.sender_id,
    );

    return (
      <Pressable
        onLongPress={() => handleMessageLongPress(item)}
        delayLongPress={300}
        style={[
          styles.messageRow,
          isMine ? styles.myMessageRow : styles.otherMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMine ? styles.myBubble : styles.otherBubble,
          ]}
        >
          {!isMine && (
            <Text style={styles.senderName}>
              {sender?.display_name || "User"}
            </Text>
          )}

          {replyMessage && replyMessage.message_id === item.message_id && (
            <View style={styles.replyPreviewInside}>
              <Text style={styles.replyPreviewName}>Replying</Text>

              <Text numberOfLines={1} style={styles.replyPreviewText}>
                {replyMessage.content}
              </Text>
            </View>
          )}

          <View style={styles.messageContentRow}>
            <Text
              style={[
                styles.messageText,
                isMine ? styles.myMessageText : styles.otherMessageText,
              ]}
            >
              {item.content}
            </Text>

            <Text
              style={[
                styles.messageTime,
                isMine ? styles.myMessageTime : styles.otherMessageTime,
              ]}
            >
              {formatTime(item.created_at)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  /*
   * If chat doesn't exist
   */
  if (!currentChat) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Chat not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ImageBackground
        source={require("../../../assets/images/pattern.png")}
        style={styles.chatBackground}
        imageStyle={styles.backgroundImage}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => String(item.message_id)}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({
              animated: false,
            })
          }
        />

        {replyMessage && (
          <View style={styles.replyBar}>
            <View style={styles.replyIndicator} />

            <View style={styles.replyContent}>
              <Text style={styles.replyTitle}>
                {replyMessage.sender_id === CURRENT_USER_ID
                  ? "You"
                  : otherUser?.display_name || "User"}
              </Text>

              <Text numberOfLines={1} style={styles.replyText}>
                {replyMessage.content}
              </Text>
            </View>

            <Pressable onPress={clearReply} style={styles.closeReplyButton}>
              <Ionicons name="close-circle" size={27} color={Colors.gray} />
            </Pressable>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Pressable
            style={styles.addButton}
            onPress={() =>
              Alert.alert(
                "Attachments",
                "Attachment options will be added later.",
              )
            }
          >
            <Ionicons name="add" size={27} color={Colors.primary} />
          </Pressable>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Message"
            placeholderTextColor={Colors.gray}
            multiline
            style={styles.textInput}
          />

          {text.trim().length === 0 ? (
            <>
              <Pressable
                style={styles.inputIcon}
                onPress={() =>
                  Alert.alert("Camera", "Camera will be added later.")
                }
              >
                <Ionicons
                  name="camera-outline"
                  size={27}
                  color={Colors.primary}
                />
              </Pressable>

              <Pressable
                style={styles.inputIcon}
                onPress={() =>
                  Alert.alert("Voice", "Voice recording will be added later.")
                }
              >
                <Ionicons name="mic-outline" size={27} color={Colors.primary} />
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={22} color="#fff" />
            </Pressable>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  chatBackground: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.45,
  },

  messageList: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 10,
  },

  messageRow: {
    width: "100%",
    marginVertical: 2,
  },

  myMessageRow: {
    alignItems: "flex-end",
  },

  otherMessageRow: {
    alignItems: "flex-start",
  },

  messageBubble: {
    maxWidth: "82%",
    minWidth: 60,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 12,
  },

  myBubble: {
    backgroundColor: Colors.lightGreen,
    borderTopRightRadius: 4,
  },

  otherBubble: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
  },

  senderName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 2,
  },

  messageContentRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  messageText: {
    fontSize: 16,
    lineHeight: 21,
    flexShrink: 1,
  },

  myMessageText: {
    color: "#000",
  },

  otherMessageText: {
    color: "#000",
  },

  messageTime: {
    fontSize: 11,
    marginLeft: 8,
    marginBottom: 1,
  },

  myMessageTime: {
    color: "#667",
  },

  otherMessageTime: {
    color: Colors.gray,
  },

  replyBar: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E9EB",
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },

  replyIndicator: {
    width: 5,
    height: "100%",
    backgroundColor: Colors.primary,
  },

  replyContent: {
    flex: 1,
    paddingHorizontal: 10,
  },

  replyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },

  replyText: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },

  closeReplyButton: {
    paddingHorizontal: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },

  addButton: {
    width: 40,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  inputIcon: {
    width: 40,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    flex: 1,
    maxHeight: 100,
    minHeight: 42,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 9,
    fontSize: 16,
    color: "#000",
  },

  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    fontSize: 18,
    color: Colors.gray,
  },

  replyPreviewInside: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    paddingLeft: 7,
    marginBottom: 5,
  },

  replyPreviewName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
  },

  replyPreviewText: {
    fontSize: 12,
    color: Colors.gray,
  },
});
