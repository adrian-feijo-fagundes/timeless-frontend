import { useAppData } from "@/contexts/AppDataContext";
import api from "@/services/api";
import { LoginResponse } from "@/types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AuthTextInput from "@/components/AuthTextInput";
import AuthPasswordInput from "@/components/AuthPasswordInput";
import AuthButton from "@/components/AuthButton";


export default function LoginScreen() {
  const { setLogged } = useAppData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      setLogged(true);
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("Erro", "Credenciais inválidas");
    }

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inner}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          {/* EMAIL */}
          <AuthTextInput
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* SENHA */}
          <AuthPasswordInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
          />

          {/* BOTÃO COM AUTHBUTTON */}
          <AuthButton
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: 12 }}
          />

          {/* LINK PARA CADASTRAR */}
          <View style={styles.rowSignup}>
            <Text style={styles.text}>Não tem conta?</Text>

            <Link href="/register">
              <Text style={styles.signup}> Cadastre-se</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#387373",
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    color: "#d9d9d9",
    marginBottom: 20,
  },
  rowSignup: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  signup: {
    color: "#000",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});