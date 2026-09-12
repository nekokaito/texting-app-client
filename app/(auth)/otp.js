import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { useTheme } from "react-native-paper";

import { API_URL } from "../../constants/API";

const CELL_COUNT = 6;

console.log("API_URL:", API_URL);

export default function OTP() {
  const { phone } = useLocalSearchParams();

  const router = useRouter();

  const { colors } = useTheme();

  const cleanPhoneNumber = phone ? phone.replace(/\s/g, "") : "";

  console.log("Phone number from params:", cleanPhoneNumber);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({
    value: code,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  // Verify OTP when 6 digits are entered
  useEffect(() => {
    if (code.length === CELL_COUNT) {
      verifyCode();
    }
  }, [code]);

  // Verify OTP
  const verifyCode = async () => {
    if (loading || !cleanPhoneNumber || code.length !== CELL_COUNT) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: cleanPhoneNumber,
          otp: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid or expired OTP");
      }

      console.log("OTP verified successfully");

      router.replace("/chats");
    } catch (error) {
      console.log("Verification error:", error);

      setCode("");

      Alert.alert(
        "Verification Failed",
        error.message || "The verification code is incorrect or expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendCode = async () => {
    if (loading || !cleanPhoneNumber) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: cleanPhoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to resend OTP");
      }

      setCode("");

      Alert.alert("Code Sent", "A new verification code has been generated.");
    } catch (error) {
      console.log("Resend OTP error:", error);

      Alert.alert(
        "Error",
        error.message || "Unable to resend the verification code.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Stack.Screen
        options={{
          title: phone || "Verify Phone",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onSurface,
        }}
      />

      <Text
        style={[
          styles.title,
          {
            color: colors.onSurface,
          },
        ]}
      >
        Verify your phone number
      </Text>

      <Text
        style={[
          styles.legal,
          {
            color: colors.onSurfaceVariant,
          },
        ]}
      >
        We have sent you an SMS with a code to the number above.
      </Text>

      <Text
        style={[
          styles.legal,
          {
            color: colors.onSurfaceVariant,
          },
        ]}
      >
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
        editable={!loading}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            style={[
              styles.cellRoot,
              {
                borderBottomColor: colors.outlineVariant,
              },
              isFocused && {
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.cellText,
                {
                  color: colors.onSurface,
                },
              ]}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.resendButton}
        onPress={resendCode}
        disabled={loading}
      >
        <Text
          style={[
            styles.resendText,
            {
              color: colors.primary,
            },
            loading && styles.disabledText,
          ]}
        >
          {loading
            ? "Please wait..."
            : "Didn't receive a verification code? Resend"}
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
    gap: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 50,
  },

  legal: {
    fontSize: 14,
    textAlign: "center",
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
    borderBottomWidth: 1,
  },

  cellText: {
    fontSize: 32,
    textAlign: "center",
  },

  resendButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  resendText: {
    fontSize: 17,
    textAlign: "center",
  },

  disabledText: {
    opacity: 0.5,
  },
});
