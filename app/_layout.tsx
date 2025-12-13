import { AppDataProvider, useAppData } from "@/contexts/AppDataContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { checkAuth } from "@/services/authService";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
function RootLayoutInner() {
  const colorScheme = useColorScheme();
  const { logged, setLogged } = useAppData();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
      <GamificationProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </GamificationProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider>
      <AppDataProvider>
        <RootLayoutInner />
      </AppDataProvider>
    </PaperProvider>
  );
}
