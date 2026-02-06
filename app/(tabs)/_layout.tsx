import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="list" options={{ headerShown: false }} />
      <Tabs.Screen name="reports" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default _layout;
