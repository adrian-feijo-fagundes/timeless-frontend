import { ProfileHeader } from "@/components/ProfileHeader";
import { UserOptionItem } from "@/components/UserOptionItem";
import { useAppData } from "@/contexts/AppDataContext";
import { deleteAccount } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Surface } from "react-native-paper";

export default function UserScreen() {
  const { setLogged } = useAppData();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setLogged(false);
    router.replace("/(auth)/login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = async () => {
      await deleteAccount();
      await handleLogout();
    };

    if (Platform.OS === "web") {
      if (
        window.confirm(
          "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
        )
      ) {
        await confirmDelete();
      }
      return;
    }

    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: confirmDelete },
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Surface style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <ProfileHeader />

          <UserOptionItem
            title="Informações Pessoais"
            icon="user"
            route="user/PersonalInfo"
          />

          <UserOptionItem
            title="Segurança"
            icon="lock"
            route="user/Security"
          />

          <View style={{ marginTop: 30 }}>
            <UserOptionItem title="Sair" icon="sign-out" onPress={handleLogout} />
            <UserOptionItem
              title="Excluir Conta"
              icon="trash"
              onPress={handleDeleteAccount}
            />
          </View>
        </ScrollView>
      </Surface>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
