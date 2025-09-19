import { Stack } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'
import PersonIcon from "../../../../assets/icons/PersonIcon"
import BellIcon from "../../../../assets/svgs/SVGIcons/BellIcon"
import { Platform } from 'react-native'


const _layout = () => {

  const handleBellIcon = () => {
  alert("Notifications clicked!");
};
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name="index"
        // options={{
        //   headerShown: true,
        //   headerTitle: "Sandhya",
        //   headerTitleStyle: { fontWeight: "100", fontSize: 18 },
        //   headerLeft: () => (
        //     <View
        //       style={{
        //         backgroundColor: "#252525",
        //         borderRadius: 20,
        //         padding: 6,
        //         marginRight: 10,
        //         marginLeft:Platform.select({web:50,default:10})
        //       }}
        //     >
        //       <PersonIcon width={24} height={24} fill="white" />
        //     </View>
        //   ),
        //   headerStyle: { backgroundColor: "#F6F6F6" },
        //   headerShadowVisible: false,
        //   contentStyle: { backgroundColor: "#F6F6F6" },
        //   headerRight: () => (
        //     <View style={{marginRight:Platform.select({web:50,default:22}) }}>
        //       <Pressable onPress={handleBellIcon}>
        //         <BellIcon width={22} height={22} />
        //       </Pressable>
        //     </View>
        //   ),
        // }}
      />

      <Stack.Screen name='BookCourier' options={{headerShown:false}}/>
    </Stack>
  )
}

export default _layout