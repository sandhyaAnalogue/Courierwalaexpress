import { StyleSheet, Pressable, Platform } from "react-native";
import { Stack, router } from "expo-router";
// import BackArrow from "../../../assets/svgs/SVGIcons/BackArrow";
import BackArrow from "../../assets/svgIcons/BackArrow";

const _layout = () => {
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
        name="addAddressDetails"
        // options={{
        //   headerTitle: "Add address details",
        //   headerLeft: () => (
        //     <Pressable
        //       style={styles.backarrowContainer}
        //       onPress={() => router.navigate("/(profile)/ManageAddress")}
        //     >
        //       <BackArrow width={16} height={16} />
        //     </Pressable>
        //   ),
        // }}
      />
      <Stack.Screen name="cancellationPolicy" 
      // options={{
      //     headerTitle: "Cancellation Policy",
      //     headerLeft: () => (
      //       <Pressable
      //         style={styles.backarrowContainer}
      //         onPress={() => router.navigate("/(profile)")}
      //       >
      //         <BackArrow width={16} height={16} />
      //       </Pressable>
      //     ),
      //   }}
        />
      <Stack.Screen
        name="helpSupport"
        // options={{
        //   headerTitle: "Help & support",
        //   headerLeft: () => (
        //     <Pressable
        //       style={styles.backarrowContainer}
        //       onPress={() => router.navigate("/(profile)")}
        //     >
        //       <BackArrow width={16} height={16} />
        //     </Pressable>
        //   ),
        // }}
      />
      <Stack.Screen name="privacyPolicies" 
      // options={{
      //     headerTitle: "Privacy policies",
      //     headerLeft: () => (
      //       <Pressable
      //         style={styles.backarrowContainer}
      //         onPress={() => router.navigate("/(profile)")}
      //       >
      //         <BackArrow width={16} height={16} />
      //       </Pressable>
      //     ),
      //   }}
         />
      <Stack.Screen name="refundPolicy" 
      // options={{
      //     headerTitle: "Help & support",
      //     headerLeft: () => (
      //       <Pressable
      //         style={styles.backarrowContainer}
      //         onPress={() => router.navigate("/(profile)")}
      //       >
      //         <BackArrow width={16} height={16} />
      //       </Pressable>
      //     ),
      //   }}
        />
      <Stack.Screen
        name="termsConditions"
        // options={{
        //   headerTitle: "Terms & conditions",
        //   headerStyle: {
        //     elevation: 0,
        //     shadowOpacity: 0,
        //     borderBottomWidth: 0,
        //     backgroundColor: "transparent",
        //   },
        //   headerShadowVisible: false,
        //   headerLeft: () => (
        //     <Pressable
        //       style={styles.backarrowContainer}
        //       onPress={() => router.navigate("/(profile)")}
        //     >
        //       <BackArrow width={16} height={16} />
        //     </Pressable>
        //   ),
        // }}
      />
      <Stack.Screen
        name="editProfile"
        // options={{
        //   headerTitle: "My Profile",
        //   headerLeft: () => (
        //     <Pressable
        //       style={styles.backarrowContainer}
        //       onPress={() => router.navigate("/(profile)")}
        //     >
        //       <BackArrow width={16} height={16} />
        //     </Pressable>
        //   ),
        // }}
      />
      <Stack.Screen name="qrCode" options={{
    headerShown: false, 
  }}
 />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({
  backarrowContainer: {
    // borderWidth:1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#D1D1D1",
    borderRadius: 20,
    marginRight: 15,
    marginLeft:Platform.select({
      web:50,
    })
  },
});
