import { useAppData } from "@/contexts/AppDataContext";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";



export default function LoginScreen() {
  // Estados que armazenam dados e controle da interface
  const {setLogged} = useAppData()
  const [email, setEmail] = useState(""); // guarda o e-mail digitado
  const [password, setPassword] = useState(""); // guarda a senha digitada
  const [secure, setSecure] = useState(true); // controla se a senha está visível
  const [loading, setLoading] = useState(false); // indica se o botão está carregando

  // Função para validar o e-mail e senha
  const validate = () => {

    return true; // retorna true se tudo estiver válido
  };

  // Função chamada ao clicar em "Entrar"
  const handleLogin = () => {
    if (!validate()) return; // se for inválido, para aqui
    setLoading(true); // ativa o carregamento

    // Simula um login assíncrono (aqui entraria sua API de autenticação)
    setTimeout(() => {
      setLoading(false); // desativa o carregamento
    }, 1200);
    setLogged(true)
    router.replace("/(tabs)"); // navega pro app principal
  };


  return (
    // KeyboardAvoidingView evita que o teclado cubra os inputs
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Fecha o teclado ao tocar fora */}
        <View style={styles.inner}>
          {/* Logo da aplicação */}
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>


          {/* Campo de e-mail */}
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#ffffffff"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
          />

          {/* Campo de senha + botão de mostrar/ocultar */}
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Senha"
              placeholderTextColor="#ffffffff"
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
              textContentType="password"
            />
            <TouchableOpacity
              onPress={() => setSecure((s) => !s)}
              style={styles.showBtn}
              accessible
              accessibilityLabel={secure ? "Mostrar senha" : "Ocultar senha"}
            >
              <Text style={styles.showBtnText}>
                {secure ? "Mostrar" : "Ocultar"}
              </Text>
            </TouchableOpacity>
          </View>


          {/* Botão principal de login */}
          <TouchableOpacity
            style={[styles.btn, loading ? styles.btnDisabled : null]}
            onPress={handleLogin}
            disabled={loading}
            accessibilityRole="button"
            accessibilityState={{ disabled: loading }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.btnText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Link para registro */}
          <View style={styles.rowSignup}>
            <Text style={styles.text}>Não tem conta?</Text>
              
            <Link href="/register">
              <Text style={styles.signup}> Cadastre-se</Text>
            </Link>
          </View>

          <View style={{ height: 40 }} />
        </View>
    </KeyboardAvoidingView>
  );
}

// Estilos visuais da tela
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
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ffffffff",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#4B9F9F",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  showBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  showBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#000000ff",
    marginTop: 6,
    marginBottom: 12,
  },
  btn: {
    height: 48,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#387373",
    fontWeight: "700",
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
    color: "#000000ff",
    fontWeight: "600",
  },
  error: {
    color: "#ff3b30",
    marginBottom: 8,
    textAlign: "center",
  },
});
