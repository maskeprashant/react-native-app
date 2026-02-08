import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between items-center px-6 py-8">
        {/* Image Section - 70% height */}
        <View className="w-full flex-[0.8] justify-center items-center">
          <Image
            source={require("@/assets/images/list.png")} // Replace with your image path
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Text Content Section */}
        <View className="flex-[0.2] justify-center items-center space-y-3">
          <Text className="text-4xl font-bold text-gray-900 text-center">
            AppName
          </Text>
          <Text className="text-base text-gray-600 text-center px-4">
            Your perfect slogan goes here
          </Text>
        </View>

        {/* Button Section */}
        <View className="flex-[0.1] w-full justify-end">
          <Pressable
            onPress={() => router.push("/(tabs)")} // Update with your route
            className="bg-blue-600 py-4 rounded-full active:bg-blue-700"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Get Started
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
