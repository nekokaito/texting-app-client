import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

import Colors from "../constants/Colors";

export default function ReplyMessageBar({ clearReply, message }) {
  if (!message) {
    return null;
  }

  return (
    <Animated.View
      style={{
        height: 50,
        flexDirection: "row",
        backgroundColor: "#E4E9EB",
      }}
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      <View
        style={{
          height: 50,
          width: 6,
          backgroundColor: "#89BC0C",
        }}
      />

      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: "#89BC0C",
            paddingLeft: 10,
            paddingTop: 5,
            fontWeight: "600",
            fontSize: 15,
          }}
        >
          {message.user?.name}
        </Text>

        <Text
          style={{
            color: Colors.gray,
            paddingLeft: 10,
            paddingTop: 5,
          }}
        >
          {message.text?.length > 40
            ? `${message.text.substring(0, 40)}...`
            : message.text}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 10,
        }}
      >
        <TouchableOpacity onPress={clearReply}>
          <Ionicons
            name="close-circle-outline"
            color={Colors.primary}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
