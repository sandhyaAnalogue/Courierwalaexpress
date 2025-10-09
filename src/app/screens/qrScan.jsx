// import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
// import { Stack, useRouter } from 'expo-router';
// import Feather from "@expo/vector-icons/Feather";
// import { decode } from "jsqr";
// import * as ImagePicker from "expo-image-picker";
// import { useState,useRef,useEffect } from 'react';

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";

// const  QrScan = () => {
//   const router = useRouter();
//   const inserts = useSafeAreaInsets();

//   const [hasPermission, setHasPermission] = useState(null);
//   const [qrData, setQrData] = useState(null);
//   const [pickedImage, setPickedImage] = useState(null);

//   const cameraRef = useRef(null);

//   // Request camera permission
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   // Pick image from gallery
//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setPickedImage(uri);

//       // Resize image for faster decoding
//       const manipulatedImage = await ImageManipulator.manipulateAsync(
//         uri,
//         [{ resize: { width: 300 } }],
//         { base64: true }
//       );

//       if (!manipulatedImage.base64) return;

//       // Convert base64 to Uint8ClampedArray
//       const raw = Uint8ClampedArray.from(
//         atob(manipulatedImage.base64),
//         (c) => c.charCodeAt(0)
//       );

//       const qr = decode(raw, manipulatedImage.width, manipulatedImage.height);

//       if (qr) {
//         setQrData(qr.data);
//         Alert.alert("QR Code Data", qr.data);
//       } else {
//         Alert.alert("No QR code found");
//       }
//     }
//   };

//   // Handle camera scanning
//   const handleCameraScan = async () => {
//     if (!cameraRef.current) return;
//     const photo = await cameraRef.current.takePictureAsync({ base64: true });

//     if (!photo.base64) return;

//     const raw = Uint8ClampedArray.from(
//       atob(photo.base64),
//       (c) => c.charCodeAt(0)
//     );

//     const qr = decode(raw, photo.width, photo.height);

//     if (qr) {
//       setQrData(qr.data);
//       Alert.alert("QR Code Data", qr.data);
//     } else {
//       Alert.alert("No QR code found in camera");
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//     <View>

//       {/* STACK-SCREEN-START */}
//           {/* <Stack.Screen
//             options={{
//               header: () => {
//                 return (
//                   <View
//                     style={{
//                       backgroundColor: "#f8f8ff",
//                       paddingTop: inserts.top +20,
//                       flexDirection: "row",
//                       alignItems: "center",
//                     }}
//                   >
//                     <TouchableOpacity
//                       onPress={() => router.back()}
//                       style={{
//                         backgroundColor: "#E7E7E7",
//                         padding: 6,
//                         borderRadius: 16,
//                         marginLeft: 20,
//                       }}
//                     >
//                       <Feather name="chevron-left" size={20} color="black" />
//                     </TouchableOpacity>
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontWeight: "500",
//                         marginLeft: 10,
//                         color: "#252525",
//                       }}
//                     >
//                       {" "}
//                       Back
//                     </Text>
//                   </View>
//                 );
//               },
//             }}
//           /> */}
//           {/* STACK-SCREEN-END */}
//       <Text style={styles.title}>Scan QR code</Text>
//       <Text style={styles.txt}>Place the QR code inside the frame</Text>
//       <Text style={styles.txt}>to scan please Avoid shaking to get results quickly.</Text>

//        {/* QR Info */}
//       {qrData && (
//         <Text style={{ textAlign: "center", marginVertical: 10, fontSize: 16 }}>
//           Scanned QR: {qrData}
//         </Text>
//       )}

//       {/* Camera Preview */}
//       <View style={styles.cameraContainer}>
//         <Camera ref={cameraRef} style={styles.camera} ratio="16:9" />
//       </View>

//       {/* Buttons */}
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleCameraScan}>
//           <Text style={styles.buttonText}>Scan QR from Camera</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={pickImage}>
//           <Text style={styles.buttonText}>Pick Image from Gallery</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Picked Image */}
//       {pickedImage && (
//         <Image
//           source={{ uri: pickedImage }}
//           style={{ width: 200, height: 200, alignSelf: "center", marginTop: 10 }}
//         />
//       )}
//     </View>
//     </SafeAreaView>
//   )
// }

// export default QrScan

// const styles = StyleSheet.create({
//   title:{
//     fontSize:16,
//     fontWeight:"700",
//     textAlign:"center",
//     marginBottom:20,
//   },
//   txt:{
//     fontSize:10,
//     fontWeight:"400",
//     color:"#505050",
//     textAlign:"center",
//     paddingVertical:2,
//   },
//   cameraContainer: {
//     flex: 1,
//     margin: 20,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonsContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   button: {
//     backgroundColor: "#3D85C6",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//   },
// })