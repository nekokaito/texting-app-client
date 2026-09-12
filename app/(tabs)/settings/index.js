import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import BoxedIcon from "../../../components/BoxedIcon";
import Colors from "../../../constants/Colors";
import { defaultStyles } from "../../../constants/Styles";

export default function SettingsPage() {
  const router = useRouter();
  const { colors } = useTheme();

  const [logoutVisible, setLogoutVisible] = useState(false);

  const devices = [
    {
      name: "Broadcast Lists",
      icon: "megaphone",
      backgroundColor: Colors.green,
    },
    {
      name: "Starred Messages",
      icon: "star",
      backgroundColor: Colors.yellow,
    },
    {
      name: "Linked Devices",
      icon: "laptop-outline",
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: "Account",
      icon: "key",
      backgroundColor: Colors.primary,
    },
    {
      name: "Privacy",
      icon: "lock-closed",
      backgroundColor: "#33A5D1",
    },
    {
      name: "Chats",
      icon: "logo-whatsapp",
      backgroundColor: Colors.green,
    },
    {
      name: "Notifications",
      icon: "notifications",
      backgroundColor: Colors.red,
    },
    {
      name: "Storage and Data",
      icon: "repeat",
      backgroundColor: Colors.green,
    },
  ];

  const support = [
    {
      name: "Help",
      icon: "information",
      backgroundColor: Colors.primary,
    },
    {
      name: "Tell a Friend",
      icon: "heart",
      backgroundColor: Colors.red,
    },
  ];

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("user_session");
      setLogoutVisible(false);
      router.replace("/welcome");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7} style={defaultStyles.item}>
      <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

      <Text
        style={{
          fontSize: 18,
          flex: 1,
          color: colors.onSurface,
        }}
      >
        {item.name}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.onSurfaceVariant}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={defaultStyles.block}>
            <FlatList
              data={devices}
              scrollEnabled={false}
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={() => (
                <View style={defaultStyles.separator} />
              )}
              renderItem={renderItem}
            />
          </View>

          <View style={defaultStyles.block}>
            <FlatList
              data={items}
              scrollEnabled={false}
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={() => (
                <View style={defaultStyles.separator} />
              )}
              renderItem={renderItem}
            />
          </View>

          <View style={defaultStyles.block}>
            <FlatList
              data={support}
              scrollEnabled={false}
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={() => (
                <View style={defaultStyles.separator} />
              )}
              renderItem={renderItem}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setLogoutVisible(true)}
          >
            <Text
              style={[
                styles.logoutText,
                {
                  color: colors.primary,
                },
              ]}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Portal>
        <Dialog
          visible={logoutVisible}
          onDismiss={() => setLogoutVisible(false)}
        >
          <Dialog.Title>Log out?</Dialog.Title>

          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to log out of your account?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setLogoutVisible(false)}>Cancel</Button>

            <Button onPress={handleLogout}>Log Out</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  logoutText: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 14,
  },
});
