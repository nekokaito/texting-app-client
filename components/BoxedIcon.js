import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function BoxedIcon({ name, backgroundColor }) {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        padding: 4,
        borderRadius: 6,
      }}
    >
      <Ionicons name={name} size={22} color="#fff" />
    </View>
  );
}
