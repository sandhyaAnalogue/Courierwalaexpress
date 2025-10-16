import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../utils/AuthProvider";
// import { AuthContext } from "../utils/AuthProvider";
import { router, Stack } from "expo-router";
import { Redirect } from "expo-router";
import { useFonts } from "expo-font";
import HybridStorage from "../utils/helpers/HybridStorage";
import { ActivityIndicator, View } from "react-native";

const index = () => {
  // const { isLoggedIn } = useContext(AuthContext) || {};
  const [tokenData, setTokenData] = useState();

  useEffect(() => {
    const loadToken = async () => {
      const token = await HybridStorage.getItem("mainToken");
      console.log(token,"TOKEN")
      // if (token) {
      //   router.replace("/(homeScreen)");
      // } else {
      //   router.replace("/(authScreen)");
      // }
    };
    loadToken();
  }, []);

  const [fontsLoaded] = useFonts({
    "Insured-Tag": require("../../assets/fonts/InsuredTag.ttf"),
    // 'Gabarito-VariableFont': require('../assets/Fonts/Gabarito-VariableFont_wght.ttf'),
    // 'Outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"small"} color={"black"} />
      {/* <Redirect href="/(authScreen)"/> */}
      <Redirect href="/(homeScreen)"/>
    </View>
  );
};

export default index;
