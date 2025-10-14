import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import BookingIcon from '../../../assets/svgIcons/BooingIcon';
import BookingIcon from "../../../assets/svgIcons/BooingIcon";
import { Platform } from "react-native";

import RaiseIssue from "../../../assets/svgIcons/RaiseIssueIcon";
import Rebook from "../../../assets/svgIcons/Rebook";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Stack } from "expo-router";
// import TextStyles from "../../TextStyles/TextStyles";
// import img1 from '../../../assets/svgIcons/img1'
import img1 from "../../../assets/svgIcons/img1";

import img2 from "../../../assets/svgIcons/img2";
import img3 from "../../../assets/svgIcons/img3";
import img4 from "../../../assets/svgIcons/img4";
import img5 from "../../../assets/svgIcons/img5";
import { useState } from "react";

// // Use the correct image paths from your assets folder
// const img1 = require('../../../../image/img1');
// const img2 = require('../../../../image/img2');
// const img3 = require('../../../../image/img3');
// const img4 = require('../../../../image/img4');
// const img5 = require('../../../../image/img5');

const orders = [
  {
    bookingId: "CW254614",
    date: "13-05-2025",
    courierType: "Electronics",
    status: "In-Transit",
    insured: false,
    itemName: "Watch",
    dimensions: "16×10cm, 5kg",
    bookingTime: "11:30 PM",
    bookingMode: "Instant",
    pickupAddress:
      "Jaya Vijaya Plaza, Vital Rao Nagar  Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur Durgam Cheruve",
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
    status: "Awaiting pickup",
    insured: true,
    itemName: "Watch",
    dimensions: "20×15cm, 1kg",
    bookingTime: "10:00 AM",
    bookingMode: "Instant",
    pickupAddress:
      "Jaya Vijaya Plaza, Vital Rao Nagar Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur Durgam Cheruve",
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
    status: "Cancelled",
    insured: false,
    itemName: "Watch",
    dimensions: "20×15cm, 1kg",
    bookingTime: "10:00 AM",
    bookingMode: "Instant",
    pickupAddress:
      "Jaya Vijaya Plaza, Vital Rao Nagar Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur Durgam Cheruve",
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
    status: "Delivered",
    insured: false,
    itemName: "Watch",
    dimensions: "20×15cm, 1kg",
    bookingTime: "10:00 AM",
    bookingMode: "Instant",
    pickupAddress:
      "Jaya Vijaya Plaza, Vital Rao Nagar Jaya Vijaya Plaza, Vital Rao Nagar",
    dropAddress: "Durgam Cheruvu, Madhapur Durgam Cheruve",
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

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const inserts = useSafeAreaInsets();
  const router = useRouter();

  const order = orders.find((o) => o.bookingId === id);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Order not found</Text>
      </View>
    );
  }

  const statusLower = order.status.toLowerCase();
  const isInTransit = statusLower === "in-transit";
  const isCancelled = statusLower === "cancelled";
  const isAwaitingPickup = statusLower === "awaiting pickup";
  const showParcel = isAwaitingPickup && order.insured;
  const [showFullPickup, setShowFullPickup] = useState(false);
  const [showFullDrop, setShowFullDrop] = useState(false);

  return (
    <ScrollView 
      contentContainerStyle={styles.main}
     showsVerticalScrollIndicator={false}
    >
     <Stack.Screen
        options={{
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "#F8F8ff",
                 paddingTop:Platform.select({
                     android:20,
                     ios:20,
                     web:30
                 }),

                  paddingTop: inserts.top + 20,
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
                      // marginBottom:20
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
                    //  marginBottom:20
                  }}
                >
                  {" "}
                  My Orders
                </Text>
              </View>
            );
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <View style={styles.iconWrapper}>
              <BookingIcon width={18} height={18} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.label}>Booking ID</Text>
              <Text style={styles.value}>{order.bookingId}</Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                maxWidth: 100,
                // borderWidth:1,
                fontSize: 10,
                paddingHorizontal: 14,
                paddingVertical: 7,
                backgroundColor: "#E7E7E7",
                borderRadius: 25,
                borderWidth: order.status === "Cancelled" ? 0 : 1,
                borderColor: "#000000",
                color: order.status === "Cancelled" ? "#FFFFFF" : "#252525",
                fontWeight: "500",
                flexWrap: "wrap",
                textAlign: "center",
                backgroundColor:
                  order.status === "Cancelled" ? "#FF0000" : "#F8F8ff",
              }}
            >
              {order.status}
            </Text>
          </View>

          {showParcel && (
            <View style={styles.insuredTag}>
              <Text>Insured parcel</Text>
            </View>
          )}
        </View>
        <View style={styles.detailRow}>
          {/* Left Side Details */}
          <View style={styles.detailBoxLeft}>
            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Booking Date</Text>
              <Text style={styles.value}>{order.date}</Text>
            </View>

            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Courier Type</Text>
              <Text style={styles.value}>{order.courierType}</Text>
            </View>

            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Dimensions</Text>
              <Text style={styles.value}>{order.dimensions}</Text>
            </View>

            {/* <View style={styles.labelValuePair}>
      <Text style={styles.labeldata}>Pickup Address</Text>
      <Text style={styles.value} numberOfLines={2}>{order.pickupAddress}</Text>
    </View> */}
          </View>

          {/* Right Side Details */}
          <View style={styles.detailBoxRight}>
            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Booking Time</Text>
              <Text style={styles.value}>{order.bookingTime}</Text>
            </View>

            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Item Name</Text>
              <Text style={styles.value}>{order.itemName}</Text>
            </View>

            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Booking Mode</Text>
              <Text style={styles.value}>{order.bookingMode}</Text>
            </View>

            {/* <View style={styles.labelValuePair}>
      <Text style={styles.labeldata}>Drop Address</Text>
      <Text style={styles.value} numberOfLines={2}>{order.dropAddress}</Text>
    </View> */}
          </View>
        </View>

        <View
          style={[
            styles.addressContainer,
            {
              flexDirection: isAwaitingPickup ? "row" : "column",
              width: "100%",
            },
          ]}
        >
          {/* Pickup Address */}
          {/* <View
            style={[styles.addressBoxLeft, isAwaitingPickup && { flex: 1 }]}
          > */}
            <View
            style={[styles.addressBoxLeft]}
          >
            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Pickup Address</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowFullPickup(!showFullPickup)}
              >
                <Text
                  style={styles.value1}
                  numberOfLines={showFullPickup ? undefined : 1}
                  ellipsizeMode="tail"
                >
                  {order.pickupAddress}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Drop Address */}
          {/* <View
            style={[styles.addressBoxRight, isAwaitingPickup && { flex: 1 }]}
          > */}
            <View
            style={styles.addressBoxRight}
          >
            <View style={styles.labelValuePair}>
              <Text style={styles.labeldata}>Drop Address</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowFullDrop(!showFullDrop)}
              >
                <Text
                  style={styles.value1}
                  numberOfLines={showFullDrop ? undefined : 1}
                  ellipsizeMode="tail"
                >
                  {order.dropAddress}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.img}>
          <Text style={styles.labeldata}>Package images</Text>
          <View style={styles.packageImagesContainer}>
            {order.packageImages.map((imgObj, i) => {
              const SvgComponent = imgObj.SvgComponent; // get the component
              return (
                <View key={i} style={{ alignItems: "center", marginRight: 1 }}>
                  <SvgComponent width={20} height={20} />
                  <Text style={{ fontSize: 10, color: "#444" }}>
                    {imgObj.title}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {showParcel && (
          <View style={styles.packedparcel}>
            <Text style={styles.parcel}>This parcel is insured</Text>
            <Text style={{ color: "#6D6D6D" }}>Covered: ₹20,000</Text>
          </View>
        )}

        <View style={styles.line}></View>

        <View style={styles.TotalPrice}>
          <View style={styles.price}>
            <Text style={styles.amount}>Total Amount</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.amount}>₹{order.totalAmount}</Text>
          </View>
        </View>

        {(isCancelled || isAwaitingPickup) && (
          <View>
            <Text style={styles.para} numberOfLines={2}>
              *Final Price may vary after physical {"\n"}
              <Text></Text> verification during pickup
            </Text>
          </View>
        )}

        {/* In-Transit: Show Rebook + View Less */}
        {isInTransit && (
          <>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.rebookButton}>
                <Rebook width={24} height={24} />
                <Text style={styles.rebookText}>Rebook</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.linkText}>View Less</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Awaiting Pickup or others (excluding In-Transit): Show Rebook + Raise Issue */}
        {!isInTransit && !showParcel && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.rebookButton}>
              <Rebook width={20} height={20} />
              <Text style={styles.rebookText}>Rebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rebookButton2}>
              <RaiseIssue width={20} height={20} />
              <Text style={styles.raiseText}>Raise Issue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Insured Parcel => Show Rebook, Cancel Order */}
        {!isInTransit && showParcel && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.rebookButton}>
              <Rebook width={22} height={22} />
              <Text style={styles.rebookText}>Rebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rebookButton2cancel}>
              <Text style={styles.raiseText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* View Less button for all non-In-Transit */}
        {!isInTransit && (
          <TouchableOpacity style={{ alignItems: "center", marginTop: 12 }}>
            <Text style={styles.lastView}>View Less</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    //  paddingHorizontal:20,
    backgroundColor: "#fff",
    marginTop: 25,
    // marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: "center",
     marginBottom: 40,
    width: Platform.select({
      ios: "100%",
      android: "100%",
      web: "50%",
      default: "40%",
    }),
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 0,
      web: 40,
      default: 10,
    }),
  },
  packageImagesContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  rows: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    gap: 24,
  },
  labelValuePair: {
    marginBottom: 12,
  },
  main: {
    padding: 10,
    paddingBottom: 40,
    backgroundColor: "#f8f8ff",
    // flex: 1,
    marginBottom: 40,
    marginHorizontal:10
    // paddingHorizontal:20
  },
  lastView: {
     width:'95%',
    paddingVertical: 15,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#093C31",
    borderRadius: 4,
    marginBottom: 30,
    marginHorizontal: 10,
    marginTop: 10,
    textAlign:'center'
  },
  packageImage: {
    width: 40,
    height: 40,
    backgroundColor: "#7e7575ff",
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: 20,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 14, fontWeight: "500", color: "#252525" },
  labeldata: { fontSize: 14, fontWeight: "500", color: "#252525" },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  parcel: { color: "#16A263", fontWeight: "bold", fontSize: 16 },
  packedparcel: {
    marginVertical: 20,
    backgroundColor: "#E7F5EC",
    padding: 15,
    marginHorizontal: 10,
  },
  value: { fontSize: 12, fontWeight: "400", color: "#5D5D5D" },
  para: { fontSize: 12, color: "#6D6D6D", marginHorizontal: 10 },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 16,
  },
  rebookButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6D6D6D",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rebookButton2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6D6D6D",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rebookButton2cancel: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6D6D6D",
    paddingHorizontal: 15,
    paddingVertical: 10.5,
    borderRadius: 5,
  },
  rebookText: {
    fontSize: 14,
    color: "#454545",
    // marginLeft: 6,
    fontWeight: 500,
  },
  raiseText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#454545",
    marginLeft: 6,
  },
  linkText: {
    color: "white",
    fontSize: 17,
    fontWeight: "400",
    backgroundColor: "#093C31",
    paddingHorizontal: 27,
    paddingVertical: 10,
    borderRadius: 4,
  },
  insuredTag: {
    position: "absolute",
    top: -20,
    left: -30,
    backgroundColor: "#EBFEED",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    transform: [{ rotate: "-20.6deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
  },
  line: {
    borderWidth: 0.3,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: Platform.select({
      ios: 20,
     android: 0,
      web: 40,
      default: 10,
    }),
  },
  title: { fontSize: 22, fontWeight: "bold" },
  // detailRow: {
  //   // borderWidth:1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   gap: 10,
  //   marginRight:16,

  // },
  // detailBox: {
  //   // backgroundColor:"pink",
  //   // borderWidth:1,
  //   paddingHorizontal:1,
  //   // flex: 1,
  //   paddingVertical: 20,
  //   gap: 10
  // },

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 20,

    flex: "wrap",
    // borderWidth:1
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 0,
      web: 40,
      default: 10,
    }),
  },
  TotalPrice: {
    flexDirection: "row",

    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    flex: "wrap",
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 0,
      web: 40,
      default: 10,
    }),
  },

  detailBoxLeft: {
    flex: 1,
    minWidth: "50%",
    paddingHorizontal: 10,
    // backgroundColor:"pink",
    // color: "#bf1616ff",20
  },
  detailBoxLeft: {
    flex: 1,
    minWidth: "50%",
    paddingHorizontal: 10,
    // backgroundColor:"pink",
    // color: "#bf1616ff",20
  },
  value1: {
    fontSize: 12,
    color: "#5D5D5D",
    fontWeight: "400",
    flexShrink: 1,
    flexWrap: "wrap",
  },

  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    //  width: "100%",   in thsi line Pickup Address and drop Address same line
    marginHorizontal: 10,
    columnGap: 10,
    // borderWidth:1
    // gap:20
  },

  addressBoxLeft: {
    // flex: 1,
    // minWidth: "70%",   in thsi line Pickup Address and drop Address same line
    flexWrap: "wrap",
    paddingHorizontal: Platform.select({
      ios: 20,
     android: 0,
      web: 40,
      default: 10,
    }),
  },
  addressBoxRight: {
    // flex: 1,
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 0,
      web: 40,
      default: 10,
    }),
    // minWidth: "50%",
    // flexWrap: "wrap",   in thsi line Pickup Address and drop Address same line
    // borderWidth:1
  },

  img: {
    marginHorizontal: 10,
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 0,
      web: 40,
      default: 10,
    }),
  },
  price: {},
});
