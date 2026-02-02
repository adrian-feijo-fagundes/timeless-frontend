import { UserProfileImagePicker } from "@/components/UserProfileImagePicker";
import { getUserLocal } from "@/services/user";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export function ProfileHeader() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getUserLocal();
        setName(user.name);
        setEmail(user.email);
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#3F8F8F", "#387373", "#023030ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <UserProfileImagePicker />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
  },

  gradient: {
    width: "100%",
  },

  contentContainer: {
    alignItems: "center",
    marginBottom: 1,
    paddingTop: 10,
    paddingBottom: 16,
  },

  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },

  email: {
    marginTop: 2,
    fontSize: 14,
    color: "#ffffff",
  },
});
