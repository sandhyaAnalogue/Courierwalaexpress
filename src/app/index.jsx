import { useContext } from "react";
// import { AuthContext } from "../utils/AuthProvider";
import { AuthContext } from "../utils/AuthProvider";
import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import { useFonts } from 'expo-font'

const index = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    'Insured-Tag': require('../../assets/fonts/InsuredTag.ttf'),
    // 'Gabarito-VariableFont': require('../assets/Fonts/Gabarito-VariableFont_wght.ttf'),
    // 'Outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
  })

  // if (isLoggedIn) {
    // return <Redirect href="/(homeScreen)" />;
  // }

  return <Redirect href="(authScreen)" />;
  // return <Redirect href="/(homeScreen)" />;
};



export default index;
