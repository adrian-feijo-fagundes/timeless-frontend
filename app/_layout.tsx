import { AppDataProvider, useAppData } from "@/contexts/AppDataContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

function RootLayoutInner() {
  const colorScheme = useColorScheme();
  const { logged } = useAppData();
  const router = useRouter()
  
  const [isMounted, setIsMounted] = useState(false);

  // marca quando o layout terminou de montar
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (logged) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [logged, isMounted]);
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
  )
}