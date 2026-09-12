import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { API_URL } from "../../../constants/API";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

const UsernameScreen = () => {
  const router = useRouter();
  const { phone, fullName } = useLocalSearchParams();
  const { colors } = useTheme();

  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);

  const requestId = useRef(0);

  const normalizedUsername = username.trim().toLowerCase();
  const isValidFormat = USERNAME_REGEX.test(normalizedUsername);

  useEffect(() => {
    setAvailable(null);

    if (!isValidFormat) {
      setChecking(false);
      return;
    }

    const currentRequestId = ++requestId.current;

    const timer = setTimeout(async () => {
      setChecking(true);

      try {
        const response = await fetch(`${API_URL}/api/auth/check-username`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: normalizedUsername,
          }),
        });

        const data = await response.json();

        if (currentRequestId !== requestId.current) {
          return;
        }

        if (!response.ok) {
          setAvailable(null);
          return;
        }

        setAvailable(data.available === true);
      } catch (error) {
        if (currentRequestId === requestId.current) {
          setAvailable(null);
        }
      } finally {
        if (currentRequestId === requestId.current) {
          setChecking(false);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [normalizedUsername, isValidFormat]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!isValidFormat || available !== true || checking) {
      return;
    }

    router.push({
      pathname: "/register/password",
      params: {
        phone,
        fullName,
        username: normalizedUsername,
      },
    });
  };

  const getStatus = () => {
    if (!normalizedUsername) {
      return "";
    }

    if (!isValidFormat) {
      return "Username must be 3-20 characters and can only contain letters, numbers, and underscores.";
    }

    if (checking) {
      return "Checking username...";
    }

    if (available === true) {
      return "Username is available";
    }

    if (available === false) {
      return "Username is already taken";
    }

    return "";
  };

  const status = getStatus();

  return (
    <KeyboardAvoidingView
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={26}
            iconColor={colors.onSurface}
            onPress={handleBack}
          />

          <Text
            variant="titleLarge"
            style={[
              styles.headerTitle,
              {
                color: colors.onSurface,
              },
            ]}
          >
            Choose a username
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text
            variant="headlineSmall"
            style={[
              styles.title,
              {
                color: colors.onSurface,
              },
            ]}
          >
            Pick your username
          </Text>

          <Text
            variant="bodyMedium"
            style={[
              styles.description,
              {
                color: colors.onSurfaceVariant,
              },
            ]}
          >
            Your username helps people find and recognize you.
          </Text>

          <TextInput
            mode="outlined"
            label="Username"
            placeholder="e.g. john_doe"
            value={username}
            onChangeText={setUsername}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            maxLength={20}
            returnKeyType="next"
            left={<TextInput.Affix text="@" />}
            style={styles.input}
            outlineColor={colors.outline}
            activeOutlineColor={colors.primary}
            error={available === false}
            right={
              checking ? (
                <TextInput.Icon icon="loading" />
              ) : available === true ? (
                <TextInput.Icon
                  icon="check-circle"
                  iconColor={colors.primary}
                />
              ) : available === false ? (
                <TextInput.Icon icon="close-circle" iconColor={colors.error} />
              ) : null
            }
          />

          {status ? (
            <HelperText
              type={available === false || !isValidFormat ? "error" : "info"}
              visible
            >
              {status}
            </HelperText>
          ) : (
            <HelperText type="info" visible>
              3-20 characters. Letters, numbers, and underscores only.
            </HelperText>
          )}
        </View>

        <View style={styles.bottom}>
          <Button
            mode="contained"
            onPress={handleNext}
            disabled={!isValidFormat || available !== true || checking}
            contentStyle={styles.buttonContent}
            style={styles.button}
          >
            Next
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 35,
  },

  headerTitle: {
    fontWeight: "600",
  },

  headerSpacer: {
    width: 48,
  },

  content: {
    flex: 1,
  },

  title: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },

  description: {
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 10,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "transparent",
    fontSize: 16,
  },

  bottom: {
    paddingBottom: 5,
  },

  button: {
    borderRadius: 10,
  },

  buttonContent: {
    height: 50,
  },
});

export default UsernameScreen;
