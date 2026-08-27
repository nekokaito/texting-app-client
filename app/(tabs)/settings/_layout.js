import { Stack } from "expo-router";

import Colors from "../../../constants/Colors";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: Colors.background,
          },

          headerSearchBarOptions: {
            placeholder: "Search",
          },
        }}
      />
    </Stack>
  );
}
