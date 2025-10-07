import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image
  
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
// import DropDownIcon from "../../../assets/svgIcons/orderIcon/DropDownIcon";
import DropDownIcon from "../../../assets/svgIcons/orderIcon/DropDownIcon";
import BookingIcon from "../../../assets/svgIcons/BooingIcon";
import MiddleArrowIcon from "../../../assets/svgIcons/orderIcon/MiddleArrowIcon";
import MultiStepProgressBar from "../../../customComponents/MultiStepProgressBar";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather"

const orderStatuses = [
  { label: "Awaiting pickup", value: "Awaiting pickup" },
  { label: "Picked up", value: "Picked up" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "In Transit", value: "In Transit" },
  { label: "Out of delivery", value: "Out of delivery" },
  { label: "Delivered", value: "Delivered" }
];

const steps = [
  { title: "Awaiting pickup", date: "13-05-2025", time: "11:30 AM" },
  { title: "Picked up", date: "14-05-2025", time: "02:15 PM" },
  { title: "In Transit", date: "15-05-2025", time: "09:45 AM" },
  { title: "Out of delivery", date: "16-05-2025", time: "10:30 AM" },
  { title: "Delivered", date: "17-05-2025", time: "03:20 PM" }
];

const orderData = {
  bookingId: "CW254614",
  bookingDate: "13-05-2025",
  bookingTime: "11:30 PM",
  pickupAddress: "Jaya vijaya plaza, vittal rao nagar",
  dropAddress: "Dhuram cheruvu, Madhapur",
  courierType: "Electronics",
  itemName: "Watch",
  totalAmount: 326
};

