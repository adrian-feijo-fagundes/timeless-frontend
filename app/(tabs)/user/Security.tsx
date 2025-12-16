  import React, { useState } from "react";
  import {
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    View,
    Platform,
    StatusBar,
  } from "react-native";
  import { router } from "expo-router";
  import AuthPasswordInput from "@/components/AuthPasswordInput";
  import { updatePassword } from "@/services/user";
  import { FontAwesome } from "@expo/vector-icons";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Button, Text } from "react-native-paper";
  import AuthButton from "@/components/AuthButton";

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
        await updatePassword({ oldPassword, newPassword });
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

        {/* HEADER FIXO */}
        <View style={styles.header}>
          <Button
          
            onPress={() => router.back()}
            icon={() => (
              <FontAwesome  name="chevron-left" size={25} color="#387373" />
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

            <Text style={styles.label}>Senha atual</Text>
            <AuthPasswordInput
              placeholder="Digite sua senha atual"
              value={oldPassword}
              onChangeText={setOldPassword}
              activeOutlineColor="#000000ff"
            />

            <Text style={styles.label}>Nova senha</Text>
            <AuthPasswordInput
              placeholder="Digite a nova senha"
              value={newPassword}
              onChangeText={setNewPassword}
              activeOutlineColor="#000000ff"
            />

            <Text style={styles.label}>Confirmar nova senha</Text>
            <AuthPasswordInput
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
