import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Tipagem das rotas da navegação
type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Dashboard: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  // Estados locais para armazenar os dados do usuário
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Mensagem de erro 
  const [error, setError] = useState<string>("");

  // Função chamada ao clicar em "Registrar"
  const handleRegister = () => {
    // Validação básica dos campos
    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos!");
      return;
    }

    // Regex simples para validar formato de e-mail
    const re = /^\S+@\S+\.\S+$/; // expressão regular básica
    if (!re.test(email)) {
      setError("E-mail inválido.");
      return;
    }

    // Senhas diferentes
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // Senha muito curta
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Se tudo estiver certo, limpa os erros e prossegue
    setError("");
    Alert.alert("Sucesso 🎉", "Conta criada com sucesso!");

    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#E0E0E0"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#E0E0E0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#E0E0E0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#E0E0E0"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#387373", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: "#4B9F9F",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#2E5E5E",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#FFD1D1",
    marginBottom: 10,
  },
  linkText: {
    color: "#fff",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
