import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Login from "./(tabs)/screens/Login";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
