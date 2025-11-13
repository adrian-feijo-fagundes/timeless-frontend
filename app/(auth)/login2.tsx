import { useAppData } from "@/contexts/AppDataContext";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AuthTextInput from "@/components/AuthTextInput";
import PasswordInput from "@/components/PasswordInput";
import AuthButton from "@/components/AuthButton";

export default function LoginScreen() {
  const { setLogged } = useAppData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLogged(true);
      router.replace("/(tabs)");
    }, 1200);
  };

  return (
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

        <AuthTextInput
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <PasswordInput value={password} onChangeText={setPassword} />

        <AuthButton
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
        />

        <View style={styles.rowSignup}>
          <Text style={styles.text}>Não tem conta?</Text>
          <Link href="/register">
            <Text style={styles.signup}> Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    width: 64,
    height: 64,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#fff",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 18,
    color: "#e0e0e0",
  },
  rowSignup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  text: {
    color: "#fff",
    
  },
  signup: {
    color: "#ffffffff",
    fontWeight: "bold",
  },
});
