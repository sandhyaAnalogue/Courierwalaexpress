import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import BackArrow from '../assets/icons/BackArrow';
// import AntDesign from '@expo/vector-icons/AntDesign';




export default function BackArrowButton({onPress}) {
  return (
    <Pressable onPress={onPress} style={styles.backArrowBtnContainer}>
      <BackArrow  style={styles.arrowBtn}/>
      
        {/* <AntDesign name="left" size={18} color="black" style={styles.arrowBtn}/> */}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    backArrowBtnContainer:{
        // backgroundColor:"pink",
        marginRight:16,

    },
    arrowBtn:{
        backgroundColor:"#E7E7E7",
        borderRadius:20,
        // padding:8,
        // marginRight:12,
      
    }
})