import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfileImagePicker } from "@/components/UserProfileImagePicker";

export function ProfileHeader() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <UserProfileImagePicker />
        <Text style={styles.name}>Nome do Usuário</Text>
        <Text style={styles.email}>email@email.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#387373",
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 1,
    paddingTop: 10,
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
    color: "#ffffffff",
  },
});
