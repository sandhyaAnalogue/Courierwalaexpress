import { StyleSheet, Text, View,TouchableOpacity,TextInput, } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export const InputDropdown = ({ placeholder, style }) => {
  const [visible, setVisible] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const toggleDropdown = () => setVisible(!visible);

  return (
    <View style={[styles.dropdownContainer, style]}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton2}>
        <Text style={[styles.dropdownText && styles.placeholderText2]}>
          {placeholder}
        </Text>
        <Feather
          name={visible ? "chevron-up" : "chevron-down"}
          size={18}
          color="#f8f2f2ff"
        />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdown}>
          <View style={{ flexDirection: "row", gap: 40, marginHorizontal: 25,marginBottom:-10, }}>
            <Text style={styles.label}>Recipient Name *</Text>
            <Text style={styles.label}>Recipient Mobile *</Text>
          </View>

          <View style={styles.row}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter recipient name"
              placeholderTextColor={"#6D6D6D"}
              keyboardType="default"
              value={input1}
              onChangeText={setInput1}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter recipient number"
              placeholderTextColor={"#6D6D6D"}
              keyboardType="number-pad"
              value={input2}
              onChangeText={setInput2}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 6,
    // backgroundColor:'red'
  },
  dropdownContainer: {
    marginBottom: 12,
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
    color: "#F6F6F6",
    fontWeight:'500'
  },
  placeholderText: {
    color: "#888888",
    fontWeight: "400",
    //  textAlign: 'left',
    fontSize:12
  },
   placeholderText2: {
    color: "#F6F6F6",
    fontWeight: "400",
    fontSize:12,
    //  textAlign: 'left',
     gap:10
  },
 
  dropdownIcon: {},
  dropdown: {
    // marginTop: 4,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderRadius: 6,
    padding: 6,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textInput: {
    flex:1,
    height: 40,
     backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 12,
    // marginHorizontal:4,
    fontSize:12,
   
 
  },
  row:{
   
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal:20 // Optional: for spacing between inputs
 
  },
  textInputDropdown:{
    // backgroundColor:'red'
  },
});
