import { AppDataProvider, useAppData } from "@/contexts/AppDataContext";
import { checkAuth } from "@/services/authService";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

function RootLayoutInner() {
  const colorScheme = useColorScheme();
  const { logged, setLogged } = useAppData();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Carrega o estado de autenticação apenas 1 vez
  useEffect(() => {
    async function init() {
      try {
        const result = await checkAuth();
        setLogged(result.logged);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  // Navega sempre que "logged" mudar, após carregamento
  useEffect(() => {
    if (loading) return;

    if (logged) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [loading, logged]);

  if (loading) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppDataProvider>
      <RootLayoutInner />
    </AppDataProvider>
  );
}
