import { Link, useRouter } from "expo-router";

import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const welcomeImage = require("../assets/images/icon.png");

const WelcomeScreen = () => {
  const openPrivacyPolicy = () => {
    Linking.openURL("https://example.com/privacy");
  };

  const openTerms = () => {
    Linking.openURL("https://example.com/terms");
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={welcomeImage} style={styles.welcome} />

      <Text style={styles.headline}>Welcome to Texting App</Text>

      <Text style={styles.description}>
        Read our{" "}
        <Text style={styles.link} onPress={openPrivacyPolicy}>
          Privacy Policy
        </Text>
        . Tap &quot;Agree & Continue&quot; to accept our{" "}
        <Text style={styles.link} onPress={openTerms}>
          Terms of Service
        </Text>
        .
      </Text>

      <Link href="/phone" replace asChild>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/phone")}
        >
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  welcome: {
    width: "80%",
    height: 300,
    borderRadius: 60,
    marginBottom: 80,
    resizeMode: "cover",
  },

  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: "#667781",
    lineHeight: 21,
  },

  link: {
    color: "#e0b94c",
  },

  button: {
    width: "100%",
    color: "#a88f00",
    backgroundColor: "#f9e7a0",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#a88f00",
    fontSize: 22,
    fontWeight: "500",
  },
});

export default WelcomeScreen;
