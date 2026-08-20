import { FlatList, ScrollView, View } from "react-native";

import chats from "../../../assets/data/chats.json";
import ChatRow from "../../../components/ChatRow";
import { defaultStyles } from "../../../constants/Styles";

export default function ChatIndex() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingBottom: 40,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatRow chat={item} />}
        keyExtractor={(item) => item.chat_id.toString()}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
