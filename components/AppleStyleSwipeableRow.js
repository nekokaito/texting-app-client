import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  Alert,
  Animated,
  I18nManager,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default class AppleStyleSwipeableRow extends Component {
  renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      this.close();
      Alert.alert(text);
    };

    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: trans }],
        }}
      >
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Ionicons
            name={text === "More" ? "ellipsis-horizontal" : "archive"}
            size={24}
            color="#fff"
            style={{ paddingTop: 10 }}
          />

          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = (progress) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {this.renderRightAction("More", "#C8C7CD", 192, progress)}

      {this.renderRightAction("Archive", Colors.muted, 128, progress)}
    </View>
  );

  swipeableRow = null;

  updateRef = (ref) => {
    this.swipeableRow = ref;
  };

  close = () => {
    this.swipeableRow?.close();
  };

  render() {
    const { children } = this.props;

    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable to the ${direction}`);
        }}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },

  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
