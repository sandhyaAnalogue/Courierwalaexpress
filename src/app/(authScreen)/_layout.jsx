import React from 'react'
import { Stack } from 'expo-router'
// import BackArrowButton from "../../../assets/icons/BackArrow"
import BackArrowButton from "../../assets/svgIcons/BackArrowButton"

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="OTPscreen" />
        <Stack.Screen 
        name="AuthProfile"  
        options={{
          headerShown:true
        }}
        // options={{
        //   headerShown: true,
        //   headerTitle: "My Profile",
        //   headerTitleStyle: { fontWeight: "100", fontSize: 18 },
        //   headerLeft: () => <BackArrowButton />,
        //   headerStyle: { backgroundColor: "#F6F6F6" },
        //   contentStyle: { backgroundColor: "#F6F6F6" },
        //   headerShadowVisible: false,
        // }}
      />
    </Stack>
  )
}

export default _layout