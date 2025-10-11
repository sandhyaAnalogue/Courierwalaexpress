import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DropDownIcon from "../../../assets/svgIcons/orderIcon/DropDownIcon";
import BookingIcon from "../../../assets/svgIcons/BooingIcon";
import MultiStepProgressBar from "../../../components/MultiStepProgressBar";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import MiddleArrowIcon from "../../../assets/svgIcons/orderIcon/MiddleArrowIcon";

const orderStatuses = [
  { label: "Awaiting pickup", value: "Awaiting pickup" },
  { label: "Picked up", value: "Picked up" },
  { label: "In Transit", value: "In Transit" },
  { label: "Out of delivery", value: "Out of delivery" },
  { label: "Delivered", value: "Delivered" },
];

const steps = [
  { title: "Awaiting pickup", date: "13-05-2025", time: "11:30 AM" },
  { title: "Picked up", date: "14-05-2025", time: "02:15 PM" },
  { title: "In Transit", date: "15-05-2025", time: "09:45 AM" },
  { title: "Out of delivery", date: "16-05-2025", time: "10:30 AM" },
  { title: "Delivered", date: "17-05-2025", time: "03:20 PM" },
];

const orderData = {
  bookingId: "CW254614",
  date: "13-05-2025", // ✅ Added missing fields
  bookingTime: "11:30 PM",
  pickupAddress: "Jaya vijaya plaza, vittal rao nagar",
  dropAddress: "Dhuram cheruvu, Madhapur",
  courierType: "Electronics",
  itemName: "Watch",
  totalAmount: 326,
  dimensions: "10x10x10 cm", 
  bookingMode: "Online",
};

export default function TrackOrder() {
  const [status, setStatus] = useState(orderStatuses[0].value);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const index = steps.findIndex(
      (s) => s.title.toLowerCase() === (status || "").toLowerCase()
    );
    setCurrentStep(index !== -1 ? index : 0);
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
                paddingTop: insets.top + 20,
                paddingBottom: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => router.replace("/(homeScreen)")}
                style={{
                  backgroundColor: "#E7E7E7",
                  padding: 6,
                  borderRadius: 16,
                  marginLeft: 20,
                }}
              >
                <Feather name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  marginLeft: 10,
                  color: "#252525",
                }}
              >
                Track Orders
              </Text>
            </View>
          ),
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
          dropdownIconRender={() => (
            <DropDownIcon
              width={24}
              height={24}
              fill="#171616ff"
              style={{ transform: [{ rotate: isFocus ? "180deg" : "0deg" }] }}
            />
          )}
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
            {/* Booking Header */}
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
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 25,
                    borderWidth: status === "Cancelled" ? 0 : 1,
                    borderColor: "#000000",
                    color: status === "Cancelled" ? "#FFFFFF" : "#252525",
                    fontWeight: "500",
                    textAlign: "center",
                    backgroundColor:
                      status === "Cancelled" ? "#FF0000" : "#d6dce7ff",
                  }}
                >
                  {status}
                </Text>
              </View>
            </View>

            {/* Details */}
            {/* <View style={{ marginHorizontal: 15 }}> */}
              <View style={[styles.detailRow,{
              
              }]}>
                <View style={styles.detailBoxLeft}>
                  <View style={styles.labelValuePair}>
                    <Text style={styles.labelData}>Booking Date</Text>
                    <Text style={styles.value}>{orderData.date}</Text>
                  </View>
                  <View style={styles.labelValuePair}>
                    <Text style={styles.labelData}>Pickup Address</Text>
                    <Text style={styles.value1}>{orderData.pickupAddress}</Text>
                  </View>
                  <View style={styles.labelValuePair}>
                    <Text style={styles.labelData}>Courier Type</Text>
                    <Text style={styles.value}>{orderData.courierType}</Text>
                  </View>
                </View>
                <View style={{marginBottom:40}}>
                  <MiddleArrowIcon width={20} height={20} />
                </View>

                <View style={[styles.detailBoxRight,{
                  
                }]}>
                  <View style={styles.labelValuePair}>
                    <Text style={styles.labelData}>Booking Time</Text>
                    <Text style={styles.value}>{orderData.bookingTime}</Text>
                  </View>

                  <View style={styles.labelValuePair}>
                    <Text style={styles.labelData}>Drop Address</Text>
                    <Text style={styles.value1}>{orderData.dropAddress}</Text>
                  </View>
                  <View style={styles.labelValuePair}>
                    <Text style={styles.labelData}>Item Name</Text>
                    <Text style={styles.value}>{orderData.itemName}</Text>
                  </View>
                </View>
              </View>
           

            {/* Divider */}
            <View style={styles.line} />

            {/* Total */}
            <View style={styles.totalAmountContainer}>
              <Text style={styles.amt}>Total</Text>
              <Text style={styles.totalAmount}>₹{orderData.totalAmount}</Text>
            </View>

            {/* Progress Bar */}
            <View style={{ marginTop: 16 }}>
              <MultiStepProgressBar
                currentStep={currentStep}
                steps={steps}
                onStepPress={onStepPress}
              />
            </View>

            <Text
              style={{
                marginTop: 16,
                fontWeight: "500",
                fontSize: 14,
                color: "#252525",
                margin: 10,
              }}
            >
              Live Tracking
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 30 },
  dropdownWrapper: {
    marginTop: 20,
    marginHorizontal: 18,
    zIndex: 10,
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
    color: "#252525",
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
    backgroundColor: "#fff",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#252525",
    fontWeight: "500",
  },
  detailsCard: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 15,
    marginBottom: 30,
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom:10
  },
  bookingInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconWrapper: {
    marginLeft: 2,
    padding: 8,
    borderRadius: 18,
    backgroundColor: "#e6e1e1ff",
  },
  labelData: {
    fontWeight: "500",
    fontSize: 14,
    color: "#252525",
    marginBottom: 4,
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000000",
  },
  bookingId: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    fontWeight: "500",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal:10
    // gap:20
    
   
    
  
    
  },
  detailBoxLeft: {
   
    //  borderWidth:1,
     width:'40%'
  
    
  },
   detailBoxRight: {
   
    //  borderWidth:1,
      width:'35%'
  
    
  },
   value1: {
  fontSize: 12,
  color: "#6D6D6D",
  fontWeight: "400",
  // flexShrink: 1, 
  // flexWrap: "wrap", 
  // width:'78%'
},

  // middleIconWrapper:{
  //    color:"red",
  // },
  labelValuePair: {
    marginBottom: 10,
  },
  value: {
   fontSize: 12,
  color: "#6D6D6D",
  fontWeight: "400",
  },
  line: {
    // height: 1,
    // backgroundColor: "#ddd",
    borderBottomWidth:1,
    marginTop: 10,
    marginHorizontal:10
  },
  totalAmountContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  amt: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000",
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  statusBadge: {
    borderRadius: 20,
    overflow: "hidden",
  },
});