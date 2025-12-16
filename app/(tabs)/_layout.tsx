import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white", // ativo
        tabBarInactiveTintColor: "#888", // inativo
        tabBarStyle: {
          backgroundColor: "#387373",
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="GameficationScreen"
        options={{
          title: "Estátisticas",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tasks" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="GroupScreen"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tasks" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
