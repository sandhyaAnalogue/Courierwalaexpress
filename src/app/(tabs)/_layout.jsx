import { Tabs, useNavigation } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import Home from "../../assets/svgIcons/Home";
import Order from "../../assets/svgIcons/Order";
import Track from "../../assets/svgIcons/Track";
import Profile from "../../assets/svgIcons/Profile";

const _layout = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // ✅ Now insets is defined

  const tabBarStyle = Platform.select({
    ios: {
      height: insets.bottom + 60,
      paddingBottom: insets.bottom + 20,
    },
    android: {
      height: 60,
      paddingBottom: 30,
    },
    web: {
      height: 50,
      paddingBottom: 10,
    },
    default: {
      height: 60,
      paddingBottom: 10,
    },
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="(homeScreen)"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Home width={24} height={24} fill={focused ? "#007AFF" : "#8e8e93"} />
          ),
        }}
      />
      <Tabs.Screen
        name="(myOrders)"
        options={{
          tabBarLabel: "My orders",
          tabBarIcon: ({ focused }) => (
            <Order width={24} height={24} fill={focused ? "#007AFF" : "#8e8e93"} />
          ),
        }}
      />
      <Tabs.Screen
        name="(track)"
        options={{
          tabBarLabel: "Track",
          tabBarIcon: ({ focused }) => (
            <Track width={24} height={24} fill={focused ? "#007AFF" : "#8e8e93"} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Profile width={24} height={24} fill={focused ? "#007AFF" : "#8e8e93"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
