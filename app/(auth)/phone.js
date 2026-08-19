import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaskInput from "react-native-mask-input";
import Colors from "../../constants/Colors";

const BD_PHONE = [
  "+",
  "8",
  "8",
  "0",
  " ",
  "1",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const isValid = phoneNumber.length >= 15;

  const handleNext = () => {
    if (!isValid) return;

    // Design only for now.
    // Later we will connect OTP/API here.
    router.push("/otp");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={Colors.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Enter phone number</Text>

          <View style={{ width: 26 }} />
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Please enter your phone number. We will use it to verify your account.
        </Text>

        {/* Phone Input */}
        <View style={styles.phoneBox}>
          <TouchableOpacity style={styles.countryRow}>
            <Text style={styles.countryName}>Bangladesh.</Text>

            <View style={styles.countryRight}>
              <Text style={styles.countryCode}>+880.</Text>

              <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <MaskInput
            value={phoneNumber}
            keyboardType="phone-pad"
            autoFocus
            placeholder="+880 1XXXXXXXXX"
            placeholderTextColor="#999"
            onChangeText={(masked) => {
              setPhoneNumber(masked);
            }}
            mask={BD_PHONE}
            style={styles.input}
          />
        </View>

        {/* Information */}
        <Text style={styles.info}>
          Make sure you enter a phone number that you can receive SMS messages
          on.
        </Text>

        {/* Bottom Section */}
        <View style={styles.bottom}>
          <Text style={styles.legal}>
            By continuing, you agree to our{" "}
            <Text style={styles.link}>Terms of Service</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!isValid}
            onPress={handleNext}
            style={[styles.button, isValid && styles.buttonEnabled]}
          >
            <Text
              style={[styles.buttonText, isValid && styles.buttonTextEnabled]}
            >
              Next.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
    marginTop: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginTop: 20,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 10,
  },

  phoneBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
  },

  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  countryName: {
    fontSize: 17,
    color: Colors.primary,
    fontWeight: "500",
  },

  countryRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  countryCode: {
    fontSize: 15,
    color: Colors.gray,
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.gray,
    opacity: 0.2,
    marginTop: 8,
  },

  input: {
    width: "100%",
    fontSize: 17,
    color: "#000",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },

  info: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 15,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },

  legal: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  link: {
    color: Colors.primary,
    fontWeight: "500",
  },

  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonEnabled: {
    backgroundColor: Colors.primary,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.gray,
  },

  buttonTextEnabled: {
    color: "#fff",
  },
});

export default PhoneNumberScreen;
