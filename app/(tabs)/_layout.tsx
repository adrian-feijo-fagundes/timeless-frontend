import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white", // ativo
        tabBarInactiveTintColor: "hsla(0, 0%, 100%, 0.65)",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={["#3F8F8F", "#387373"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: styles.label,

        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={35}
              name="house.fill"
              color={color}
              style={{ marginTop: 10 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="GameficationScreen"
        options={{
          title: "Estátisticas",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="tasks"
              size={35}
              color={color}
              style={{ marginTop: 10 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="GroupScreen"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="tasks"
              size={35}
              color={color}
              style={{ marginTop: 10 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="user"
              size={35}
              color={color}
              style={{ marginTop: 10 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,

    height: 50,
    borderRadius: 33,

    borderColor: "#c5c5c5ff",
    borderWidth: 1,

    backgroundColor: "transparent", // IMPORTANTE para o gradiente

    // Paper-like shadow
    elevation: 14, // Android

    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 10,

    borderTopWidth: 0,
    overflow: "hidden", // necessário p/ gradiente respeitar o radius
  },

  label: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: "500",
  },
});
