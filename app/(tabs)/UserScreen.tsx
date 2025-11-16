import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppData } from "@/contexts/AppDataContext";
import { UserOptionItem } from "@/components/UserOptionItem";
import { ProfileHeader } from "@/components/ProfileHeader";

export default function UserScreen() {
  const { setLogged } = useAppData();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setLogged(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => {} },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ProfileHeader />

        <UserOptionItem
          title="Informações Pessoais"
          icon="user"
          route="/profile/info"
        />

        <UserOptionItem
          title="Segurança"
          icon="lock"
          route="/profile/security"
        />

        <View style={{ marginTop: 30 }}>
          <UserOptionItem
            title="Sair"
            icon="sign-out"
            onPress={handleLogout}
          />
          <UserOptionItem
            title="Excluir Conta"
            icon="trash"
            onPress={handleDeleteAccount}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
});
