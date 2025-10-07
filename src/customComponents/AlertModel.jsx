import { Pressable, StyleSheet, Text, View, Modal } from "react-native";
import React from "react";

export default function AlertModel({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Too many failed attempts</Text>
          <Text style={styles.message}>Please try again after 5 minutes</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  box: {
    width: "75%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
    color:"#252525"
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color:"#5D5D5D"
  },
  button: {
    backgroundColor: "#252525",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width:"100%"
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign:"center"
  },
});
