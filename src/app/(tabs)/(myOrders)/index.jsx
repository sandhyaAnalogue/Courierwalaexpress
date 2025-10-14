import { Stack, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookingIcon from "../../../assets/svgIcons/BooingIcon";
import Rebook from "../../../assets/svgIcons/Rebook";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
// import TextStyles from "../../TextStyles/TextStyles";
import { Platform } from "react-native";
// data
const orders = [
  {
    id: "CW254614",
    status: "In-Transit",
    date: "13-05-2025",
    type: "Electronics",
  },
  {
    id: "CW254615",
    status: "Awaiting pickup",
    date: "13-05-2025",
    type: "Electronics",
  },
  {
    id: "CW254616",
    status: "Cancelled",
    date: "13-05-2025",
    type: "Electronics",
  },
]

export default function MyOrders() {
  const router = useRouter();
  const inserts = useSafeAreaInsets();

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
      {orders.map((order, index) => (
        <View style={styles.container} key={index}>
          {/* Top Row: Icon + ID + Status */}
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.iconWrapper}>
                <BookingIcon width={16} height={16} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.label}>Booking ID</Text>
                <Text style={styles.value}>{order.id}</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  maxWidth: 100,
                  fontSize: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  borderRadius: 25,
                  borderWidth:
                    order.status === "Cancelled"
                      ? 0:1,
                      
                  borderColor: "#000000",
                  color:
                    order.status === "Cancelled"
                      ? "#FFFFFF":'#252525',
                      // : order.status === "Delivered"
                      // ? "#FFFFFF"
                      // : "#252525",

                  fontWeight: "500",
                  flexWrap: "wrap",
                  textAlign: "center",
                  backgroundColor:
                    order.status === "Cancelled"
                      ? "#FF0000"
                      : order.status === "Delivered"
                      ? "#FFFFFF"
                      : "#e5ecf0ff",
                }}
              >
                {order.status}
              </Text>
            </View>

            {order.status === "Awaiting pickup" && (
              <View style={styles.insuredTag}>
                <Text>Insured parcel</Text>
              </View>
            )}
          </View>

          {/* Middle Row: Date + Type */}
          <View style={[styles.rowBetween2, { marginTop: 12 }]}>
            <View>
              <Text style={styles.labels}>Booking Date</Text>
              <Text style={styles.value}>{order.date}</Text>
            </View>
            <View>
              <Text style={styles.labels}>Courier Type</Text>
              <Text style={styles.value}>{order.type}</Text>
            </View>
          </View>

          {/* Bottom Row: Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.rebookButton}>
              <Rebook width={20} height={20} />
              <Text style={styles.rebookText}>Rebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.navigate(`/(myOrders)/${order.id}`)}
            >
              <Text style={styles.linkText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  main: {
    padding: 10,
    paddingBottom: 30,
     backgroundColor: "#F8F8ff",
    //  backgroundColor: Platform.select({
    // ios: "100%",
    // android: "100%",
    // web: "40%",
    // default: "40%", 
    
  // }),
    //  flex:1,
      alignSelf: "center",
    marginBottom: 40,
    // marginTop:10,
      width: Platform.select({
    ios: "100%",
    android: "100%",
    web: "50%",
    default: "40%", 
    
  }),

  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    marginTop: 20,
     marginBottom:10,
    marginHorizontal: 10,
  },
  iconWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: 20,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    // borderWidth:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 4,
    // marginRight:20,
  },
  rowBetween2: {
    // borderWidth:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    // marginRight:20,
  },
  label: {
    fontSize: 14,
    color: "#252525",
    fontWeight: "500",
  },
  
  labels: {
    //  borderWidth:1,
    fontSize: 14,
    color: "#252525",
    fontWeight: "500",
  },
  value: {
    //  borderWidth:1,
    fontSize: 12,
    color: "#6D6D6D",
    fontWeight: "500",
    marginLeft:2,
  },
 
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    // marginVertical:10,
    // marginHorizontal:20,
    // padding:10,
    gap: 20,
  },
  rebookButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rebookText: {
    // borderWidth:1,

    fontSize: 14,
    color: "#6D6D6D",
    // marginLeft: ,
    paddingHorizontal: 10,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#093C31",
    //paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  insuredTag: {
    // borderWidth:1,
    position: "absolute",
    top: -22,
    left: -40,
    backgroundColor: "#EBFEED",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    transform: [{ rotate: "-24.6deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
  },
  insuredText: {
    color: "#252525",
    fontSize: 12,
    fontWeight: "500",
  },
});
