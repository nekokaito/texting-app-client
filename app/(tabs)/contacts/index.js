import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Colors from "../../../constants/Colors";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  /*
   * Get phone contacts
   */
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== "granted") {
        setPermissionDenied(true);
        setLoading(false);
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        sort: Contacts.SortTypes.FirstName,
      });

      /*
       * Only keep contacts that have
       * at least one phone number.
       */
      const phoneContacts = data.filter(
        (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0,
      );

      setContacts(phoneContacts);
    } catch (error) {
      console.log("Contact loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Search contacts
   */
  const filteredContacts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return contacts;
    }

    return contacts.filter((contact) => {
      const name = contact.name?.toLowerCase() || "";

      const phone = contact.phoneNumbers?.[0]?.number?.toLowerCase() || "";

      return name.includes(searchText) || phone.includes(searchText);
    });
  }, [contacts, search]);

  /*
   * Contact row
   */
  const renderContact = ({ item }) => {
    const phone = item.phoneNumbers?.[0]?.number || "";

    const imageUri = item.image?.uri || null;

    return (
      <Pressable
        style={styles.contactRow}
        onPress={() => {
          console.log("Selected contact:", item.name, phone);
        }}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
          </View>
        )}

        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name || "Unknown"}</Text>

          <Text style={styles.phoneNumber}>{phone}</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
      </Pressable>
    );
  };

  /*
   * Permission denied
   */
  if (permissionDenied) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="people-outline" size={60} color={Colors.gray} />

        <Text style={styles.permissionTitle}>Contacts Permission Required</Text>

        <Text style={styles.permissionText}>
          Allow the app to access your phone contacts to see people you can
          message.
        </Text>

        <Pressable style={styles.permissionButton} onPress={loadContacts}>
          <Text style={styles.permissionButtonText}>Allow Contacts</Text>
        </Pressable>
      </View>
    );
  }

  /*
   * Loading
   */
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />

        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Contacts",
          headerBackTitle: "Chats",
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />

      {/* Search */}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray} />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          placeholderTextColor={Colors.gray}
          style={styles.searchInput}
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={20} color={Colors.gray} />
          </Pressable>
        )}
      </View>

      {/* Contact count */}

      <Text style={styles.contactCount}>
        {filteredContacts.length} Contacts
      </Text>

      {/* Contacts */}

      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => item.id || String(index)}
        renderItem={renderContact}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="person-outline" size={50} color={Colors.gray} />

            <Text style={styles.emptyText}>No contacts found</Text>
          </View>
        }
      />
    </View>
  );
}

/*
 * Get initials for avatar
 */
function getInitials(name) {
  if (!name) {
    return "?";
  }

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: "#E9E9EC",
    borderRadius: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#000",
  },

  contactCount: {
    fontSize: 14,
    color: Colors.gray,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 6,
  },

  listContainer: {
    paddingBottom: 30,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 72,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.gray,
  },

  contactInfo: {
    flex: 1,
    marginLeft: 14,
  },

  contactName: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },

  phoneNumber: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 3,
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginLeft: 84,
  },

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: Colors.background,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.gray,
  },

  permissionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
    textAlign: "center",
  },

  permissionText: {
    fontSize: 15,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
  },

  permissionButton: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },

  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.gray,
  },
});
