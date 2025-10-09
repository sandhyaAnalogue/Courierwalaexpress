import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CourierTypeDropDown = ({ data, onSelect, placeholder, textStyle,textStyle1 }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setVisible(!visible);

  const handleSelect = (item) => {
    setSelected(item);
    setVisible(false);
    onSelect?.(item);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        {/* Wrap Text in a flex:1 View to center it */}
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.dropdownText,
              !selected && styles.placeholderText,
              textStyle,
            ]}
            numberOfLines={1} // prevent overflow
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
        <View style={styles.dropdown}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[styles.dropdownItem,textStyle1,]}
              onPress={() => handleSelect(item)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CourierTypeDropDown;

    const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8ff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 6,
    // backgroundColor:'red'
  },
  dropdownContainer: {
    marginBottom: 12,
    position: 'relative',
    

  },
  dropdownButton: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderRadius: 6,
    padding: 12,
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
    color: "#252525",
    fontWeight:'500'
  },
  placeholderText: {
    color: "#888888",
    fontWeight: "400",
    //  textAlign: 'left', 
    fontSize:12,
  },
   placeholderText2: {
    color: "#e6dfdfff",
    fontWeight: "400",
    fontSize:12,
    //  textAlign: 'left', 
     gap:10
  },

  dropdownIcon: {},
  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 8,
    position: 'absolute',
    zIndex: 1000, 
    width: '100%',
    top:45,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textInput: {
    flex:1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    // paddingHorizontal: 6,
    marginVertical: 12,
    marginHorizontal:6,
    backgroundColor: "#fff",
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
  
  card: {
    borderWidth: 0.2,
    // borderColor: '#007aff',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color:'#000000'
  },
  phone: {
    fontSize: 10,
    color: '#5D5D5D',
       fontWeight: '500',
  },
  callButton: {
    backgroundColor: '#252525',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  callText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 12,
  },
  arrivalText: {
    fontSize: 12,
    color: '#5D5D5D',
    marginTop: 6,
    fontWeight:'500'
  },
  chatButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
    fontWeight:500
  },
   slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
   slotsContainer2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // paddingHorizontal:15
  },
  slotButton: {
    width: "30%", // 3 per row
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    alignItems: "center",
  },
  //  slotButton2: {
  //   width: "30%", // 3 per row
  //   paddingVertical: 10,
  //   //  paddingHorizontal:8,
  //   borderRadius: 4,
  //   borderWidth: 0.2,
  //   borderColor: "#252525",
  //   backgroundColor: "#E7E7E7",
  //   marginBottom: 12,
  //   alignItems: "center",
  // },
  
  selectedSlotButton: {
    backgroundColor: "#252525",
    borderColor: "#252525",
  },
  //  selectedSlotButton2: {
  //   backgroundColor: "#252525",
  //   borderColor: "#252525",
  // },
  slotText: {
    fontSize: 12,
    color: "#252525",
    fontWeight:'400'
  },
  selectedSlotText: {
    color: "#fff",
    fontWeight: "600",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 14,
    color: "#252525",
  },
  ////////////////Packe values////////////////////
  priceButton2: {
  width: "30%", // 3 buttons per row
  paddingVertical: 10,
  // paddingHorizontal: 15,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "#ccc",
  backgroundColor: "#E7E7E7",
  marginBottom: 12,
  alignItems: "center",
  justifyContent: "center",
},

selectedPiceButton2: {
  backgroundColor: "#252525",
  borderColor: "#252525",
},

selectedPiceText: {
  color: "#F6F6F6",
  fontWeight: "600",
},

slotText2: {
  color: "#252525",
  fontWeight: "500",
  fontSize: 12,
},

// slotsContainer: {
//   flexDirection: "row",
//   flexWrap: "wrap",
//   justifyContent: "space-between",
// },




// ///////////Price Esimations/////////////////
// buttonContainers: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   backgroundColor: '#252525',
//   paddingVertical: 12,
//   paddingHorizontal: 20,
//   paddingLeft:100,
//   paddingRight:40,
//   borderRadius: 10,
//   marginBottom: 12,
// },

// buttonText: {
//   color: '#F6F6F6',
//   fontWeight: '600',
//   fontSize: 12,
//   textAlign: 'center',
//   // flex: 1, // takes available space between icons
// },

// iconLeft: {
//   marginRight: 10,
// },

// iconRight: {
//   marginLeft: 40,
// },
//////////////////Price esimations///////////////

  containers: {
    alignItems: "center",
    marginTop: 40,
  },
  buttonContainers: {
   flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#252525',
  paddingVertical: 12,
  paddingHorizontal: 30,
  paddingLeft:100,
  paddingRight:40,
  borderRadius: 10,
  marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    marginHorizontal: 8,
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  estimateContainer: {
    flexDirection: "row",
    gap: 12,
  },
  estimateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 6,
  },
  estimateText: {
    marginLeft: 8,
    color: "#000",
    fontSize:12,
    fontWeight: "500",
  },
  priceButtons: {
    backgroundColor: "#252525",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  priceText: {
    color: "#F6F6F6",
    fontWeight: "600",
    fontSize:14
  },


});
