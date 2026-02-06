import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-1 flex-col justify-center items-center bg-white p-2">
        <View className="mb-16 h-[500px] mt-1 flex justify-center items-center">
          <Image
            source={require("@/assets/images/list.png")}
            className="w-[300px] h-[300px]"
          />
        </View>

        <Text className=" font-bold text-blue-500 uppercase text-4xl">
          Study tracker
        </Text>
        <Text className="text-l text-blue-300 my-5 text-center">
          A study tracker app tracks your study time and provides reports
        </Text>
        <View className="m-10  w-full text-center flex justify-center">
          <Link href="/(tabs)" className="bg-yellow-500 p-4 rounded-lg">
            <Text className="text-white text-xl text-center">Go start</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
