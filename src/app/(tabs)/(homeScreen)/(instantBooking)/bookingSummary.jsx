import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import React from "react";

import BooingIcon from "../../../../assets/svgIcons/BooingIcon";
import img1 from "../../../../assets/svgIcons/img1";
import img2 from "../../../../assets/svgIcons/img2";
import img3 from "../../../../assets/svgIcons/img3";
import img4 from "../../../../assets/svgIcons/img4";
import img5 from "../../../../assets/svgIcons/img5";

const orders = [
  {
    bookingId: "CW254614",
    date: "13-05-2025",
    courierType: "Electronics",
    status: "awaiting pickup",
    insured: false,
    itemName: "Watch",
    dimensions: "16×10cm, 5kg",
    bookingTime: "11:30 PM",
    bookingMode: "Instant",
    pickupdate: "10/05/2025",
    pickupTime: "4:00",
    reciepientName: "Himanshu",
    reciepientNumber: "8990904498",
    pickupAddress: "Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur",
    totalAmount: 326,
    packageImages: [
      { SvgComponent: img1, title: "img1" },
      { SvgComponent: img2, title: "img2" },
      { SvgComponent: img3, title: "img3" },
      { SvgComponent: img4, title: "img4" },
      { SvgComponent: img5, title: "img5" },
    ],
  },
  {
    bookingId: "CW254615",
    date: "14-05-2025",
    courierType: "Clothing",
    status: "awaiting pickup",
    insured: true,
    itemName: "Watch",
    dimensions: "20×15cm, 1kg",
    bookingTime: "10:00 AM",
    bookingMode: "Instant",
    pickupdate: "10/05/2025",
    pickupTime: "4:00",
    reciepientName: "Himanshu",
    reciepientNumber: "8990904498",
    pickupAddress: "Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur",
    totalAmount: 150,
    packageImages: [
      { SvgComponent: img1, title: "img1" },
      { SvgComponent: img2, title: "img2" },
      { SvgComponent: img3, title: "img3" },
      { SvgComponent: img4, title: "img4" },
      { SvgComponent: img5, title: "img5" },
    ],
  },
  {
    bookingId: "CW254616",
    date: "15-05-2025",
    courierType: "Clothing",
    status: "awaiting pickup",
    insured: false,
    itemName: "Watch",
    dimensions: "20×15cm, 1kg",
    bookingTime: "10:00 AM",
    bookingMode: "Instant",
    pickupdate: "10/05/2025",
    pickupTime: "4:00",
    reciepientName: "Himanshu",
    reciepientNumber: "8990904498",
    pickupAddress: "Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur",
    totalAmount: 325,
    packageImages: [
      { SvgComponent: img1, title: "img1" },
      { SvgComponent: img2, title: "img2" },
      { SvgComponent: img3, title: "img3" },
      { SvgComponent: img4, title: "img4" },
      { SvgComponent: img5, title: "img5" },
    ],
  },
  {
    bookingId: "CW254617",
    date: "16-05-2025",
    courierType: "Clothing",
    status: "awaiting pickup",
    insured: false,
    itemName: "Watch",
    dimensions: "20×15cm, 1kg",
    bookingTime: "10:00 AM",
    bookingMode: "Instant",
    pickupdate: "10/05/2025",
    pickupTime: "4:00",
    reciepientName: "Himanshu",
    reciepientNumber: "8990904498",
    pickupAddress: "Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur",
    totalAmount: 200,
    packageImages: [
      { SvgComponent: img1, title: "img1" },
      { SvgComponent: img2, title: "img2" },
      { SvgComponent: img3, title: "img3" },
      { SvgComponent: img4, title: "img4" },
      { SvgComponent: img5, title: "img5" },
    ],
  },
];

