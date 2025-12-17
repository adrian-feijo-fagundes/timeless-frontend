import AuthButton from "@/components/AuthButton";
import AuthPasswordInput from "@/components/AuthPasswordInput";
import { updatePassword } from "@/services/user";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleSave = async () => {
  if (!newPassword || !confirmPassword) {
    alert("Preencha todos os campos.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  setLoading(true);

  try {
    await updatePassword({ newPassword });
    alert("Senha atualizada com sucesso!");
    router.replace("/login");
  } catch (error: any) {
    alert(error.message || "Erro ao atualizar senha.");
  }

  setLoading(false);
};


  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      {/* HEADER FIXO */}
      <View style={styles.header}>
        <Button
          onPress={() => router.back()}
          icon={() => (
            <FontAwesome name="chevron-left" size={25} color="#387373" />
          )}
          textColor="#387373"
          compact
        >
          Voltar
        </Button>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Alterar Senha</Text>

          <Text style={styles.label}>Nova senha</Text>
          <AuthPasswordInput
            variant="light"

            placeholder="Digite a nova senha"
            value={newPassword}
            onChangeText={setNewPassword}
            activeOutlineColor="#000000ff"
          />

          <Text style={styles.label}>Confirmar nova senha</Text>
          <AuthPasswordInput
            variant="light"

            placeholder="Confirme a nova senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            activeOutlineColor="#000000ff"
          />

          <AuthButton
            title="Atualizar Senha"
            onPress={handleSave}
            loading={loading}
            style={{ marginTop: 12, backgroundColor: "#387373" }}
            labelStyle={{ color: "#ffffffff" }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#387373",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#000000ff",
    marginBottom: 6,
  },

  header: {
    paddingHorizontal: 10,
    paddingTop: 6,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
