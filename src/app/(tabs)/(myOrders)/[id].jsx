import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import BookingIcon from '../../../assets/svgIcons/BooingIcon';
import BookingIcon from '../../../assets/svgIcons/BooingIcon';

import RaiseIssue from '../../../assets/svgIcons/RaiseIssueIcon';
import Rebook from '../../../assets/svgIcons/Rebook';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import TextStyles from '../../TextStyles/TextStyles';
// import img1 from '../../../assets/svgIcons/img1'
import img1 from '../../../assets/svgIcons/img1'

import img2 from '../../../assets/svgIcons/img2'
import img3 from '../../../assets/svgIcons/img3'
import img4 from '../../../assets/svgIcons/img4'
import img5 from '../../../assets/svgIcons/img5'

// // Use the correct image paths from your assets folder
// const img1 = require('../../../../image/img1');
// const img2 = require('../../../../image/img2');
// const img3 = require('../../../../image/img3');
// const img4 = require('../../../../image/img4');
// const img5 = require('../../../../image/img5');

const orders = [
  {
    bookingId: 'CW254614',
    date: '13-05-2025',
    courierType: 'Electronics',
    status: 'In-Transit',
    insured: false,
    itemName: 'Watch',
    dimensions: '16×10cm, 5kg',
    bookingTime: '11:30 PM',
    bookingMode: 'Instant',
    pickupAddress: 'Jaya Vijaya Plaza, Vital Rao Nagar',
    dropAddress: 'Durgam Cheruvu, Madhapur',
    totalAmount: 326,
    packageImages:[ { SvgComponent: img1, title: 'img1' },
      { SvgComponent: img2, title: 'img2' },
      { SvgComponent: img3, title: 'img3' },
      { SvgComponent: img4, title: 'img4' },
      { SvgComponent: img5, title: 'img5' },
    ],
  },
  {
    bookingId: 'CW254615',
    date: '14-05-2025',
    courierType: 'Clothing',
    status: 'awaiting pickup',
    insured: true,
    itemName: 'Watch',
    dimensions: '20×15cm, 1kg',
    bookingTime: '10:00 AM',
    bookingMode: 'Instant',
    pickupAddress: 'Jaya Vijaya Plaza, Vital Rao Nagar',
    dropAddress: 'Durgam Cheruvu, Madhapur',
    totalAmount: 150,
    packageImages: [
      { SvgComponent: img1, title: 'img1' },
      { SvgComponent: img2, title: 'img2' },
      { SvgComponent: img3, title: 'img3' },
      { SvgComponent: img4, title: 'img4' },
      { SvgComponent: img5, title: 'img5' },
    
    ],
  },
  {
    bookingId: 'CW254616',
    date: '15-05-2025',
    courierType: 'Clothing',
    status: 'Cancelled',
    insured: false,
    itemName: 'Watch',
    dimensions: '20×15cm, 1kg',
    bookingTime: '10:00 AM',
    bookingMode: 'Instant',
    pickupAddress: 'Jaya Vijaya Plaza, Vital Rao Nagar',
    dropAddress: 'Durgam Cheruvu, Madhapur',
    totalAmount: 325,
    packageImages: [
      { SvgComponent: img1, title: 'img1' },
      { SvgComponent: img2, title: 'img2' },
      { SvgComponent: img3, title: 'img3' },
      { SvgComponent: img4, title: 'img4' },
      { SvgComponent: img5, title: 'img5' },
    
    ],
  },
  {
    bookingId: 'CW254617',
    date: '16-05-2025',
    courierType: 'Clothing',
    status: 'Delivered',
    insured: false,
    itemName: 'Watch',
    dimensions: '20×15cm, 1kg',
    bookingTime: '10:00 AM',
    bookingMode: 'Instant',
    pickupAddress: 'Jaya Vijaya Plaza, Vital Rao Nagar',
    dropAddress: 'Durgam Cheruvu, Madhapur',
    totalAmount: 200,
    packageImages: [
       { SvgComponent: img1, title: 'img1' },
      { SvgComponent: img2, title: 'img2' },
      { SvgComponent: img3, title: 'img3' },
      { SvgComponent: img4, title: 'img4' },
      { SvgComponent: img5, title: 'img5' },
    ],
  },
];

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const inserts = useSafeAreaInsets();
  const router = useRouter();

  const order = orders.find(o => o.bookingId === id);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Order not found</Text>
      </View>
    );
  }
  
  const statusLower = order.status.toLowerCase();
  const isInTransit = statusLower === 'in-transit';
  const isCancelled = statusLower === 'cancelled';
  const isAwaitingPickup = statusLower === 'awaiting pickup';
  const showParcel = isAwaitingPickup && order.insured;

  return (
    <ScrollView style={styles.main}>
      <Stack.Screen options={{
        header: () => {
          return (
            <View style={{ backgroundColor: "#F8F8ff", paddingTop: inserts.top + 20, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => router.navigate("/(myOrders)")}
                style={{ backgroundColor: "#E7E7E7", padding: 6, borderRadius: 16, marginLeft: 20 }}>
                <Feather name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 10, color: '#252525' }}> My Orders</Text>
            </View>
          )
        }
      }} />
      
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
            <Text style={{
              maxWidth: 100, 
              // borderWidth:1,
              fontSize: 10,
              paddingHorizontal: 20,
              paddingVertical: 11,
              backgroundColor: '#E7E7E7',
              borderRadius: 25,
              borderWidth: order.status === 'Cancelled' ? 0 : 1,
              borderColor: '#000000',
              color: order.status === 'Cancelled' ? '#FFFFFF' : '#252525',
              fontWeight: '500',
              flexWrap: 'wrap', 
              textAlign: "center",
              backgroundColor: order.status === 'Cancelled' ? '#FF0000' : '#F8F8ff'
            }}>
              {order.status}
            </Text>
          </View>
          
          {showParcel && (
            <View style={styles.insuredTag}>
              <Text style={[TextStyles.STYLE_1_A22]}>Insured parcel</Text>
            </View>
          )}
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailBox}>
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
          </View>

          <View style={styles.detailBox}>
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
          </View>
        </View>

        <View
          style={[
            styles.addressContainer,
            order.status === "awaiting pickup" ? styles.row : styles.column,
          ]}
        >
          <View style={[styles.addressBox, order.status === "awaiting pickup" && { marginRight: 2 }]}>
            <Text style={styles.labeldata}>Pickup Address</Text>
            <Text style={styles.value} numberOfLines={2}>
              {order.pickupAddress}
            </Text>
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.labeldata}>Drop Address</Text>
            <Text style={styles.value} numberOfLines={2}>
              {order.dropAddress}
            </Text>
          </View>
        </View>

        <View style={styles.img}>
          <Text style={styles.labeldata}>Package images</Text>
         <View style={styles.packageImagesContainer}>
  {order.packageImages.map((imgObj, i) => {
    const SvgComponent = imgObj.SvgComponent;  // get the component
    return (
      <View key={i} style={{ alignItems: 'center', marginRight: 1}}>
        <SvgComponent width={20} height={20} />
        <Text style={{ fontSize: 10, color: '#444' }}>{imgObj.title}</Text>
      </View>
    );
  })}
