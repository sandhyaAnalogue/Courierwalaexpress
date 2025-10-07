import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native"
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
        <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content"/>
        <Slot />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
