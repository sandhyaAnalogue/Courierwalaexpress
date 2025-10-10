import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BooingIcon from "../../../../assets/svgIcons/BooingIcon";
import DownLoadIcon from "../../../../assets/svgIcons/DownLoadIcon"

// import RaiseIssue from '../../../assets/svgIcons/RaiseIssueIcon';
// import Rebook from '../../../assets/svgIcons/Rebook';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

// import TextStyles from '../../TextStyles/TextStyles';
// import dummyData from '../../../../src/dummyData';
import img1 from "../../../../assets/svgIcons/img1";
import img2 from "../../../../assets/svgIcons/img2";
import img3 from "../../../../assets/svgIcons/img3";
import img4 from "../../../../assets/svgIcons/img4";
import img5 from "../../../../assets/svgIcons/img5";
import { Download } from "react-feather";
import CourierTypeDropDown from "../../../../customComponents/courierTypeDropDown";
import ChatIcon from "../../../../assets/svgIcons/ChatIcon";
import PhCallIcon from "../../../../assets/svgIcons/PhCallIcon";
import Stepper from "../../../../customComponents/Stepper";

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

const cancelReasons = [
  { label: "Found a better price", value: "better_price" },
  { label: "Ordered by mistake", value: "mistake" },
  { label: "Delivery takes too long", value: "delivery_time" },
  { label: "Changed my mind", value: "changed_mind" },
  { label: "Other", value: "other" },
];

export default function ordersDetailsScreen() {
  const { id } = useLocalSearchParams();
  const inserts = useSafeAreaInsets();
  const [selectedSize, setSelectedSize] = useState(null);
  // const inserts = useSafeAreaInsets();
  // const router = useRouter();
  // const orders = orders[0].find(o => o.bookingId === id);

  // if (!orders) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>orders not found</Text>
  //     </View>
  //   );
  // }

  const statusLower = orders[0].status.toLowerCase();
  const isInTransit = statusLower === "in-transit";
  const isCancelled = statusLower === "cancelled";
  const isAwaitingPickup = statusLower === "awaiting pickup";

  const showParcel = isInTransit || isAwaitingPickup;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8ff" }}>
      <ScrollView>
        <View>
          <View style={styles.container}>
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

            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <BooingIcon width={18} height={18} />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.label}>Booking ID</Text>
                  <Text style={styles.value}>{orders[0].bookingId}</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    maxWidth: 100,
                    //   bordersWidth:1,
                    fontSize: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 11,
                    backgroundColor: "#D1D1D1",
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
              </View>

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
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Pickup Address</Text>
                <Text style={[styles.value1, { flexShrink: 1 }]}>
                  {orders[0].pickupAddress}
                </Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.labeldata6}>Drop Address</Text>
                <Text style={[styles.value1, { flexShrink: 1 }]}>
                  {orders[0].dropAddress}
                </Text>
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.imagedata}>Package images</Text>
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
                <View>
                  <TouchableOpacity>
                    <DownLoadIcon/>
                    <Text
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 50,
                        paddingVertical: 10,
                        borderRadius: 8,
                        backgroundColor: "#252525",
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      Download Invoice
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {showParcel && (
              <View style={styles.packedparcel}>
                <Text style={styles.parcel}>This parcel is insured</Text>
                <Text style={{ color: "#6D6D6D" }}>Covered: ₹20,000</Text>
              </View>
            )}

            <View style={styles.line}></View>

            <View style={styles.detailRow}>
              <View style={styles.price}>
                <Text style={styles.amount}>Total Amount</Text>
              </View>
              <View style={styles.price}>
                <Text style={styles.amount}>₹{orders[0].totalAmount}</Text>
              </View>
            </View>

            <View style={{ marginTop: -10, marginBottom: 10 }}>
              <Text style={styles.para} numberOfLines={2}>
                * Final Price may vary after physical {"\n"}
                <Text></Text> verification during pickup
              </Text>
            </View>
          </View>

          {/* CANCEL-ORDER-START */}
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <CourierTypeDropDown
              data={cancelReasons}
              placeholder="Cancel Orders"
              onSelect={(item) => setSelectedSize(item)}
              textStyle={{
                textAlign: "center",
                color: "#000000",
                fontWeight: "600",
                paddingleft: 40,
              }}
            />
          </View>
          {/* CANCEL-ORDER-END */}

          {/* CALL&CHAT START */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.name}>Rajesh kumar</Text>
                <Text style={styles.phone}>+91 4561232122</Text>
              </View>

              <View style={{ alignItems: "flex-end", flex: 1 }}>
                <TouchableOpacity style={styles.callButton}>
                  <PhCallIcon />
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
                <Text style={styles.arrivalText}>Arrives in 30min</Text>
              </View>
            </View>

            {/* Chat Button */}
            <TouchableOpacity style={styles.chatButton}>
              <ChatIcon />
              <Text style={styles.chatText}>Chat</Text>
            </TouchableOpacity>
          </View>
          {/* CALL&CHAT END */}

          {/* STEPPER-START */}
          <Stepper />
          {/* STEPPER-END */}

          {/* LIVE-TRACKING START */}
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#252525" }}>
              Live Tracking
            </Text>
          </View>
          {/* LIVE-TRACKING END */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 21,
    elevation: 5,
    borderRadius: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packageImagesContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 12,
    flexWrap: "wrap",
    gap: 10,
    // borderWidth:1,
    // marginBottom:12,
  },
  detailRow: {
    // flexDirection: 'row',
    justifyContent: "space-between",
  },
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
    // marginRight:27
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
    marginTop: 10,
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
  packedparcel: { marginVertical: 15, backgroundColor: "#E7F5EC", padding: 15 },
  // value: { fontSize: 10, color: '#5D5D5D', fontWeight: '500',paddingLeft:2, },
  para: { fontSize: 12, color: "#6D6D6D", marginTop: 10, marginHorizontal: 10 },

  line: { borderBottomWidth: 0.2 },
  title: { fontSize: 22, fontWeight: "bold" },
  detailRow: {
    // bordersWidth:1,
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
  price: {},

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 6,
    // backgroundColor:'red'
  },
  dropdownContainer: {
    marginBottom: 200,
    borderWidth: 1,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButton2: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#6D6D6D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 12,
    color: "#252525",
    fontWeight: "500",
  },
  placeholderText: {
    color: "#888888",
    fontWeight: "400",
    //  textAlign: 'left',
    fontSize: 12,
  },
  placeholderText2: {
    color: "#e6dfdfff",
    fontWeight: "400",
    fontSize: 12,
    //  textAlign: 'left',
    gap: 10,
  },

  dropdownIcon: {},
  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 8,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  card: {
    borderWidth: 0.2,
    // borderColor: '#007aff',
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
    // margin: 10,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#000000",
  },
  phone: {
    fontSize: 10,
    color: "#5D5D5D",
    fontWeight: "500",
  },
  callButton: {
    backgroundColor: "#252525",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  callText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 12,
  },
  arrivalText: {
    fontSize: 12,
    color: "#5D5D5D",
    marginTop: 6,
    fontWeight: "500",
  },
  chatButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 8,
    fontWeight: 500,
  },
});
