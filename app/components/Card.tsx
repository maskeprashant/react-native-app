import React from "react";
import { View } from "react-native";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="bg-white my-4 p-4 rounded-2xl space-y-3">{children}</View>
  );
};

export default Card;
