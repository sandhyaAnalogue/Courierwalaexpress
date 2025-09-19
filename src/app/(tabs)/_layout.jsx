import { Tabs, useNavigation } from "expo-router";
import Home from "../../../assets/tabIcons/Home";
import Order from "../../../assets/tabIcons/Order";
import Track from "../../../assets/tabIcons/Track";
import Profile from "../../../assets/tabIcons/Profile";
import { Text, TouchableOpacity } from "react-native";

const _layout = () => {
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 70, paddingTop: 9 },
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
