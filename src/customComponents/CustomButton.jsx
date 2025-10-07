import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomButton = ({ onPress, label, btnContainer, btnLabel,disabled }) => {
  return (
      <Pressable
        style={[
          styles.btnContainer,
          btnContainer,
          disabled && styles.disabledBtn,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.label, btnLabel]}>{label}</Text>
      </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
  },
  label: {
    color: "#040404ff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledBtn: {
    backgroundColor: "#cccccc",
  },
});
