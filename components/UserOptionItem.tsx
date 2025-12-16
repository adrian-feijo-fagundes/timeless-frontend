import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

interface Props {
  title: string;
  icon: keyof typeof FontAwesome.glyphMap;
  route?: string;
  onPress?: () => void;
}

export const handleLogout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
  router.replace("/login");
};

export function UserOptionItem({ title, icon, route, onPress }: Props) {
  const handlePress = () => {
    if (onPress) return onPress();
    if (route) {
      const normalized = route.startsWith("/") ? route : `/${route}`;
      router.push(normalized as RelativePathString);
    }
  };

  return (
    <TouchableRipple
      onPress={handlePress}
      rippleColor="#38737320"
    >
      <View style={styles.container}>
        <View style={styles.left}>
          <FontAwesome
            name={icon}
            size={20}
            color="#387373"
            style={styles.icon}
          />
          <Text style={styles.title}>{title}</Text>
        </View>

        <FontAwesome name="chevron-right" size={18} color="#B0B0B0" />
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#d8d8d8ff",
    minHeight: 90,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 13,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2F2F2F",
  },
});
