import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AnswerLink from "@/components/Answerlink";
import AuthButton from "@/components/AuthButton";
import AuthDateInput from "@/components/AuthDateInput";
import AuthPasswordInput from "@/components/AuthPasswordInput";
import AuthEmailInput from "@/components/AuthEmailInput";
import AuthTextInput from "@/components/AuthTextInput";
import { loginUser, registerUser } from "@/services/authService";
import { HelperText } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !birthday || !password || !confirmPassword) {
      setError("Preencha todos os campos!");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email inválido");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setError("");

    try {
      await registerUser({
        name,
        email,
        password,
        birthday: birthday.toISOString().split("T")[0],
      });

      await loginUser(email, password);

      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Erro", err.message);
      setError(err.message);
    }
  };

  return (
      <LinearGradient
        colors={["#3F8F8F", "#387373", "#023030ff", "#012020ff",]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        disabled={Platform.OS === "web"}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.centerContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Crie sua conta</Text>

            <AuthTextInput value={name} onChangeText={setName} label="Nome" />

            <AuthEmailInput
              label="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <AuthDateInput value={birthday} onChange={setBirthday} />

            <AuthPasswordInput value={password} onChangeText={setPassword} />

            <AuthPasswordInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <HelperText
              type="error"
              visible={!!error}
              style={{ color: "#000000ff", fontWeight: "bold" }}
            >
              {error}
            </HelperText>
            <AuthButton title="Registrar" onPress={handleRegister} />

            <AnswerLink href="/login" linkText="Entrar" answer="Tem conta?" />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
});
