import { Stack } from "expo-router";
import { theme } from "./styles/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="screens/HomeScreen"
        options={{
          title: 'My Todo App',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="screens/TodoScreen"
        options={{
          title: 'My Todos',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="screens/TodoDetailsScreen"
        options={{
          title: 'Todo Details',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
