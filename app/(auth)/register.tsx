import api from "@/services/api";
import { LoginResponse, RegisterResponse } from "@/types/Auth";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

// COMPONENTES PADRONIZADOS
import AuthTextInput from "@/components/AuthTextInput";
import AuthPasswordInput from "@/components/AuthPasswordInput";
import AuthButton from "@/components/AuthButton";
import AuthDateInput from "@/components/AuthDateInput";

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

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
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
      const response = await api.post<RegisterResponse>("/users", {
        name,
        email,
        password,
        birthday: birthday.toISOString().split("T")[0],
      });

      if (response.status !== 201) {
        setError("Email já está em uso");
        return;
      }

      const loginResponse = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      const { token, user } = loginResponse.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Falha ao registrar"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.centerContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Crie sua conta</Text>

            <AuthTextInput
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
            />

            <AuthTextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AuthDateInput
              value={birthday}
              onChange={setBirthday}
            />

            <AuthPasswordInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <AuthPasswordInput
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <AuthButton title="Registrar" onPress={handleRegister} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#387373",
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
  error: {
    color: "#FFD1D1",
    marginVertical: 10,
    textAlign: "center",
  },
  centerContent: {
  flexGrow: 1,
  justifyContent: "center", 
  padding: 20,
},
});
