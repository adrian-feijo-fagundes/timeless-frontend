import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";

export default function PersonalInfo() {
  // estados locais → seu backend vai substituir pelos dados reais depois
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    // aqui seu amigo integra com axios:
    // await api.put("/user/info", { name, email, birthDate })

    setLoading(false);
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: 40 }}
    >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
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
