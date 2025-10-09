import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Slot } from "expo-router";
import AuthProvider from "../utils/AuthProvider";
import {QueryClientProvider,QueryClient,} from '@tanstack/react-query'

const queryClient = new QueryClient()
 
export default function RootLayout() {
  
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />
        <Slot />
      </GestureHandlerRootView>
    </AuthProvider>
    </QueryClientProvider>
  );
}
