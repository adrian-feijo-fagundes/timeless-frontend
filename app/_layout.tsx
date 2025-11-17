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
  const [hasNavigated, setHasNavigated] = useState(false);

  // Carrega o estado de autenticação apenas UMA VEZ
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
  
    // Navegação inicial
    if (!hasNavigated) {
      if (logged) router.replace("/(tabs)");
      else router.replace("/(auth)/login");
  
      setHasNavigated(true);
      return;
    }
  
    // Logout ou mudança de login depois da inicialização
    if (!logged) {
      router.replace("/(auth)/login");
    }
  }, [loading, logged]);

  if (loading) return null; // tela inicial silenciosa

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
