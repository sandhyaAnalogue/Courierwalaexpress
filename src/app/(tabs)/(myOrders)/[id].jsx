import { useLocalSearchParams, useRouter } from 'expo-router';
//import { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BookingIcon from '../../../../BookingIcon/BooingIcon';
import RaiseIssue from '../../../../RaiseIssue/RaiseIssueIcon';
import Rebook from '../../../../Rebook/Rebook';
 import { useSafeAreaInsets } from 'react-native-safe-area-context';
 import Feather from '@expo/vector-icons/Feather';
 import {Stack} from 'expo-router'
import TextStyles from '../../TextStyles/TextStyles';
 
//dynamic colors getStatusStyle
// const getStatusStyle = (status) => {
//   switch (status.toLowerCase()) {
//     case 'In-transit':
//       return {
//         backgroundColor: '#d4edda',
//         color: '#eee',
//         borderWidth: 1
//       };
//     case 'Awaiting pickup':
//       return {
//        backgroundColor: '#d4edda',
//         color: '#eee',
//         borderWidth: 1
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
    packageImages: [
  'https://via.placeholder.com/100/92c952',
  'https://via.placeholder.com/100/771796',
  'https://via.placeholder.com/100/24f355',
  'https://via.placeholder.com/100/24f355',
  'https://via.placeholder.com/100/24f355',
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
    packageImages: [  'https://via.placeholder.com/100/92c952',
  'https://via.placeholder.com/100/771796',
  'https://via.placeholder.com/100/24f355',],
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
    
 packageImages: [  'https://via.placeholder.com/100/92c952',
  'https://via.placeholder.com/100/771796',
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
    packageImages: [  'https://via.placeholder.com/100/92c952',
  'https://via.placeholder.com/100/771796',
  'https://via.placeholder.com/100/24f355',]
  },
  
];

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
    const inserts=useSafeAreaInsets();
    const router=useRouter();
