// screens/HomeScreen.tsx
import { useTheme } from "@/app/context/ThemeContext";
import { colors } from "@/constants/colors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "./components/Card";

export default function HomeScreen() {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getFormattedDate = (): string => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      year: "numeric",
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between">
          {/* Greeting and Date */}
          <View className="flex-1">
            <Text className="text-3xl font-bold" style={{ color: theme.text }}>
              {getGreeting()} 👋
            </Text>
            <Text
              className="text-base mt-1"
              style={{ color: theme.textSecondary }}
            >
              {getFormattedDate()}
            </Text>
          </View>

          {/* Avatar */}
          <TouchableOpacity className="ml-4">
            <View
              className="w-12 h-12 rounded-full items-center justify-center border-2"
              style={{
                backgroundColor: theme.primary,
                borderColor: theme.primary + "50",
              }}
            >
              <Text className="text-white text-xl font-bold">U</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rest of the content */}
      <View className="flex-1">
        <Card>
          <Text>Content goes here</Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}
