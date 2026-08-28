import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BoxedIcon from "../../../components/BoxedIcon";
import Colors from "../../../constants/Colors";
import { defaultStyles } from "../../../constants/Styles";

export default function SettingsPage() {
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

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7} style={defaultStyles.item}>
      <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

      <Text
        style={{
          fontSize: 18,
          flex: 1,
        }}
      >
        {item.name}
      </Text>

      <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* =========================
            DEVICES
        ========================= */}

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

        {/* =========================
            SETTINGS
        ========================= */}

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

        {/* =========================
            SUPPORT
        ========================= */}

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

        {/* =========================
            LOG OUT
        ========================= */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log("Logout pressed");
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              textAlign: "center",
              paddingVertical: 14,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
