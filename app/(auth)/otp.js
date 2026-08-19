import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

export default function OTP() {
  const { phone } = useLocalSearchParams();

  const [code, setCode] = useState("");

  const ref = useBlurOnFulfill({
    value: code,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === CELL_COUNT) {
      verifyCode();
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      console.log("Phone:", phone);
      console.log("OTP:", code);

      // TODO:
      // Connect this to your Node.js backend later.
      //
      // Example:
      // await verifyOTP(phone, code);

      Alert.alert("Success", "OTP verified successfully!");
    } catch (error) {
      console.log("Verification error:", error);

      Alert.alert(
        "Verification Failed",
        "The verification code is incorrect or expired.",
      );
    }
  };

  const resendCode = async () => {
    try {
      console.log("Resending OTP to:", phone);

      // TODO:
      // Connect to your Node.js backend.
      // await resendOTP(phone);

      Alert.alert("Code Sent", "A new verification code has been sent.");
    } catch (error) {
      console.log("Resend error:", error);

      Alert.alert("Error", "Unable to resend the verification code.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: phone || "Verify Phone",
        }}
      />

      <Text style={styles.title}>Verify your phone number </Text>

      <Text style={styles.legal}>
        We have sent you an SMS with a code to the number above.
      </Text>

      <Text style={styles.legal}>
        To complete your phone number verification, please enter the 6-digit
        activation code.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.resendButton} onPress={resendCode}>
        <Text style={styles.resendText}>
          Didn&apos;t receive a verification code? Resend
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    gap: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 50,
    color: "#000000",
  },

  legal: {
    fontSize: 14,
    textAlign: "center",
    color: "#000000",
    lineHeight: 21,
  },

  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 4,
  },

  cellRoot: {
    width: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
  },

  cellText: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
  },

  focusCell: {
    paddingBottom: 4,
    borderBottomColor: "#ca982d",
    borderBottomWidth: 2,
  },

  resendButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  resendText: {
    color: "#dfbf30",
    fontSize: 17,
    textAlign: "center",
  },
});
