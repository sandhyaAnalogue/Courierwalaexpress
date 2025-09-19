import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "../utils/AuthProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Slot />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
