import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
// import PlusIcon from "../../../../assets/svgs/SVGIcons/PlusIcon";
import PlusIcon from "../../../assets/svgIcons/PlusIcon";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import HomeAddress from "../../../../assets/svgs/SVGIcons/HomeAddress";
import HomeAddress from "../../../assets/svgIcons/HomeAddress";

// import WorkAddress from "../../../../assets/svgs/SVGIcons/WorkAddress";
import WorkAddress from "../../../assets/svgIcons/WorkAddress";

import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import BackArrow from "../../../../assets/svgs/SVGIcons/BackArrow";
import BackArrow from "../../../assets/svgIcons/BackArrow";

const ManageAddress = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [addressData, setAddressData] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [dropDown, setDropDown] = useState(null);

  const userAddressData = async () => {
    try {
      const addressDataFromStorage = await AsyncStorage.getItem(
        "userAddresses"
      );
      let data = addressDataFromStorage
        ? JSON.parse(addressDataFromStorage)
        : [];
      setAddressData(data);
      // console.log(data, "parsed data");
      // console.log(addressData,"stateData")
    } catch (error) {
      console.log(error, "error msg");
    }
  };

  useEffect(() => {
    if (isFocused) {
      userAddressData();
    }
  }, [isFocused]);

  const handleAddAddress = () => {
    console.log("moved to add address");
    // navigation.navigate("AddAddress");///////////////
    router.push("/screens/AddAddressDetails");
  };

  // DROPDOWN:
  const handleSelectAddressDropDown = (index) => {
    if (dropDown === index) {
      setDropDown(null);
    } else {
      setDropDown(index);
    }
  };
  const handledropdownSelected = (index) => {
    alert("selected");
  };
  const handleAddressEdit = (item) => {
    console.log(item.label, "edit details");
    // navigation.navigate("AddAddress", { address: item });
    router.push({
      pathname: "/screens/AddAddressDetails",
      params: { address: JSON.stringify(item) },
    });
  };

  // DELETE
  const handleDelete = async (item) => {
    try {
      Alert.alert(
        "Delete Address",
        "Are you sure you want to delete this address?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              const updated = addressData.filter(
                (a) =>
                  !(
                    a.houseNo === item.houseNo &&
                    a.label === item.label &&
                    a.receiverPhNum === item.receiverPhNum
                  )
              );
              await AsyncStorage.setItem(
                "userAddresses",
                JSON.stringify(updated)
              );
              setAddressData(updated); // ✅ refresh UI
            },
          },
        ]
      );
    } catch (err) {
      console.log("Error deleting address:", err);
    }
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      style={styles.addressCard}
      // onPress={() => setSelectedAddress(index)}////testing change
      onPress={() => {
        if (selectedAddress === index) {
          setSelectedAddress(null);
        } else {
          setSelectedAddress(index);
        }
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {/* Radio Button */}
        <View
          style={[
            styles.radioOuter,
            selectedAddress === index && styles.radioOuterSelected,
          ]}
        >
          {selectedAddress === index && <View style={styles.radioInner} />}
        </View>

        {/* Icon + Details */}
        <View style={{ flex: 1, marginLeft: 10, flexDirection: "row" }}>
          {item.label === "home" ? (
            <HomeAddress width={24} height={24} />
          ) : item.label === "work" ? (
            <WorkAddress width={24} height={24} />
          ) : null}
          <View>
            <Text style={[styles.label,{fontSize:12,fontWeight:500}]}>{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</Text>
            <Text style={[styles.addressLine,{fontSize:10,fontWeight:400}]}>
              {item.houseNo}, {item.building}, {item.landmark}
            </Text>
            <Text style={[styles.receiverName,{fontSize:10,fontWeight:400}]}>Name: {item.receiverName}</Text>
            <Text style={[styles.receiverPhNum,{fontSize:10,fontWeight:400}]}>
              Phone: {item.receiverPhNum}
            </Text>
          </View>
        </View>

        {/* 3-dot menu */}
        <View style={{ position: "relative" }}>
          <Pressable
            onPress={(e) => {
              e.stopPropagation(); // stop bubbling to parent
              handleSelectAddressDropDown(index);
            }}
          >
            <Entypo name="dots-three-vertical" size={14} color="#333" />
            {dropDown === index && (
              <View style={styles.dropdown}>
                <Pressable
                  style={styles.SingledropDown}
                  onPress={(e) => {
                    e.stopPropagation();
                    handledropdownSelected(index);
                  }}
                >
                  <Text style={styles.dropdownItem}>Default</Text>
                </Pressable>
                <Pressable
                  style={styles.SingledropDown}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleAddressEdit(item);
                  }}
                >
                  <Text style={styles.dropdownItem}>Edit</Text>
                </Pressable>
                <Pressable
                  style={styles.SingledropDown}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDelete(item);
                  }}
                >
                  <Text style={styles.dropdownItem}>Delete</Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8ff" }}>
      {/* <ScrollView nestedScrollEnabled={true} contentContainerStyle={{paddingBottom:10}}> */}
        <Stack.Screen
          options={{
            header: () => {
              return (
                <View
                  style={{
                    backgroundColor: "#f8f8ff",
                    paddingTop: inserts.top + 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => router.replace("/(profile)")}
                    style={{
                      backgroundColor: "#E7E7E7",
                      padding: 6,
                      borderRadius: 16,
                      marginLeft: 15,
                    }}
                  >
                    <BackArrow width={16} height={16} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      marginLeft: 14,
                      color: "#252525",
                    }}
                  >
                    Manage Address
                  </Text>
                </View>
              );
            },
          }}
        />

        <Pressable
          style={{ flex: 1 }}
          onPress={() => setDropDown(null)} // Close dropdown when pressing outside
        >
          <View style={{ marginTop: 12 }}>
            <Pressable
              style={styles.addnewAddressContainer}
              onPress={handleAddAddress}
            >
              <View style={styles.PlusIcon}>
                <PlusIcon width={18} height={18} color="#252525" />
              </View>
              <View style={styles.txtContainer}>
                <Text style={styles.headertxt}>Add new address</Text>
                <Text style={styles.txt}>You can add up-to 5 addresses</Text>
              </View>
            </Pressable>
            <View style={styles.savedadsContainer}>
              <Text style={styles.savedAdsTitle}>Your saved addresses</Text>
              <View>
                {Array.isArray(addressData) && addressData.length > 0 ? (
                  <FlatList
                    data={addressData}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                  />
                ) : (
                  <Text style={{ color: "gray", marginTop: 10 }}>
                    No address added
                  </Text>
                )}
              </View>
            </View>
          </View>
        </Pressable>
      {/* </ScrollView> */}
    </View>
  );
};