export default function TrackOrder() {
  const [status, setStatus] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const router = useRouter();
  const insets = useSafeAreaInsets();

 useEffect(() => {
  // Initialize status and currentStep on mount
  if (!status) {
    setStatus(orderStatuses[0].value);
    setCurrentStep(0);
  }
}, []);

useEffect(() => {
  const index = steps.findIndex(
    (s) => s.title.toLowerCase() === (status || "").toLowerCase()
  );
  if (index !== -1) {
    setCurrentStep(index);
  } else {
    // No matching step, reset currentStep
    setCurrentStep(null);
  }
}, [status]);

const onStepPress = (stepIndex) => {
  setCurrentStep(stepIndex);
  setStatus(steps[stepIndex].title);
};

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8ff" }}>
      
      <Stack.Screen
        options={{
          header: () => (
            <View
              style={{
                backgroundColor: "#F8F8ff",
                // paddingTop: Math.max(insets.top,50),
                paddingTop:insets.top+20,
                paddingBottom:4,            
            
                    flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => router.replace("/(homeScreen)")}
                style={{
                  backgroundColor: "#E7E7E7",
                  padding: 6,
                  borderRadius: 16,
                  marginLeft: 20
                }}
              >
                <Feather name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  marginLeft: 10,
                  color: "#252525"
                }}
              >
                Track Orders
              </Text>
            </View>
          )
        }}
      />

      <View style={styles.dropdownWrapper}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={orderStatuses}
          showsVerticalScrollIndicator={false}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Track Your Orders"
          value={status}
          onChange={(item) => {
            setStatus(item.value);
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
          
          onBlur={() => setIsFocus(false)}
          dropdownIconRender={() => {
            console.log("isfocus",isFocus);
            
            return(
            <DropDownIcon
              width={24}
              height={24}
              fill="#171616ff"
              style={{ transform: [{ rotate: isFocus ? "180deg" : "0deg" }] }}
            />
          )}}
          renderItem={(item) => (
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </View>
          )}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {status && (
          <View style={styles.detailsCard}>
            <View style={styles.headerRow}>
              <View style={styles.bookingInfo}>
                <View style={styles.iconWrapper}>
                  <BookingIcon width={18} height={18} />
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.label}>Booking ID</Text>
                  <Text style={styles.bookingId}>{orderData.bookingId}</Text>
                </View>
              </View>

              <View style={styles.statusBadge}>
                <Text
                  style={{
                    maxWidth: 100,
                    fontSize: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 25,
                    borderWidth:
                      status === "Cancelled" ? 0 : 1,
                    borderColor: "#000000",
                    color:
                      status === "Cancelled" 
                        ? "#FFFFFF":'#252525',
                        // : "#252525",
                    fontWeight: "500",
                    flexWrap: "wrap",
                    textAlign: "center",
                    backgroundColor:
                      status === "Cancelled"
                        ? "#FF0000":'#d6dce7ff'
                        // : status === "Delivered"
                        // ? "#FFFFFF"
                        // : "#e5ecf0ff"
                  }}
                >
                  {status}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ paddingHorizontal: 1 }}>
                <Text style={styles.labelData}>Booking Date</Text>
                <Text style={styles.value}>{orderData.bookingDate}</Text>
              </View>
              <View style={{ paddingHorizontal: 12 }}>
                <Text style={styles.labelData}>Booking Time</Text>
                <Text style={styles.value}>{orderData.bookingTime}</Text>
              </View>
            </View>

            <View style={styles.addressRow}>
              <View style={styles.addressItem}>
                <Text style={styles.labelData}>Pickup Address</Text>
                <Text style={styles.value}>{orderData.pickupAddress}</Text>
              </View>
              <View style={styles.arrowWrapper}>
                <MiddleArrowIcon width={20} height={20} />
              </View>
              <View style={styles.addressItem}>
                <Text style={styles.labelData}>Drop Address</Text>
                <Text style={styles.value}>{orderData.dropAddress}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ paddingHorizontal: 1 }}>
                <Text style={styles.labelData}>Courier Type</Text>
                <Text style={styles.value}>{orderData.courierType}</Text>
              </View>
              <View style={{paddingHorizontal:30}}>
                <Text style={styles.labelData}>Item Name</Text>
                <Text style={styles.value}>{orderData.itemName}</Text>
              </View>
            </View>

            <View style={styles.border} />

            <View style={styles.totalAmountContainer}>
              <Text style={styles.amt}>Total</Text>
              <Text style={styles.totalAmount}>₹{orderData.totalAmount}</Text>
            </View>

            <View>
              {/* ✅ Show date/time of selected step
              <View style={styles.datesContainer}>
                <View style={styles.dateItem}>
                  <Text style={[styles.dateText, styles.dateActive]}>
                    {steps[currentStep]?.date}
                  </Text>
                  <Text style={[styles.timeText, styles.timeActive]}>
                    {steps[currentStep]?.time}
                  </Text>
                </View>
              </View> */}
              <View style={{ marginTop: 16 }}><MultiStepProgressBar
                currentStep={currentStep}
                steps={steps}
                onStepPress={onStepPress}
              /></View>
              

              
            </View>
            <Text style={{marginTop:16,fontWeight:'500',fontSize:14,color:'252525',margin:10}}>Live Tracking</Text>
          </View>
        )}
      </ScrollView>
     
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: { flex: 1,paddingHorizontal:4 },
  scrollContent: { paddingBottom: 30 },
  dropdownWrapper: {
    marginTop: 20,
    marginHorizontal: 18,
    zIndex: 10
  },
  dropdown: {
    height: 50,
    borderColor: "#B0B0B0",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 11,
  
  },
  placeholderStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#252525"
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#252525",
    fontWeight: "400",
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#B0B0B0",
    borderStyle: "solid",
    backgroundColor: "#fff",
    
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#252525",
    fontWeight: "500"
  },
  detailsCard: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
    
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
  },
  bookingInfo: {
    flexDirection: "row",
    alignItems: "center",
     paddingVertical:8
  },
  iconWrapper: {
    marginLeft: 2,
    padding: 8,
    borderRadius: 18,
    backgroundColor: "#e6e1e1ff"
  },
  labelData: {
    fontWeight: "500",
    fontSize: 14,
    color: "#252525",paddingHorizontal:6
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000000",
    paddingLeft:1
  },
  bookingId: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    fontWeight:'500'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    
    
  },
  value: {
    fontSize: 12,
    color: "#6D6D6D",
    fontWeight: "400",
    paddingHorizontal:8,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 16
  },
  addressItem: { flex:1,gap:2,marginHorizontal:1},
  arrowWrapper: {
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS === "ios"
      ? { paddingHorizontal: 200 }
      : { width: "8%" }),
    marginBottom: 26
  },
  border: {
    ...(Platform.OS === "ios" ? { borderWidth: 10 } : { borderWidth: 0.7 }),
    borderColor: "#9a9494ff",
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginTop: 20
  },
  totalAmountContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center"
  },
  amt: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000"
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000"
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8
  },
  dateItem: {
    alignItems: "center",
    flex: 1
  },
  dateText: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center"
  },
  dateActive: {
    color: "#000"
  },
  timeText: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 2
  },
  timeActive: {
    color: "#666"
  },
  statusBadge: {
    borderRadius: 20,
    overflow: "hidden"
  }
});
