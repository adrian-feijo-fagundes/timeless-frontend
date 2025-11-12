import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import { Link } from "expo-router";
import BasicImage from "@/components/BasicImage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    setError("");

    if (!email) {
      setError("Preencha o e-mail.");
      return false;
    }

    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      setError("E-mail inválido.");
      return false;
    }

    if (!password) {
      setError("Preencha a senha.");
      return false;
    }

    if (password.length < 6) {
      setError("Senha muito curta (mín 6 caracteres).");
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (password === "123456") {
        alert("Login bem-sucedido! (navegação aqui)");
      } else {
        setError("Credenciais incorretas.");
      }
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={require("../../../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

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
              accessibilityLabel={secure ? "Mostrar senha" : "Ocultar senha"}
            >
              <Text style={styles.showBtnText}>
                {secure ? "Mostrar" : "Ocultar"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => alert("Tela de recuperação de senha (implementar)")}
          >
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, loading ? styles.btnDisabled : null]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.btnText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Não tem uma conta?{" "}
              <Link href="/(tabs)/screens/Register" style={styles.registerLink}>
                Faça seu cadastro
              </Link>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    borderRadius: "10%"
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
    color: "#fff",
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
  registerContainer: {
    marginTop: 18,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
  },
  registerLink: {
    color: "#000",
    fontWeight: "700",
  },
  error: {
    color: "#ff3b30",
    marginBottom: 8,
    textAlign: "center",
  },
});
