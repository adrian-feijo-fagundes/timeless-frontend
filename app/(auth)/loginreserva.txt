import { useAppData } from "@/contexts/AppDataContext";
import { router } from "expo-router";
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

import AnswerLink from "@/components/Answerlink";
import AuthButton from "@/components/AuthButton";
import AuthPasswordInput from "@/components/AuthPasswordInput";
import AuthTextInput from "@/components/AuthTextInput";
import { loginUser } from "@/services/authService";


export default function LoginScreen() {
  const { setLogged } = useAppData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }
  
    setLoading(true);
  
    try {
      await loginUser(email, password);
      setLogged(true);
      router.replace("/(tabs)");
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Erro", err.message);
    }
  
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} disabled={Platform.OS === "web"}>
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

          
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {/* BOTÃO COM AUTHBUTTON */}
          <AuthButton
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: 12 }}
          />

          {/* LINK PARA CADASTRAR */}
          <AnswerLink href="/register" linkText="Cadastre-se" answer="Não tem conta?"/>
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
  error: {
    color: "#FFD1D1",
    marginVertical: 10,
    textAlign: "center",
  },
});