export default ManageAddress;

const styles = StyleSheet.create({
  addnewAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth:1,
    paddingHorizontal: 20,
    paddingVertical: 13,
    elevation: 0.5,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    width: "90%",
    gap: 20,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  txtContainer: {},
  headertxt: {
    fontSize: 14,
    fontWeight: "500",
  },
  txt: {
    color: "#4F4F4F",
    fontSize: 10,
  },
  savedadsContainer: {
    // borderWidth:1,
    marginHorizontal: 20,
    marginTop: 40,
  },
  savedAdsTitle: {
    color: "#4F4F4F",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  // addressCard: {
  //   backgroundColor: "#FFFFFF",
  //   padding: 15,
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: "#e0e0e0",
  //   marginBottom: 12,
  //   elevation: 2,
  //   // shadowColor: "#000",
  //   // shadowOffset: { width: 0, height: 2 },
  //   // shadowOpacity: 0.1,
  //   // shadowRadius: 3,
  // },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    
  },
  addressLine: {
    fontSize: 13,
    color: "#5D5D5D",
    lineHeight: 18,
    marginBottom: 8,
  },
  receiverContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 8,
    marginTop: 5,
  },
  receiverName: {
    fontSize: 14,
    color: "#454545",
  },

  addressCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 15,
    elevation: 2,
    
  },
  radioOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "black",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    marginLeft: 15,
    // borderWidth:1,
  },
  addressLine: {
    fontSize: 13,
    color: "#5D5D5D",
    lineHeight: 18,
    marginBottom: 4,
    // borderWidth:1,
    marginLeft: 15,
  },
  receiverName: {
    fontSize: 13,
    color: "#454545",
    marginLeft: 15,
  },
  receiverPhNum: {
    fontSize: 13,
    marginLeft: 15,
  },
  dropdown: {
    borderWidth:1,
    position: "absolute",
    right: 0,
    top: 20,
    backgroundColor: "#D1D1D1",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    width: 150,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  SingledropDown: {
    // borderWidth:1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownItem: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
});
