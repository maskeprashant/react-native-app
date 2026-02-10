import { ThemeProvider } from "@/app/context/ThemeContext";
import { Stack } from "expo-router";
import "./global.css";
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