//  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: 'My Orders', 
  //     headerShown: false,
      
  //   });
  // }, [navigation]);

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
//const isDelivered = statusLower === 'delivered';

  const isAwaitingPickup = statusLower === 'awaiting pickup';
  const showParcel = isAwaitingPickup && order.insured;
  //const showActionButtons = isInTransit || isAwaitingPickup;

  return (
    <ScrollView style={styles.main}>
       <Stack.Screen options={{
        header:()=>{
          return(
            <View style={{backgroundColor:"#F8F8ff",paddingTop:inserts.top+30,flexDirection:"row",alignItems:"center"}}>
              <TouchableOpacity
               onPress={() => router.back()}
              style={{backgroundColor:"#E7E7E7",padding:6,borderRadius:16,marginLeft:15}}>
                <Feather name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
             <Text style={{fontSize:16,fontWeight:'500',marginLeft:10,color:'#252525'}}> My Orders</Text>
            </View>
          )
        }
      }}/>
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
<Text style={{maxWidth:100, fontSize: 14,
   paddingHorizontal: 15,
   paddingVertical: 6,
 backgroundColor: '#E7E7E7',
  borderRadius: 20,
  borderWidth:order.status==='Cancelled'?0:order.status==='Delivered'?0:1,
  borderColor: '#000000',
  color:order.status ==='Cancelled'?'#FFFFFF':order.status==="Delivered"?'#FFFFFF':'#252525',
  
  fontWeight: '500',
   flexWrap: 'wrap', 
   textAlign:"center",
   backgroundColor:
    order.status === 'Cancelled'
        ? '#FF0000'
        : order.status === 'Delivered'
        ? '#3ea340'
        : "#e5ecf0ff",

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
            <Text style={styles.labeldata}>Booking Date</Text>
            <Text style={styles.value}>{order.date}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.labeldata}>Booking Time</Text>
            <Text style={styles.value}>{order.bookingTime}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailBox}>
            <Text style={styles.labeldata}>Courier Type</Text>
            <Text style={styles.value}>{order.courierType}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.labeldata}>Item Name</Text>
            <Text style={styles.value}>{order.itemName}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailBox}>
            <Text style={styles.labeldata}>Dimensions</Text>
            <Text style={styles.value}>{order.dimensions}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.labeldata}>Booking Mode</Text>
            <Text style={styles.value}>{order.bookingMode}</Text>
          </View>
        </View>

        <View style={styles.pickup}>
          <Text style={styles.labeldata}>Pickup Address</Text>
          <Text style={styles.value}>{order.pickupAddress}</Text>
        </View>
        
        <View style={styles.drop}>
          <Text style={styles.labeldata}>Drop Address</Text>
          <Text style={styles.value}>{order.dropAddress}</Text>
        </View>
        
        <View style={styles.img}>
          <Text style={styles.labeldata}>Package Images</Text>
          <View style={styles.packageImagesContainer}>
            {order.packageImages.map((imageUri, i) => (
              <Image
                key={i}
                source={{ uri: imageUri }}
                style={styles.packageImage}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>
        
        {showParcel && (
          <View style={styles.packedparcel}>
            <Text style={styles.parcel} >This parcel is insured</Text>
            <Text style={{color:'6D6D6D'}}>Covered: ₹20,000</Text>
          </View>
        )}
        
        <View style={styles.border}></View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailBox}>
            <Text style={styles.amount}>Total Amount</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.amount}>₹{order.totalAmount}</Text>
          </View>
        </View>

       {(isCancelled || isAwaitingPickup) && (
  <View>
    <Text style={styles.para}>
      *Final Price may vary after physical verification during pickup
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

        {/* Awaiting Pickup or others ,0(excluding In-Transit)0: Show Rebook + Raise Issue */}
        {!isInTransit  && !showParcel && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.rebookButton}>
              <Rebook width={24} height={24} />
              <Text style={styles.rebookText}>Rebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rebookButton}>
              <RaiseIssue width={20} height={20} />
              <Text style={styles.raiseText}>Raise Issue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Insured Parcel =>Show Rebook , Cancel Order */}
        {!isInTransit && showParcel && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.rebookButton}>
              <Rebook width={24} height={24} />
              <Text style={styles.rebookText}>Rebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rebookButton}>
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
  container: { flex: 1, padding: 20, backgroundColor: '#fff',marginTop:20,marginHorizontal:6 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    elevation:5,
    
  },
  packageImagesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
   main: {
    padding: 10,
    paddingBottom: 40, 
    backgroundColor:"#f8f8ff",
    flex:1,
    marginBottom:40
  },
  lastView:{
    paddingHorizontal:104,
    paddingVertical:14,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: '#252525',
    borderRadius: 4,
    marginBottom:30
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
  label: { fontSize: 14, fontWeight: '500',color:'#252525' },
  labeldata: { fontSize: 14, fontWeight: '500',color:'#252525' },
  amount:{fontSize: 16, fontWeight: '700', color: '#000000',margin:10},
  parcel:{color:'#16A263',fontWeight:'bold' ,fontSize:16,paddingVertical:5},
  packedparcel:{margin:10,backgroundColor:'#E7F5EC',padding:20},
  value: { fontSize: 14, color: '#5D5D5D',fontWeight:'400' },
  para:{fontSize: 12, color: '#6D6D6D',paddingHorizontal:14},
  // status: {
  //   paddingHorizontal: 12,
  //   paddingVertical: 6,
  //   borderRadius: 20,
  //   fontWeight: '600',
  //   textAlign: 'center',
  //   overflow: 'hidden',
  //   borderWidth:1,
  //   color: '#333',
  // fontWeight: '500',
  // maxWidth: 100,           
  // textAlign: 'center',     
  // flexWrap: 'wrap',       
  // },
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rebookText: {
    fontSize: 16,
    color: '#454545',
    marginLeft: 6,
  },
  raiseText:{
    fontSize: 16,
    color: '#454545',
    marginLeft: 6,
  },
  linkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'black',
    paddingHorizontal: 19,
    paddingVertical: 10,
    borderRadius: 4,
  },
  insuredTag: {
    position: 'absolute',
    top: -28,
    left: -26,
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
  border:{borderWidth:0.3,marginTop:10},
  insuredText: { color: '#222', fontSize: 12, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: 'bold' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    // paddingHorizontal:10
    gap:30
  },
  detailBox: {
    flex: 1,
    paddingHorizontal: 5,
  },
  pickup:{
    margin:6
  },
  drop:{
    margin:6
  },
  img:{
    margin:6
  }
});
