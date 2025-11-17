import { UserProfileImagePicker } from "@/components/UserProfileImagePicker";
import { getUserLocal } from "@/services/user";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ProfileHeader() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

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
      <View style={styles.contentContainer}>
        <UserProfileImagePicker />
        <Text style={styles.name}>{ name }</Text>
        <Text style={styles.email}>{ email }</Text>
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
