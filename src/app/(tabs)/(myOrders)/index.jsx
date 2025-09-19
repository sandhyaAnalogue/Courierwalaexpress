import { Stack, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookingIcon from "../../../../BookingIcon/BooingIcon";
import Rebook from "../../../../Rebook/Rebook";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import TextStyles from "../../TextStyles/TextStyles";

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
  {
    id: "CW254617",
    status: "Delivered",
    date: "13-05-2025",
    type: "Electronics",
  },
];
//dynamic colors getStatusStyle
// const getStatusStyle = (status) => {
//   switch (status.toLowerCase()) {
//     case 'In-Transit':
//       return {
//         backgroundColor: '#E7E7E7',
//         color: '#252525',
//         borderWidth: 1,
//         //  borderColor: '#252525',
//       };
//     case 'Awaiting pickup':
//       return {
//        backgroundColor: '#E7E7E7',
//         color: '#eee',
//         borderWidth: 1,
//         // justifyContent:'center',
//         // alignItems:'center'
//         //  borderColor: '#252525',
//       };
//     case 'cancelled':
//       return {
//         backgroundColor: '#e7210fff',
//         color: '#eee',
//       borderWidth: 0
//       };
//     case 'delivered':
//       return {
//         backgroundColor: '#3ea340ff',
//         color: '#eee',
//       borderWidth: 0
//       };
//     default:
//       return {
//         backgroundColor: '#eee',
//         color: '#333',
//         borderColor: '#ccc',
//       };
//   }
// };

export default function MyOrders() {
  const router = useRouter();
  const inserts = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      // showsVerticalScrollIndicator={false}
    >
      <Stack.Screen
        options={{
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "#f8f8ff",
                  paddingTop: inserts.top + 30,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => router.replace("/Home")}
                  style={{
                    backgroundColor: "#d7d7dcff",
                    padding: 6,
                    borderRadius: 16,
                    marginLeft: 15,
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
                  fontSize: 14,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  borderRadius: 20,
                  borderWidth:
                    order.status === "Cancelled"
                      ? 0
                      : order.status === "Delivered"
                      ? 0
                      : 1,
                  borderColor: "#000000",
                  color:
                    order.status === "Cancelled"
                      ? "#FFFFFF"
                      : order.status === "Delivered"
                      ? "#FFFFFF"
                      : "#252525",

                  fontWeight: "500",
                  flexWrap: "wrap",
                  textAlign: "center",
                  backgroundColor:
                    order.status === "Cancelled"
                      ? "#FF0000"
                      : order.status === "Delivered"
                      ? "#3ea340"
                      : "#e5ecf0ff",
                }}
              >
                {order.status}
              </Text>
            </View>

            {order.status === "Awaiting pickup" && (
              <View style={styles.insuredTag}>
                <Text style={[TextStyles.STYLE_1_A22]}>Insured parcel</Text>
              </View>
            )}
          </View>

          {/* Middle Row: Date + Type */}
          <View style={[styles.rowBetween, { marginTop: 12 }]}>
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
              <Rebook width={24} height={24} />
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
    backgroundColor: "#f8f8ff",
    // flex:1,
    marginBottom: 40,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    marginTop: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    color: "#252525",
    fontWeight: "500",
  },
  labels: {
    fontSize: 14,
    color: "#252525",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#6D6D6D",
    fontWeight: "500",
  },
  //  status: {
  //   fontSize: 14,
  //   paddingHorizontal: 15,
  //   paddingVertical: 6,
  //  backgroundColor: '#E7E7E7',
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   borderColor: '#000000',
  //   color: '#252525',
  //   fontWeight: '500',
  //  // maxWidth: 90,
  //   flexWrap: 'wrap',
  //    // lineHeight: 18,
  //    textAlign: 'center',

  // },
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
    fontSize: 14,
    color: "#6D6D6D",
    marginLeft: 6,
    paddingHorizontal: 10,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#454545",
    //paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  insuredTag: {
    position: "absolute",
    top: -18,
    left: -46,
    backgroundColor: "#EBFEED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    transform: [{ rotate: "-34.6deg" }],
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
