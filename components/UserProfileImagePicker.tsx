import React, { useState } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

export function UserProfileImagePicker() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão necessária para acessar suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/default-avatar.jpg")
          }
          style={styles.avatar}
        />
      </View>

      <Pressable style={styles.editButton} onPress={pickImage}>
        <FontAwesome name="camera" size={15} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "#fff",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  editButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#387373",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
