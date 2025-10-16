import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";

import { useEffect } from "react";

// import ArrowIcon from "../../../../assets/svgs/SVGIcons/ArrowIcon"
import ArrowIcon from "../../../assets/svgIcons/ArrowIcon";

// import Arrow2 from "../../../../assets/svgs/SVGIcons/Arrow2";
import Arrow2 from "../../../assets/svgIcons/Arrow2";

// import ClockIcon from "../../../../assets/svgs/SVGIcons/ClockIcon";
import ClockIcon from "../../../assets/svgIcons/ClockIcon";

// import CalenderIcon from "../../../../assets/svgs/SVGIcons/CalenderIcon";
import CalenderIcon from "../../../assets/svgIcons/CalenderIcon";

// import QuickBooking from "../../../../assets/svgs/SVGIcons/QuickBooking";
// import QuickBooking from "../../../assets/svgIcons";
import QuickBooking from "../../../assets/svgIcons/QuickBooking";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import HybridStorage from "../../../utils/helpers/HybridStorage";

const CourierBookingScreen = () => {
  const router = useRouter();

  const handleInstantBooking = () => {
    router.navigate("/(instantBooking)");
  };

  const handleScheduleBooking = ()=>{
    router.navigate("/(scheduleBooking)")
  }
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8ff" }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingRight: 10,
            marginTop: 35,
          }}
        >
          <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />
          <View style={styles.bookingRow}>
            <Pressable style={styles.bookCard} onPress={handleInstantBooking}>
              <View style={styles.plusicons}>
                <ClockIcon
                  width={Platform.select({ web: 28, default: 22 })}
                  height={Platform.select({ web: 28, default: 22 })}
                />
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Text style={styles.cardText}>Instant Booking</Text>
                <View style={styles.arrow}>
                  <ArrowIcon />
                </View>
              </View>
            </Pressable>

            <Pressable style={[styles.LightbookCard, styles.lightCard]} onPress={handleScheduleBooking}>
              <View style={{ marginVertical: 25 }}>
                <CalenderIcon
                  width={Platform.select({ web: 26, default: 20 })}
                  height={Platform.select({ web: 26, default: 20 })}
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
                <Text style={styles.darkText}>Schedule Booking</Text>
                <View style={styles.arrow2}>
                  <Arrow2 width={24} height={24} />
                </View>
              </View>
            </Pressable>
          </View>

          {/* <View style={{ width: "90%",marginTop:15 }}>
        <Pressable style={[styles.QuickBookingCard, styles.lightCard1]}>
          <View style={{ marginVertical: 25 }}>
            <QuickBooking width={Platform.select({web:32,default:30})} height={Platform.select({web:32,default:30})} />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
              alignItems: "center",
              marginTop:-13
            }}
          >
            <Text style={styles.darkText}>Quick booking</Text>
            <View style={styles.arrow}>
              <Arrow2 width={24} height={24} />
            </View> */}

          {/* </View>
          <Text
            style={{
              color: "#6D6D6D",
              fontSize: 9,
              fontWeight: "400",
              marginLeft: -20,
              marginTop: 1,
            }}
          >
            Instant bike courier under 5 kg
          </Text>
        </Pressable>
      </View> */}
          {/* QUICK BOOKING END */}

          {/* INFORMATION START*/}
          <View
            style={{
              marginTop: 16,
              marginLeft: 10,
              paddingHorizontal: Platform.select({ web: 50 }),
            }}
          >
            <Text style={styles.InfoHeaderText}>Instant Booking</Text>
            <Text style={styles.InfoBodyText}>
              Lorem ipsum dolor sit amet consectetur. Nibh mauris sit tellus
              fermentum. Enim pulvinar vulputate risus arcu diam fusce neque
              gravida donec. Urna pellentesque ut gravida sagittis tempor nullam
              commodo. Egestas{" "}
            </Text>

            <Text style={styles.InfoHeaderText}>Schedule Booking</Text>
            <Text style={styles.InfoBodyText}>
              Lorem ipsum dolor sit amet consectetur. Nibh mauris sit tellus
              fermentum. Enim pulvinar vulputate risus arcu diam fusce neque
              gravida donec. Urna pellentesque ut gravida sagittis tempor nullam
              commodo. Egestas{" "}
            </Text>

            {/* <Text style={styles.InfoHeaderText}>Quick Booking</Text>
        <Text style={styles.InfoBodyText}>Lorem ipsum dolor sit amet consectetur. Nibh mauris sit tellus fermentum. Enim pulvinar vulputate risus arcu diam fusce neque gravida donec. Urna pellentesque ut gravida sagittis tempor nullam commodo. Egestas  </Text> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourierBookingScreen;

const styles = StyleSheet.create({
  bookingtext: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
  },
  bookingRow: {
    marginTop: 15,
    // borderWidth:1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", //android
    // justifyContent:"center", //ios
    gap: 20, //ios

    // width:Platform.select({web:"60%",}),
    paddingLeft: Platform.select({ web: 50 }),
    paddingRight: Platform.select({ web: 50 }),
    marginLeft: 10,
  },
  bookCard: {
    // borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#454545",
    borderRadius: 8,
    paddingHorizontal: Platform.select({ web: 90, default: 10 }),
    paddingVertical: 18,
  },
  lightCard: {
    paddingHorizontal: Platform.select({ web: 90, default: 3 }),
    backgroundColor: "#E7E7E7",
    elevation: 4,
  },
  lightCard1: {
    paddingHorizontal: Platform.select({ web: 90, default: 20 }),
    backgroundColor: "#E7E7E7",
    elevation: 4,
  },

  plusicons: {
    // borderWidth:1,
    // backgroundColor:"yellow",
    marginVertical: 25,
  },
  cardText: {
    marginTop: 5,
    color: "#f6f6f6",
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
  arrow2: {
    // borderWidth:1,
    marginLeft: -4,
    marginTop: 7,
  },
  LightbookCard: {
    // borderWidth:1,
    // flexBasis:"30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#454545",
    borderRadius: 8,
    // paddingHorizontal:1,
    // paddingVertical: 18,
  },
  QuickBookingCard: {
    // borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#454545",
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 18,
    alignSelf: "flex-start",
    marginLeft: Platform.select({ web: 242 }),
  },
  InfoHeaderText: {
    textAlign: Platform.select({ web: "center", default: "left" }),
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  InfoBodyText: {
    paddingHorizontal: 20,
    textAlign: Platform.select({ web: "center" }),
    fontSize: Platform.select({ web: 14, default: 12 }),
    fontWeight: 400,
    marginTop: 5,
    color: "#6D6D6D",
    lineHeight: 21,
  },
});
