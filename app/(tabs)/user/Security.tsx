import React, { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import AuthPasswordInput from "@/components/AuthPasswordInput";
import { updatePassword } from "@/services/user";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await updatePassword({
        oldPassword,
        newPassword,
      });

      alert("Senha atualizada com sucesso!");
      router.back();
    } catch (error: any) {
      alert(error.message || "Erro ao atualizar senha.");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* VOLTAR */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <FontAwesome name="chevron-left" size={20} color="#387373" />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Alterar Senha</Text>

              {/* SENHA ATUAL */}
              <Text style={styles.label}>Senha atual</Text>
              <AuthPasswordInput
                placeholder="Digite sua senha atual"
                value={oldPassword}
                onChangeText={setOldPassword}
              />

              {/* NOVA SENHA */}
              <Text style={styles.label}>Nova senha</Text>
              <AuthPasswordInput
                placeholder="Digite a nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
              />

              {/* CONFIRMAR NOVA SENHA */}
              <Text style={styles.label}>Confirmar nova senha</Text>
              <AuthPasswordInput
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              {/* BOTÃO */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Salvando..." : "Atualizar Senha"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
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
    paddingTop: 20,
    paddingBottom: 40,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 80,
  },

  backText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#387373",
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
    color: "#444",
    marginBottom: 6,
  },

  button: {
    backgroundColor: "#387373",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 28,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
