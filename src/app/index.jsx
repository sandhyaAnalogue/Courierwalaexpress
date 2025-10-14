import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../utils/AuthProvider";
import { AuthContext } from "../utils/AuthProvider";
import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import { useFonts } from 'expo-font'

const index = () => {
  // const { isLoggedIn } = useContext(AuthContext) || {};
  // const [tokenData,setTokenData] = useState()

  useEffect(() => {
      const loadToken = async () => {
        const token = await HybridStorage.getItem("token");
        if (token) {
           return <Redirect href="/(homeScreen)" />;
        }else{
          return <Redirect href="(authScreen)" />;
        }
      };
      loadToken();
    }, []);

  const [fontsLoaded] = useFonts({
    'Insured-Tag': require('../../assets/fonts/InsuredTag.ttf'),
    // 'Gabarito-VariableFont': require('../assets/Fonts/Gabarito-VariableFont_wght.ttf'),
    // 'Outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
  })

  

  
  // return <Redirect href="/(homeScreen)" />;
  // return <Redirect href="/(homeScreen)/(instantBooking)"/>;
};



export default index;
