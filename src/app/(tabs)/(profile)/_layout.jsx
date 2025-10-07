import { Stack,router, useNavigation } from "expo-router";
// import BackArrow from "../../../../assets/svgs/SVGIcons/BackArrow";
import BackArrow from "../../../assets/svgIcons/BackArrow";
import { Platform, Pressable, StyleSheet } from "react-native";

const _layout = () => {
  const navigation=useNavigation();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: "transparent",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        // options={{
        //   headerTitle: "My Profile",
        //   headerLeft: () => (
        //     <Pressable
        //       style={styles.backarrowContainer}
        //        onPress={() => router.navigate("/(profile)")}
        //       // onPress={() => router.navigate("/(tabs)/(homeScreen)/Home")}
            
        //     >
        //       <BackArrow width={16} height={16} />
        //     </Pressable>
        //   ),
        // }}
      />
      <Stack.Screen name="ManageAddress" 
        // options={{
        //   headerTitle: "Manage Address",
        //   headerLeft: () => (
        //     <Pressable
        //       style={styles.backarrowContainer}
        //       onPress={() => router.navigate("(profile)")}
        //     >
        //       <BackArrow width={16} height={16} />
        //     </Pressable>        
        //   ),
        // }}
         />
    </Stack>
  );
};

export default _layout;
const styles = StyleSheet.create({
  backarrowContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#D1D1D1",
    borderRadius: 20,
    marginRight: 15,
    marginLeft:Platform.select({web:50})
  },
});
