import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Message, isSameDay, isSameUser } from "react-native-gifted-chat";

import Colors from "../constants/Colors";

export default function ChatMessageBox({
  setReplyOnSwipeOpen,
  updateRowRef,
  ...props
}) {
  const isNextMyMessage =
    props.currentMessage &&
    props.nextMessage &&
    isSameUser(props.currentMessage, props.nextMessage) &&
    isSameDay(props.currentMessage, props.nextMessage);

  const renderRightAction = (progressAnimatedValue) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });

    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 12, 20],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: size }, { translateX: trans }],
          },
          isNextMyMessage
            ? styles.defaultBottomOffset
            : styles.bottomOffsetNext,
          props.position === "right" && styles.leftOffsetValue,
        ]}
      >
        <View style={styles.replyImageWrapper}>
          <MaterialCommunityIcons
            name="reply-circle"
            size={26}
            color={Colors.gray}
          />
        </View>
      </Animated.View>
    );
  };

  const onSwipeOpenAction = () => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen({
        ...props.currentMessage,
      });
    }
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={updateRowRef}
        friction={2}
        rightThreshold={40}
        renderLeftActions={renderRightAction}
        onSwipeableWillOpen={onSwipeOpenAction}
      >
        <Message {...props} />
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
  },

  replyImageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  defaultBottomOffset: {
    marginBottom: 2,
  },

  bottomOffsetNext: {
    marginBottom: 10,
  },

  leftOffsetValue: {
    marginLeft: 16,
  },
});
