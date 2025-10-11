import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
// import DownArrow from "../assets/icons/DownArrow";
import DownArrow from "../assets/svgIcons/icons/DownArrow";

const DropDownInputfield = ({
  label,
  value,
  placeholder,
  onselect,
  dropdownContainer,
  options,
  inputBox,labeltext
}) => {
  const [visibleDropDown, setVisibleDropDown] = useState(false);
  // console.log(visibleDropDown, "visibledropdown");
  const handleSelected = (item) => {
    onselect(item);
    setVisibleDropDown(false);
  };
  return (
    <View style={[styles.container, dropdownContainer]}>
      {label && <Text style={[styles.label,labeltext]}>{label}</Text>}

      <Pressable
        onPress={() => setVisibleDropDown(true)}
        style={[styles.inputBox,inputBox]}
      >
        <Text style={value ? styles.selectedText: styles.placeholderText}>{value || placeholder}</Text>
        <DownArrow style={styles.icon}/>
      </Pressable>


      <Modal
        visible={visibleDropDown}
        animationType="fade"
        transparent
        onRequestClose={() => setVisibleDropDown(false)}
      >
        <Pressable
          onPress={() => setVisibleDropDown(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item,index }) => (
                <Pressable
                  onPress={() => handleSelected(item)}
                  style={[styles.option, index !== options.length-1 && styles.optionBorder]}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
      </View>
  );
};

export default DropDownInputfield;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    // borderWidth: 1,
  },
  label: {
    // fontSize: 14,
    // color: "#333",
    // marginBottom: 6,
  },
  inputBox: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 8,
    // paddingHorizontal: 12,
    // paddingVertical: 14,
    // backgroundColor: "#fff",
  },
//   text: {
//     // fontSize: 16,
//     color:"#888888"
//   },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 30,
    
    // borderWidth:2,  
    // marginTop:-20,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    maxHeight: 250,
    elevation: 5,
    // borderWidth:2,
    // display:"flex",
    // justifyContent:"center",
    // alignItems:"center",
    
    // marginTop:80
  },
  option: {
    flex:1,
    paddingVertical: 15,
    alignItems:"center"
    // paddingHorizontal: 16,
    // borderWidth:1,
    
  },
  optionBorder:{
    borderBottomWidth: 1,
  borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  icon:{
    // borderWidth:1,
    marginRight:18
  },
selectedText:{
    color:"#000000"
},
placeholderText:{
    color:"#888888"
},

});
