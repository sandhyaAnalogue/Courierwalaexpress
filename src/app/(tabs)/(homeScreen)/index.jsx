import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import Arrow2 from "../../../assets/svgIcons/Arrow2";
import ArrowIcon from "../../../assets/svgIcons/ArrowIcon";
import DeliveredIcon from "../../../assets/svgIcons/DeliveredIcon";
import OrderIcon from "../../../assets/svgIcons/OrderIcon";
import PlusIcon from "../../../assets/svgIcons/PlusIcon";
import RiderIcon from "../../../assets/svgIcons/RiderIcon";
import TransitIcon from "../../../assets/svgIcons/TransitIcon";
import Curousel from "../../../components/Curousel";
import HybridStorage from "../../../utils/helpers/HybridStorage";
import { bookingDetailsApi } from "../../../services/apiCalls";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import { useState } from "react";
import PersonIcon from "../../../assets/svgIcons/icons/PersonIcon";
import BellIcon from "../../../assets/svgIcons/BellIcon";
import CustomModal from "../../../components/CustomModal";

const Home = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();
  const [rideModalVisible, setRideModalVisible] = useState(false);
  const [userName, setUserName] = useState();
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await HybridStorage.getItem("profileInfo");
      console.log(profile.name, "retrieved profile");
      setUserName(profile.name);
    };
    fetchProfile();
  }, []);

  //BOOKING-DETAILS API
  useEffect(() => {
    const bookingDetails = async () => {
      try {
        const res = await bookingDetailsApi();
        console.log("BOOKING-DETAILS", res?.data.bookings);
        setAllBookings(res?.data.bookings);
      } catch (error) {
        console.log(error.response, "error from all bookings");
      }
    };
    bookingDetails();
  }, []);

  const handleBookings = () => {
    router.push("(tabs)/(homeScreen)/bookCourier");
  };

  const handleRide = () => {
    setRideModalVisible(true);
  };

  const ordersData = [
    {
      id: 1,
      title: "Total orders",
      count: 10,
      icon: (
        <OrderIcon
          width={Platform.select({ web: 30, android: 24 })}
          height={Platform.select({ web: 30, android: 24 })}
        />
      ),
    },
    {
      id: 2,
      title: "In Transit",
      count: 2,
      icon: (
        <TransitIcon
          width={Platform.select({ web: 30, android: 24 })}
          height={Platform.select({ web: 30, android: 24 })}
        />
      ),
    },
    {
      id: 3,
      title: "Delivered",
      count: 12,
      icon: (
        <DeliveredIcon
          width={Platform.select({ web: 30, android: 24 })}
          height={Platform.select({ web: 30, android: 24 })}
        />
      ),
    },
  ];

  const recentBookings = [
    {
      id: "CW254614",
      type: "Electronics",
      status: "Delivered",
    },
    {
      id: "CW254615",
      type: "Documents",
      status: "In Transit",
    },
    {
      id: "CW254616",
      type: "Clothes",
      status: "Pending",
    },
  ];

  return (
    <View
      style={{ flex: 1, backgroundColor: "#f8f8ff", paddingHorizontal: 15 }}
    >
      <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#252525",
                        padding: 6,
                        borderRadius: 20,
                        marginLeft: 15,
                        borderWidth: 1,
                      }}
                    >
                      <PersonIcon width={24} height={24} fill="white" />
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
                      {userName}
                    </Text>
                  </View>
                  <View style={{ marginRight: 30 }}>
                    <BellIcon width={22} height={22} />
                  </View>
                </View>
              );
            },
          }}
        />

        <View style={styles.container}>
          {/* BANNER-START */}
          <View style={styles.slider}>
            <Curousel styleImg={styles.img} />
          </View>
          {/* BANNER-END */}

          <View style={styles.bookingModes}>
            <Text style={styles.bookingtext}>Booking Modes</Text>

            <View style={styles.bookingRow}>
              <Pressable style={styles.bookCard} onPress={handleBookings}>
                <View style={styles.plusicons}>
                  <PlusIcon
                    width={Platform.select({ web: 28, default: 20 })}
                    height={Platform.select({ web: 28, default: 20 })}
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.cardText}>Book Courier</Text>
                  <View style={styles.arrow}>
                    <ArrowIcon width={20} height={20} />
                  </View>
                </View>
              </Pressable>

              <Pressable
                style={[styles.bookCard, styles.lightCard]}
                onPress={handleRide}
              >
                <View style={{ marginVertical: 25 }}>
                  <RiderIcon
                    width={Platform.select({ web: 38, default: 28 })}
                    height={Platform.select({ web: 38, default: 28 })}
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.darkText}>Book a ride</Text>
                  <View style={styles.arrow}>
                    <Arrow2 width={24} height={24} />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>

          {/* TOTAL ORDERS */}
          <View style={styles.totalOrdesContainer}>
            <Text style={styles.totalOrderText}>Total orders</Text>

            <View style={styles.totalOrderGridContainer}>
              {ordersData.map((item) => (
                <Pressable key={item.id} style={styles.gridCard}>
                  {item.icon}
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.count}>{item.count}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View
            style={{
              marginTop: Platform.select({ web: 50, default: 20 }),
              alignContent: Platform.select({ web: "center" }),
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: Platform.select({ web: 20, default: 16 }),
                fontWeight: "500",
                textAlign: Platform.select({ web: "center", default: "left" }),
              }}
            >
              Recent bookings
            </Text>
            {allBookings.map((booking, index) => (
              <View key={index} style={styles.bookingCard}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <View style={styles.Bookingordericon}>
                    <OrderIcon width={15} height={15} />
                  </View>

                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingId}>Booking ID</Text>
                    <Text style={styles.bookingValue}>{booking.bookingId}</Text>
                  </View>
                </View>

                <View style={styles.CourierInfo}>
                  <Text style={styles.bookingId1}>Courier Type</Text>
                  <Text style={styles.bookingValue1}>
                    {booking.courierType}
                  </Text>
                </View>

                <Pressable
                  style={styles.detailsBtn}
                  onPress={() =>
                    router.navigate(
                      `/(instantBooking)/bookingDetails?booking=${encodeURIComponent(
                        JSON.stringify(booking)
                      )}`
                    )
                  }
                >
                  <Text style={styles.detailsBtnText}>View Details</Text>
                </Pressable>
              </View>
            ))}
          </View>

          <CustomModal
            visible={rideModalVisible}
            onClose={() => setRideModalVisible(false)}
            title="Select Ride Type"
            text="sdfghjrtyucvb"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
    // borderWidth:1,
    marginTop: 15,
  },
  slider: {
    marginTop: Platform.select({
      web: 10,
    }),
    //  marginTop: 10,
    // borderWidth: 1,
    paddingLeft: 5,
    // width:"90%"
  },
  img: {
    // borderRadius:10,
  },
  bookingModes: {
    // borderWidth:1,
    marginTop: Platform.select({
      web: 30,
      android: 30,
    }),
  },
  bookingtext: {
    textAlign: Platform.select({
      web: "center",
    }),
    fontSize: Platform.select({ web: 20, default: 16 }),
    fontWeight: "500",
    marginTop: 10, //android
    marginTop: 20, // iOS tweak: more spacing
  },
  bookingRow: {
    // borderWidth:1,
    display: "flex",
    flexDirection: "row",
    gap: Platform.select({
      web: 20,
      android: 20, /////testing change before 12
    }),
    // gap:10,
    // justifyContent: "space-between",//android
    marginTop: 10, // iOS tweak: spacing
    justifyContent: "center", // center the cards in the row
  },
  bookCard: {
    // borderWidth:1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#454545",
    borderRadius: 8,
    paddingHorizontal: Platform.select({
      web: 100,
      android: 22,
    }),
    // paddingHorizontal:22,
    paddingVertical: 18,
    // marginRight: 10,               // iOS tweak: spacing between cards
    shadowColor: "#000", // iOS tweak: shadow
    shadowOffset: { width: 0, height: 2 }, // iOS tweak
    shadowOpacity: 0.15, // iOS tweak
    shadowRadius: 4, // iOS tweak
  },
  lightCard: {
    backgroundColor: "#E7E7E7",
    elevation: 4,
    shadowColor: "#000", // iOS tweak: lighter shadow
    shadowOffset: { width: 0, height: 1 }, // iOS tweak
    shadowOpacity: 0.08, // iOS tweak
    shadowRadius: 3, // iOS tweak
  },
  plusicons: {
    marginVertical: 25,
  },
  cardText: {
    marginTop: 5,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  darkText: {
    marginTop: 5,
    color: "#252525",
    fontSize: 14,
    fontWeight: "500",
  },
  arrow: {
    // borderWidth:2,
    marginTop: 7,
  },

  totalOrdesContainer: {
    marginTop: 20,
  },
  totalOrderText: {
    textAlign: Platform.select({
      web: "center",
    }),
    marginVertical: Platform.select({
      web: 15,
    }),
    fontSize: Platform.select({ web: 20, default: 16 }),
    fontWeight: "500",
  },
  totalOrderGridContainer: {
    // borderWidth:1,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Platform.select({
      web: 10,
      android: 18, ///testing change before 6
    }),
    marginTop: 10,

    // paddingLeft: 5,
    // paddingRight: 5,
  },
  gridCard: {
    //  borderWidth:1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Platform.select({
      web: 35,
      android: 12,
    }),

    backgroundColor: "#E7E7E7",
    elevation: 5,
    borderRadius: 8,
    // minWidth: 100,
  },
  title: {
    color: "#5D5D5D",
    // borderWidth:1,
    fontWeight: 400,
    fontSize: 12,
    marginTop: Platform.select({
      web: 20,
      android: 10,
    }),
    marginBottom: Platform.select({ web: 20 }),
    fontSize: 15,
    textAlign: "center",
  },
  count: {
    fontSize: Platform.select({
      web: 18,
      default: 12,
    }),
    fontWeight: "500",
    // fontSize:12,
    color: "#000000",
    marginTop: 5,
  },
  bookingsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookingCard: {
    // borderWidth:1,
    marginLeft: Platform.select({ web: 200, android: 5 }),
    marginRight: Platform.select({ web: 200, android: 5 }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",

    borderRadius: 5,

    // // iOS shadow
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,h

    // Android shadow
    elevation: 3,
    // overflow: "hidden",
  },
  Bookingordericon: {
    // borderWidth: 1,
    padding: 8,
    borderRadius: 20,
    marginBottom: 13,
    marginLeft: -8,
    backgroundColor: "#E7E7E7",
  },
  bookingId: {
    // borderWidth:1,
    fontSize: 14,
    marginLeft: Platform.select({
      web: 15,
      android: 2,
    }),
    fontWeight: "500",
    color: "#252525",
  },
  bookingValue: {
    // borderWidth:1,
    fontSize: 12,
    marginLeft: Platform.select({
      web: 15,
      android: 2,
    }),
    color: "#6D6D6D",
    fontWeight: "500",
  },
  bookingId1: {
    fontWeight: "500",
    fontSize: 14,
    color: "#252525",
  },
  bookingValue1: {
    color: "#6D6D6D",
    fontWeight: "500",
    fontSize: 12,
  },
  detailsBtn: {
    // borderWidth: 1,
    backgroundColor: "#093C31",
    borderRadius: 5,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  detailsBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12, ///////////once ask 10 or 12
  },
  CourierInfo: {
    // borderWidth:1,
    marginTop: -10,
    marginHorizontal: 5,
  },
});
