import { useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DownLoadIcon from "../../../../assets/svgIcons/DownLoadIcon";

// import RaiseIssue from '../../../assets/svgIcons/RaiseIssueIcon';
// import Rebook from '../../../assets/svgIcons/Rebook';
import Feather from "@expo/vector-icons/Feather";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { useRouter } from "expo-router";

// import TextStyles from '../../TextStyles/TextStyles';
// import dummyData from '../../../../src/dummyData';
import ChatIcon from "../../../../assets/svgIcons/ChatIcon";
import img1 from "../../../../assets/svgIcons/img1";
import img2 from "../../../../assets/svgIcons/img2";
import img3 from "../../../../assets/svgIcons/img3";
import img4 from "../../../../assets/svgIcons/img4";
import img5 from "../../../../assets/svgIcons/img5";
import PhCallIcon from "../../../../assets/svgIcons/PhCallIcon";
import CourierTypeDropDown from "../../../../components/courierTypeDropDown";
import Stepper from "../../../../components/Stepper";
import BooingIcon from "../../../../assets/svgIcons/BooingIcon";
import CancelOrderDropDown from "../../../../components/cancelOrderDropDown"

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
  const router = useRouter();
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

  // DOWNLOAD-INVOICE START
  const handleDownload = async () => {
  try {
    const order = orders[0];

    const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              line-height: 1.6;
              color: #333;
              max-width: 100%;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 15px;
            }
            .section {
              margin-bottom: 20px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .label {
              font-weight: bold;
              width: 40%;
              color: #252525;
            }
            .value {
              flex: 1;
              text-align: left;
              color: #6D6D6D;
            }
            .total-row {
              margin-top: 25px;
              padding-top: 15px;
              border-top: 2px solid #333;
              font-weight: bold;
              font-size: 18px;
              background-color: #f8f8f8;
              padding: 15px;
              border-radius: 5px;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #ddd;
              padding-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>INVOICE</h1>
            <h3>Booking ID: ${order.bookingId}</h3>
            <p>Status: ${order.status}</p>
          </div>

          <div class="section">
            <h3>Package Details</h3>
            <div class="row">
              <div class="label">Item Name:</div>
              <div class="value">${order.itemName}</div>
            </div>
            <div class="row">
              <div class="label">Courier Type:</div>
              <div class="value">${order.courierType}</div>
            </div>
            <div class="row">
              <div class="label">Dimensions & Weight:</div>
              <div class="value">${order.dimensions}</div>
            </div>
            <div class="row">
              <div class="label">Booking Mode:</div>
              <div class="value">${order.bookingMode}</div>
            </div>
          </div>

          <div class="section">
            <h3>Timeline</h3>
            <div class="row">
              <div class="label">Booking Date:</div>
              <div class="value">${order.date}</div>
            </div>
            <div class="row">
              <div class="label">Booking Time:</div>
              <div class="value">${order.bookingTime}</div>
            </div>
            <div class="row">
              <div class="label">Pickup Date:</div>
              <div class="value">${order.pickupdate}</div>
            </div>
            <div class="row">
              <div class="label">Pickup Time:</div>
              <div class="value">${order.pickupTime}</div>
            </div>
          </div>

          <div class="section">
            <h3>Address Details</h3>
            <div class="row">
              <div class="label">Pickup Address:</div>
              <div class="value">${order.pickupAddress}</div>
            </div>
            <div class="row">
              <div class="label">Drop Address:</div>
              <div class="value">${order.dropAddress}</div>
            </div>
          </div>

          <div class="section">
            <h3>Recipient Details</h3>
            <div class="row">
              <div class="label">Recipient Name:</div>
              <div class="value">${order.reciepientName}</div>
            </div>
            <div class="row">
              <div class="label">Recipient Number:</div>
              <div class="value">${order.reciepientNumber}</div>
            </div>
          </div>

          <div class="total-row">
            <div class="row">
              <div class="label">Total Amount:</div>
              <div class="value">₹${order.totalAmount}</div>
            </div>
          </div>

          <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p>* Final price may vary after physical verification during pickup</p>
          </div>
        </body>
      </html>
    `;

    // Generate PDF with better configuration
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
      width: 595, // A4 width in points
      height: 842, // A4 height in points
    });

    console.log('PDF generated at:', uri);

    // Check if sharing is available
    const isSharingAvailable = await Sharing.isAvailableAsync();
    
    if (isSharingAvailable) {
      // Share the PDF
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Download Invoice',
        UTI: 'com.adobe.pdf'
      });
    } else {
      // Fallback: Show alert with file path
      alert(`PDF generated successfully!\nFile saved at: ${uri}`);
    }

  } catch (error) {
    console.error("Error generating PDF: ", error);
    alert("Failed to generate PDF. Please try again.");
  }
};

  // DOWNLOAD-INVOICE END

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8ff" }}>
      <ScrollView>
        <View style={{backgroundColor:"#f8f8ff",}}>
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
              <View style={[styles.row]}>
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
                <Text style={styles.labeldata}>Booking Time</Text>
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
                <Text style={styles.labeldata}>Booking Mode</Text>
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
                <Text style={styles.labeldata}>Item Name</Text>
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
                <Text style={styles.labeldata}>Pickup Time</Text>
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
                <Text style={styles.labeldata}>Recipient Number</Text>
                <Text style={styles.value}>{orders[0].reciepientNumber}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              {/* Pickup Address & Drop Address */}
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Pickup Address</Text>
                <Text style={styles.value1}>{orders[0].pickupAddress}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.labeldata}>Drop Address</Text>
                <Text style={styles.value1}>{orders[0].dropAddress}</Text>
              </View>
            </View>

            {/* <View>
        <Text style={styles.imagedata}>Package images</Text>
        <View><TouchableOpacity>
          <View><Download /></View>
          <Text>DownloadText</Text>
          </TouchableOpacity></View>
      </View> */}
            {/*         
    <View style={styles.packageImagesContainer}>
  {Array.isArray(orders[0].packageImages) && orders[0].packageImages.map((imgObj, i) => {
    const SvgComponent = imgObj.SvgComponent;
    return (
      <View key={i} style={{ alignItems: 'center', marginRight: 1 }}>
        <SvgComponent width={20} height={20} />
        <Text style={{ fontSize: 10, color: '#444' }}>{imgObj.title}</Text>
      </View>
    );
  })}
</View> */}

            {/* {(isCancelled || isAwaitingPickup) && (
              <View>
                <Text style={styles.para} numberOfLines={2}>
                  *Final Price may vary after physical {"\n"}
                  verification during pickup
                </Text>
              </View>
            )} */}

            {/* <View style={styles.detailRow}>
              <View style={styles.price}>
                <Text style={styles.amount}>Total Amount</Text>
              </View>
              <View style={styles.price}>
                <Text style={styles.amount}>₹{orders[0].totalAmount}</Text>
              </View>
                      
            </View> */}

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{}}>
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
                </View>
                <View style={styles.downloadContainer}>
                  <TouchableOpacity onPress={handleDownload}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        paddingVertical: 13,
                        gap: 3,
                      }}
                    >
                      <DownLoadIcon />

                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 12,
                          fontWeight: "500",
                        }}
                      >
                        Download Invoice
                      </Text>
                    </View>
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
            <CancelOrderDropDown
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

          <Pressable onPress={router.navigate("/screens/paymentMethodScreen")}>
            <Text>Payent</Text>
          </Pressable>
        </View>
      </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 21,
    elevation: 5,
    borderRadius: 10,
    // borderWidth:1,
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailRow: {
    // borderWidth:1,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start", // Align text boxes from top
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
    flex: "wrap", // ✅ correct way to allow wrapping
  },

  detailBox: {
    flex: 1,
    // borderWidth:1,
    minWidth: 100, // Ensures both columns take roughly half width
    paddingHorizontal: 10,
    // backgroundColor:"pink",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#252525",
  },

  labeldata: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
  },

  value: {
    fontSize: 12,
    color: "#6D6D6D",
    fontWeight: "400",
    flexWrap: "wrap",
  },

  value1: {
    fontSize: 12,
    color: "#6D6D6D",
    fontWeight: "400",
    flexShrink: 1, // Prevents text overflow
    flexWrap: "wrap", // Allows wrapping
  },

  iconWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: 16,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  // packageImagesContainer: {
  //   flexDirection: "row",
  //   marginTop: 20,
  //   flexWrap: "wrap",
  //   gap: 10,
  // },

  packageImage: {
    width: 40,
    height: 40,
    backgroundColor: "#7e7575ff",
  },

  // imagedata: {
  //   marginTop: 10,
  //   fontSize: 14,
  //   color: "#000000",
  //   fontWeight: "500",
  // },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginVertical: 10,
  },

  parcel: {
    color: "#16A263",
    fontWeight: "bold",
    fontSize: 16,
  },

  packedparcel: {
    marginVertical: 15,
    backgroundColor: "#E7F5EC",
    padding: 15,
  },

  para: {
    fontSize: 12,
    color: "#6D6D6D",
    marginTop: 10,
    marginHorizontal: 10,
  },

  line: {
    borderBottomWidth: 0.2,
    marginTop: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  price: {
    flex: 1,
    alignItems: "flex-start",
  },

  img: {
    marginTop: 32,
    marginLeft: -1,
  },

  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 70,
  },

  addressBox: {
    flex: 1,
    marginHorizontal: -2,
  },

  packageImage: {
    width: 40,
    height: 40,
    backgroundColor: "#7e7575ff",
  },

  iconWrapper: {
    backgroundColor: "#E7E7E7",
    borderRadius: 16,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  imagedata: {
    marginTop: 20,
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    // borderWidth:1,
  },
  label: { fontSize: 14, fontWeight: "500", color: "#252525" },
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

  // line: { borderBottomWidth: 0.2 },
  title: { fontSize: 22, fontWeight: "bold" },

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
    alignItems: "center",
    // borderWidth:1,
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
    backgroundColor: "#093C31",
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
  downloadContainer: {
    flexDirection: "row",
    backgroundColor: "#093C31",
    alignItems: "center",
    justifyContent: "center",
    width: "42%",
    borderRadius: 6,
  },
});
