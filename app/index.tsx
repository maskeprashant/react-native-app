import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-1 flex-col justify-center items-center bg-white p-8">
        <View className="mb-8 mt-16">
          <Image
            source={require("@/assets/images/list.png")}
            className="w-[100px] h-[100px]"
          />
        </View>
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind!
        </Text>
        <View className="m-10">
          <Link href="/(tabs)" className="bg-blue-500 px-4 py-2 rounded">
            <Text className="text-white text-lg">Go to Tabs</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