const bookingSummary = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();

  const { id } = useLocalSearchParams();
  const statusLower = orders[0].status.toLowerCase();
  const isInTransit = statusLower === "in-transit";
  const isCancelled = statusLower === "cancelled";
  const isAwaitingPickup = statusLower === "awaiting pickup";

  const showParcel = isInTransit || isAwaitingPickup;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8ff" }}>
      <ScrollView>
        <View style={{ backgroundColor: "#f8f8ff" ,paddingBottom:20}}>
          <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />

          {/* STACK-SCREEN */}
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
                        padding: 6,
                        borderRadius: 16,
                        marginLeft: 20,
                      }}
                    >
                      <Feather name="chevron-left" size={20} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginLeft: 10,
                        color: "#252525",
                      }}
                    >
                      {" "}
                      Parcel Details
                    </Text>
                  </View>
                );
              },
            }}
          />
          {/* STACK-SCREEN-END */}

          <View style={styles.container}>
            <View style={styles.rowBetween}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#000000",
                    marginTop: 10,
                  }}
                >
                  Booking Summary
                </Text>
              </View>
              {/* <View style={styles.row}>
                  <View style={styles.iconWrapper}>
                    <BooingIcon width={18} height={18} />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.label}>Booking ID</Text>
                    <Text style={styles.value}>{orders[0].bookingId}</Text>
                  </View>
                </View> */}
              {/* <View>
                  <Text
                    style={{
                      maxWidth: 100,
                      // bordersWidth:1,
                      fontSize: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 11,
                      backgroundColor: "#E7E7E7",
                      borderRadius: 25,
                      borderWidth: orders[0].status === "Cancelled" ? 0 : 1,
                      borderColor: "#000000",
                      color:
                        orders[0].status === "Cancelled" ? "#FFFFFF" : "#252525",
                      fontWeight: "500",
                      flexWrap: "wrap",
                      textAlign: "center",
                      backgroundColor:
                        orders[0].status === "Cancelled" ? "#FF0000" : "#F8F8ff",
                    }}
                  >
                    {orders[0].status}
                  </Text>
                </View> */}

              {/* {showParcel && (
              <View style={styles.insuredTag}>
                <Text style={[TextStyles.STYLE_1_A22]}>Insured parcel</Text>
              </View>
            )} */}
            </View>

            {/* First Detail Row */}
            <View style={styles.detailRow}>
              {/* Booking Date & Booking Time */}
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Booking Date</Text>
                <Text style={styles.value}>{orders[0].date}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.labeldata1}>Booking Time</Text>
                <Text style={styles.value}>{orders[0].bookingTime}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              {/* Dimensions & Booking Mode */}
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Dimensions</Text>
                <Text style={styles.value}>{orders[0].dimensions}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.labeldata2}>Booking Mode</Text>
                <Text style={styles.value}>{orders[0].bookingMode}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              {/* Courier Type & Item Name */}
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Courier Type</Text>
                <Text style={styles.value}>{orders[0].courierType}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.labeldata3}>Item Name</Text>
                <Text style={styles.value}>{orders[0].itemName}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              {/* Pickup Date & Pickup Time */}
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Pickup Date</Text>
                <Text style={styles.value}>{orders[0].pickupdate}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.labeldata4}>Pickup Time</Text>
                <Text style={styles.value}>{orders[0].pickupTime}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              {/* Recipient Name & Recipient Number */}
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Recipient Name</Text>
                <Text style={styles.value}>{orders[0].reciepientName}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.labeldata5}>Recipient Number</Text>
                <Text style={styles.value}>{orders[0].reciepientNumber}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              {/* Pickup Address & Drop Address */}
              <View style={[styles.detailBox]}>
                <Text style={styles.labeldata}>Pickup Address</Text>
                <Text style={[styles.value1, { flexShrink: 1 }]}>
                  {orders[0].pickupAddress}
                </Text>
              </View>
              <View style={[styles.detailBox, { marginLeft: 15 }]}>
                <Text style={styles.labeldata6}>Drop Address</Text>
                <Text style={[styles.value1, { flexShrink: 1 }]}>
                  {orders[0].dropAddress}
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.imagedata}>Package images</Text>
            </View>

            <View style={styles.packageImagesContainer}>
              {Array.isArray(orders[0].packageImages) &&
                orders[0].packageImages.map((imgObj, i) => {
                  const SvgComponent = imgObj.SvgComponent;
                  return (
                    <View
                      key={i}
                      style={{ alignItems: "center", marginRight: 1 }}
                    >
                      <SvgComponent width={20} height={20} />
                      <Text style={{ fontSize: 10, color: "#444" }}>
                        {imgObj.title}
                      </Text>
                    </View>
                  );
                })}
            </View>

            {/* INSURED-PARCEL-START */}
            <View style={styles.packedparcel}>
              <Text style={styles.parcel}>This parcel is insured</Text>
              <Text style={{ color: "#6D6D6D" }}>Covered: ₹20,000</Text>
            </View>
            {/* INSURED-PARCEL-END */}

            <View style={styles.line}></View>

            <View style={styles.detailRow}>
              <View style={styles.price}>
                <Text style={styles.amount}>Total Amount</Text>
              </View>
              <View style={styles.price}>
                <Text style={styles.amount}>₹{orders[0].totalAmount}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.para} numberOfLines={2}>
                * Final Price may vary after physical {"\n"}
                <Text></Text> verification during pickup
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 40,
              marginBottom:5,
              marginHorizontal:20,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 65,
                  paddingVertical: 10,
                  borderRadius: 5,
                  color: "#252525",
                  fontWeight: 600,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.navigate("/bookingDetails")}>
              <Text
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  borderRadius: 5,
                  backgroundColor: "#252525",
                  color: "#FFFFFF",
                  fontWeight: 400,
                }}
              >
                Confirm booking
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default bookingSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop:20,
    backgroundColor: "#FFFFFF",
    // marginTop: 5,
    marginHorizontal: 20,
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    // borderWidth:1,
    // marginBottom:50,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packageImagesContainer: {
    flexDirection: "row",
    marginTop: 20,
    flexWrap: "wrap",
    gap: 10,
    // marginBottom:12,
  },
  // detailRow: {
  //   // flexDirection: 'row',
  //   borderWidth:1,
  //   justifyContent: "space-between",
  // },
  detailBox: {
    flex: 1,
    paddingHorizontal: 10,
  },
  labeldata: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
  },
  labeldata1: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
    marginRight: 26,
  },
  labeldata2: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
    marginRight: 22,
  },
  labeldata3: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
    marginRight: 44,
  },
  labeldata4: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
    marginRight: 34,
  },
  labeldata5: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
    // marginRight:30
  },
  labeldata6: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
    marginRight: 27,
  },

  value: {
    fontSize: 12,
    color: "#6D6D6D",
    fontWeight: 400,
    flexWrap: "wrap",
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  value1: {
    fontSize: 12,
    // borderWidth:1,
    color: "#6D6D6D",
    fontWeight: 400,
    // flexWrap: 'wrap',
    width: "70%",
    // borderWidth:1,
    // marginHorizontal:5
  },
  packageImage: {
    width: 40,
    height: 40,
    backgroundColor: "#7e7575ff",
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: 16,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  imagedata: {
    marginTop: 15,
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  label: { fontSize: 14, fontWeight: "500", color: "#252525" },
  // labeldata: { fontSize: 14, fontWeight: '500', color: '#252525' },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginVertical: 10,
  },
  parcel: { color: "#16A263", fontWeight: "bold", fontSize: 16 },
  packedparcel: { marginTop: 20, backgroundColor: "#E7F5EC", padding: 15 },
  // value: { fontSize: 10, color: '#5D5D5D', fontWeight: '500',paddingLeft:2, },
  para: { fontSize: 12, color: "#6D6D6D", marginTop: -5 },

  line: { borderBottomWidth: 0.2, marginTop: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  detailRow: {
    // borderWidth:1,
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 35,
    // marginRight:16
    marginTop: 20,
  },

  detailBox: {
    // backgroundColor:"pink",
    //  bordersWidth:1,
    paddingHorizontal: 1,
    // flex: 1,

    // gap: 10
  },

  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: -13,
    // marginHorizontal:1,
    gap: 70,
  },
  addressBox: {
    flex: 1,
    marginHorizontal: -2,
  },
  img: {
    marginTop: 32,
    marginLeft: -1,
  },
  price: {
    // borderWidth:1,
    // marginVertical:15,
    marginTop: -10,
  },
});
