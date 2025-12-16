import { getUserLocal, updateUser } from "@/services/user";
import { parseBirthDate } from "@/utils/parseBirthDate";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PersonalInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getUserLocal();
        setName(user.name);
        setEmail(user.email);
        setBirthDate(
          new Date(user.birthday).toLocaleDateString("pt-BR")
        );
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    const parsedDate = parseBirthDate(birthDate);

    if (!parsedDate) {
      setLoading(false);
      alert("Data inválida. Use o formato DD/MM/AAAA.");
      return;
    }

    try {
      await updateUser({
        name,
        email,
        birthday: parsedDate.toISOString(),
      });

      alert("Informações atualizadas com sucesso!");
      router.replace("/(tabs)/user/UserScreen");
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar.");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* VOLTAR */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <FontAwesome name="chevron-left" size={20} color="#387373" />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Informações Pessoais</Text>

              {/* NOME */}
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />

              {/* EMAIL */}
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              {/* DATA DE NASCIMENTO */}
              <Text style={styles.label}>Data de nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={birthDate}
                onChangeText={setBirthDate}
              />

              {/* BOTÃO */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
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
    paddingTop: 20,
    paddingBottom: 40,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 80,
  },

  backText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#387373",
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
    color: "#444",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F4F4F4",
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  button: {
    backgroundColor: "#387373",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 28,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
