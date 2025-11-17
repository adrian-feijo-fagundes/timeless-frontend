import { Stack } from "expo-router";

export default function UserLayout() {
    return (
        <Stack
        screenOptions={{
            headerShown: false,
        }}
        >
        <Stack.Screen
            name="UserScreen"
            options={{
            title: "Perfil",
            }}
        />

        <Stack.Screen
            name="PersonalInfo"
            options={{
            title: "Informações Pessoais",
            presentation: "card",
            headerShown: true    
            }}
        />
        </Stack>
    );
    }
