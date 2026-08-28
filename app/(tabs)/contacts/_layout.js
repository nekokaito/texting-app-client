import { Stack } from "expo-router";

import Colors from "../../../constants/Colors";

export default function ContactsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Contacts",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
