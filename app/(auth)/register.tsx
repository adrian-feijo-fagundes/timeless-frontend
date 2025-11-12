import api from "@/services/api";
import { LoginResponse, RegisterResponse } from "@/types/Auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  // Estados locais para armazenar os dados do usuário
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [showPicker, setShowPicker] = useState(false);

  // Mensagem de erro
  const [error, setError] = useState<string>("");

  // Função chamada ao clicar em "Registrar"
  const handleRegister = async () => {
    // Validação básica dos campos
    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos!");
      return;
    }
    
    if (!birthday) {
      setError("Selecione sua data de nascimento!");
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

    try {
      const response = await api.post<RegisterResponse>("/users",{
          email,
          name,
          password,
          birthday: birthday.toISOString().split("T")[0],
      })
      if (response.status !== 201) {
        setError("Email já está em uso")
        return
      }
      const loginResponse = await api.post<LoginResponse>('/login', { email, password });
      const { token, user } = loginResponse.data;
  
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user))
      console.log(JSON.stringify(user))
      router.replace("/(tabs)")

    } catch (error: any) {
      console.log(error)
      Alert.alert('Erro', error.response?.data?.message || 'Falha ao registrar');

    }

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

<TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ color: birthday ? "#fff" : "#E0E0E0" }}>
          {birthday
            ? birthday.toLocaleDateString("pt-BR")
            : "Selecionar data de nascimento"}
        </Text>
      </TouchableOpacity>

      {Platform.OS === "web" ? (
        // 💻 navegador / PC
        <input
          type="date"

          value={birthday ? birthday.toISOString().substring(0, 10) : ""}
          onChange={(e) => {
            const selected = new Date(e.target.value);
            setBirthday(selected);
          }}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
            width: "100%",
          }}
        />
      ) : (
        // 📱 Android / iOS
        showPicker && (
          <DateTimePicker
            value={birthday || new Date(2000, 0, 1)}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowPicker(false);
              if (date) setBirthday(date);
            }}
          />
        )
      )}
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

      <Pressable style={styles.button} onPress={async () => {
        console.log('click')
        await handleRegister()
        }
      }>
        <Text style={styles.buttonText}>Registrar</Text>
      </Pressable>

      <Link href={"/login"}>
          <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
      </Link>
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
