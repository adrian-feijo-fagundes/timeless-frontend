import { getUserLocal, updateUser } from "@/services/user";
import { parseBirthDate } from "@/utils/parseBirthDate";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import AuthTextInput from "@/components/AuthTextInput";
import { FontAwesome } from "@expo/vector-icons";
import AuthButton from "@/components/AuthButton";

export default function PersonalInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const user = await getUserLocal();
      setName(user.name);
      setEmail(user.email);
      setBirthDate(new Date(user.birthday).toLocaleDateString("pt-BR"));
    };
    load();
  }, []);

  const handleSave = async () => {
    const parsedDate = parseBirthDate(birthDate);
    if (!parsedDate) {
      alert("Data inválida. Use DD/MM/AAAA.");
      return;
    }

    setLoading(true);
    await updateUser({
      name,
      email,
      birthday: parsedDate.toISOString(),
    });
    setLoading(false);

    alert("Informações atualizadas com sucesso!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Button
          onPress={() => router.back()}
          icon={() => (
            <FontAwesome name="chevron-left" size={25} color="#387373" />
          )}
          textColor="#387373"
          compact
        >
          Voltar
        </Button>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Informações Pessoais</Text>

          <Text style={styles.label}>Nome</Text>
          <AuthTextInput

            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>E-mail</Text>
          <AuthTextInput
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Data de nascimento</Text>
          <AuthTextInput
            placeholder="DD/MM/AAAA"
            value={birthDate}
            onChangeText={setBirthDate}
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
  button: {
    marginTop: 12,
    borderRadius: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingTop: 6,
    backgroundColor: "#FFF",
    flexDirection: "row",
  },
});
