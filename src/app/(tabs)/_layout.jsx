import { Tabs, useNavigation } from "expo-router";
// import Home from "../../../assets/tabIcons/Home";
import Home from "../../assets/svgIcons/Home";

// import Order from "../../../assets/tabIcons/Order";
import Order from "../../assets/svgIcons/Order";
import Track from "../../assets/svgIcons/Track";
import Profile from "../../assets/svgIcons/Profile";
import { Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const _layout = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height:insets.bottom+50, paddingBottom: insets.bottom+20,},
      }}
    >
      <Tabs.Screen
        name="(homeScreen)"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              width={24}
              height={24}
              fill={focused ? "#007AFF" : "#8e8e93"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(myOrders)"
        options={{
          tabBarLabel: "My orders",
          tabBarIcon: ({ focused }) => (
            <Order
              width={24}
              height={24}
              fill={focused ? "#007AFF" : "#8e8e93"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(track)"
        options={{
          tabBarLabel: "Track",
          tabBarIcon: ({ focused }) => (
            <Track
              width={24}
              height={24}
              fill={focused ? "#007AFF" : "#8e8e93"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Profile
              width={24}
              height={24}
              fill={focused ? "#007AFF" : "#8e8e93"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
