import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onClose, text, title = "Select Payment" ,onPress}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>

          <Text style={styles.text}>{text}</Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onPress || onClose}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',

  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  paymentOption: {
    width: '100%',
    padding: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#093C31',
    // padding: 12,
    paddingVertical:10,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600',fontSize:14 },
  text:{
    fontSize:12,
    fontWeight:"500"
  }
});
