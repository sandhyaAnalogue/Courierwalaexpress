import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
// import DownArrow from "../assets/svgs/SVGIcons/DownArrow"
import DownArrow from "../assets/svgIcons/DownArrow"


const GenderDropDown = ({ options = [], value, onSelect, label,hasError }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Dropdown button */}
      <Pressable style={[styles.inputBox,hasError && { borderColor: "red", borderWidth: 1 },]} onPress={() => setOpen(!open)}>
        <Text style={[styles.valueText, !value && styles.placeholder]}>
          {value ? value : "Select Gender"}
        </Text>
        <DownArrow style={styles.icon} />
      </Pressable>

      {/* Options list */}
      {open && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item, ind) => ind.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={styles.option}
              >
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default GenderDropDown;

const styles = StyleSheet.create({
  container: {
    display:"flex",
    margin:"auto",
    width: "90%",
    marginTop:8,
    marginBottom:8,
  },
  label: {
    fontSize: 14,
    fontWeight:"500",
    color: "#252525",
    marginBottom: 5,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  valueText: {
    fontSize: 14,
    color: "#252525",
  },
  placeholder: {
    color: "#888888",
    fontSize:12,
    fontWeight:400,
  },
  dropdownList: {
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#fff",
    maxHeight: 120,
    
  },
  option: {
    flex:1,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    padding: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  icon:{
    marginRight:16,
  }
});
