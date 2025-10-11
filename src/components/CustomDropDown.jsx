import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownIcon from "../assets/svgs/DropDownIcon";
import { useState } from "react";

const {height,width}= Dimensions.get("window")

const CustomDropDown = ({
  label,
  options = [],
  placeholder = "Select an option",
  selectedValue,
  onSelect,
  error,
  containerStyle,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setOpen(false);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.dropdown, error && styles.errorDropdown]}
        onPress={() => setOpen(!open)}
      >
        <Text style={selectedValue ? styles.valueText : styles.placeholder}>
          {selectedValue || placeholder}
        </Text>
        <DropDownIcon width={18} height={18} />
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {open && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item, ind) => ind.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => handleSelect(item)}
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

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width:width-30,
    backgroundColor:"white"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueText: {
    fontSize: 16,
    color: "#000",
  },
  placeholder: {
    fontSize: 16,
    color: "#999",
  },
  errorDropdown: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: "#fff",
    maxHeight: 150,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
