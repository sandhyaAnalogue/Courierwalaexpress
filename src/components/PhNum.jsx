import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";

const PhNumInput = ({
  label,
  placeholder,
  maxLength,
  onChangeText,
  value,
  keyboardType,
  style,
}) => {
  return (
    <View style={styles.phinpContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, style]}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#999"
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
          style={styles.text}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default PhNumInput;

const styles = StyleSheet.create({
  phinpContainer: {
    // borderWidth:1,
    // width: "90%",
    // backgroundColor:"pink"
    // backgroundColor:"pink"
  },
  text: {
    flex: 1,
    fontSize: 12,
    fontWeight:400,
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 20,
    marginRight: 30,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
    color:"#888888",
    // paddingLeft:10,
    paddingRight: 7,
    paddingTop: 10,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    // backgroundColor:"pink",
    height: "100%",
    // textAlign:"center"
  },
});
