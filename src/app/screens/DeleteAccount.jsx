// import { useEffect,useState } from "react";
// import { StyleSheet, Text, View, Modal,Pressable } from "react-native";

// const DeleteAccount = () => {
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
  
//   useEffect(()=>{
//     setShowDeleteModal(true)

//   },[])
//   return (
//     <View>
//       {/* <Modal
//         visible={showDeleteModal}
//         transparent={false}
//         animationType="fade"
//         onRequestClose={() => setShowDeleteModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>
//               "Are You Sure You Want to Delete?"
//             </Text>
//             <Text style={styles.modalDesc}>
//               Lorem ipsum dolor sit amet consectetur. Mi faucibus consectetur
//               non condimentum feugiat malesuada
//             </Text>

//             <View style={styles.buttonRow}>
//               <Pressable
//                 style={[styles.btn, styles.noBtn]}
//                 onPress={() => setShowDeleteModal(false)}
//               >
//                 <Text style={styles.noBtnText}>No</Text>
//               </Pressable>

//               <Pressable
//                 style={[styles.btn, styles.yesBtn]}
//                 onPress={() => {
//                   setShowDeleteModal(false);
//                   console.log("Account deleted");
//                 }}
//               >
//                 <Text style={styles.yesBtnText}>Yes</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal> */}
//       {/* <Modal visible={showDeleteModal}>
//         <View>
//           <Text>hiii</Text>
//         </View>
//       </Modal> */}
//     </View>
//   );
// };

// export default DeleteAccount;

// const styles = StyleSheet.create({});



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DeleteAccount = () => {
  return (
    <View>
      <Text>DeleteAccount</Text>
    </View>
  )
}

export default DeleteAccount

const styles = StyleSheet.create({})