</View>

        </View>
        
        {showParcel && (
          <View style={styles.packedparcel}>
            <Text style={styles.parcel}>This parcel is insured</Text>
            <Text style={{color: '#6D6D6D'}}>Covered: ₹20,000</Text>
          </View>
        )}
        
        <View style={styles.border}></View>
        
        <View style={styles.detailRow}>
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
              *Final Price may vary after physical {'\n'}   
           <Text></Text>  verification during pickup
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
          <TouchableOpacity style={{ alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.lastView}>View Less</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', marginTop: 20, marginHorizontal: 6 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageImagesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 10,
    marginBottom:12,
  },
  rows: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    gap: 24
  },
  labelValuePair: {
    marginBottom: 12, 
  },
  main: {
    padding: 10,
    paddingBottom: 40, 
    backgroundColor: "#f8f8ff",
    flex: 1,
    marginBottom: 40
  },
  lastView: {
    paddingHorizontal: 104,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: '#252525',
    borderRadius: 4,
    marginBottom: 30
  },
  packageImage: {
    width: 40,
    height: 40,
    backgroundColor: '#7e7575ff',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: {
    backgroundColor: '#E7E7E7',
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontSize: 14, fontWeight: '500', color: '#252525' },
  labeldata: { fontSize: 14, fontWeight: '500', color: '#252525' },
  amount: { fontSize: 16, fontWeight: '700', color: '#000000', marginVertical: 10 },
  parcel: { color: '#16A263', fontWeight: 'bold', fontSize: 16, },
  packedparcel: { marginVertical: 20, backgroundColor: '#E7F5EC', padding: 15 },
  value: { fontSize: 10, color: '#5D5D5D', fontWeight: '500',paddingLeft:2, },
  para: { fontSize: 12, color: '#6D6D6D' },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 16,
  },
  rebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6D6D6D',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rebookButton2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6D6D6D',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rebookButton2cancel: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6D6D6D',
    paddingHorizontal: 15,
    paddingVertical: 10.5,
    borderRadius: 5,
  },
  rebookText: {
    fontSize: 14,
    color: '#454545',
    // marginLeft: 6,
    fontWeight:500,
  },
  raiseText: {
    fontSize: 14,
    fontWeight:500,
    color: '#454545',
    marginLeft: 6,
  },
  linkText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
    backgroundColor: 'black',
    paddingHorizontal: 27,
    paddingVertical: 10,
    borderRadius: 4,
  },
  insuredTag: {
    position: 'absolute',
    top: -20,
    left: -30,
    backgroundColor: '#EBFEED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    transform: [{ rotate: '-20.6deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
  },
  border: { borderWidth: 0.3, marginTop: 10 },
  title: { fontSize: 22, fontWeight: 'bold' },
  detailRow: {
    // borderWidth:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginRight:16

  },
  detailBox: {
    // backgroundColor:"pink",
    // borderWidth:1,
    paddingHorizontal:1,
    // flex: 1,
    paddingVertical: 20,
    gap: 10
  },
  
  addressContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: -13,
    // marginHorizontal:1,
    gap: 70
  },
  addressBox: {
    flex: 1,
    marginHorizontal: -2,
  },
  img: {
    marginTop: 32,
    marginLeft: -1
  },
  price: {
    
  }
});
