import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackArrow from "../../assets/svgIcons/BackArrow";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";

import RazorPayIcon from "../../assets/svgIcons/RazorPayIcon";
import PayMoney from "../razorPayModule/razorPay";

const paymentMethodScreen = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();
  const [selectedPayment, setSelectedPayment] = useState(); // default selected
  const amount =100;

  const handleRazorPay= async()=>{
     try{
      await PayMoney(amount)

     }catch(error){
       Alert.alert('Payment Error', err.message);
     }
   
    
  }

  return (
    <View style={{ backgroundColor: "#f8f8ff", flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "#f8f8ff",
                  paddingTop: inserts.top + 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{
                    backgroundColor: "#E7E7E7",
                    padding: 8,
                    borderRadius: 16,
                    marginLeft: 15,
                  }}
                >
                  <BackArrow width={16} height={16} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginLeft: 14,
                    color: "#252525",
                  }}
                >
                  Select Payment
                </Text>
              </View>
            );
          },
        }}
      />
      <View
        style={{
          backgroundColor: "#f8f8ff",
          marginHorizontal: 20,
          marginTop: 30,
        }}
      >
        <View>
          <TouchableOpacity style={styles.card} onPress={handleRazorPay}>
            <RazorPayIcon />
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Razor Pay</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedPayment("cod")}
          >
            {/* Radio Button */}
            <View style={styles.radioOuter}>
              {selectedPayment === "cod" && <View style={styles.radioInner} />}
            </View>

            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              Cash on delivery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default paymentMethodScreen;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    marginVertical: 10,
  },
  card2: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    marginVertical: 10,
  },
  radioOuter: {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#093C31",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},
radioInner: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: "#093C31",
},

});
