import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const CancelOrderDropDown = ({ data, onSelect, placeholder, textStyle }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setVisible(!visible);

  // Checkbox click → just toggle selection
  const handleCheckbox = (item) => {
    setSelected(item);
  };

  // Cancel order button → finalize selection & close dropdown
  const handleCancelOrder = () => {
    setVisible(false);
    onSelect?.(selected); // notify parent of selection
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[
          styles.dropdownButton,
          {
            backgroundColor: visible ? "#FFFFFF" : null,
            borderColor: visible ? "#E0E0E0" : "#000000",
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.dropdownText,
              !selected && styles.placeholderText,
              textStyle,
            ]}
            numberOfLines={1}
          >
            {selected ? selected.label : placeholder}
          </Text>
        </View>

        <Feather
          name={visible ? "chevron-up" : "chevron-down"}
          size={18}
          color="#333"
        />
      </TouchableOpacity>

      {visible && (
        <View>
          <View style={styles.dropdown}>
            {data.map((item) => (
              <View
                key={item.value}
                style={[
                  styles.dropdownItem,
                  { flexDirection: "row", alignItems: "center", gap: 8 },
                ]}
              >
                <Checkbox
                  value={selected?.value === item.value}
                  onValueChange={() => handleCheckbox(item)} // only toggle selection
                  color={selected?.value === item.value ? "#252525" : undefined}
                />
                <Text style={{ fontSize: 12, color: "#252525" }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          <View style={{marginVertical:10}}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 8,
                paddingVertical: 10,
                backgroundColor: "#093C31",
              }}
              onPress={handleCancelOrder} // close dropdown & finalize selection
            >
              <Text style={{ textAlign: "center", color: "#FFFFFF" }}>
                Cancel order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CancelOrderDropDown;

const styles = StyleSheet.create({
  dropdownContainer: { marginBottom: 12 },
  dropdownButton: {
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
  dropdownText: { fontSize: 12, color: "#252525", fontWeight: "500" },
  placeholderText: { color: "#888888", fontWeight: "400", fontSize: 12 },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 8,
    zIndex: 1000,
    width: "100%",
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
