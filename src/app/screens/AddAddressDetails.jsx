import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackArrow from "../../../assets/svgs/SVGIcons/BackArrow";

const AddAddress = () => {
   const router = useRouter();
        const inserts = useSafeAreaInsets();
  const { address } = useLocalSearchParams();
  const parsedAddress = address ? JSON.parse(address) : null;

  const initialValues = {
    houseNo: parsedAddress?.houseNo || "",
    building: parsedAddress?.building || "",
    landmark: parsedAddress?.landmark || "",
    label: parsedAddress?.label || "",
    receiverName: parsedAddress?.receiverName || "",
    receiverPhNum: parsedAddress?.receiverPhNum?.toString() || "",
  };

  // const handleLabel = (labelinfo) => {
  //   setUserAddress({ ...userAddress, label: labelinfo });
  // };

  const validationSchema = Yup.object().shape({
    houseNo: Yup.string().required("House No. & Floor is required").min(3, "Must contain at least 3 characters"),
    receiverName: Yup.string().required("Receiver’s name is required").min(3, "Name must contain at least 3 letters"),
    receiverPhNum: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
  });

  const handleSaveAddress = async (values) => {
    try {
      const existingAddress = await AsyncStorage.getItem("userAddresses");
      let addresses = existingAddress ? JSON.parse(existingAddress) : [];
      if (parsedAddress) {
        addresses = addresses.map((val) =>
          val.houseNo === parsedAddress.houseNo &&
          val.label === parsedAddress.label &&
          val.building === parsedAddress.building &&
          val.landmark === parsedAddress.landmark &&
          val.receiverName === parsedAddress.receiverName &&
          val.receiverPhNum === parsedAddress.receiverPhNum
            ? values
            : val
        );
      } else {
        addresses.push(values);
      }

      await AsyncStorage.setItem("userAddresses", JSON.stringify(addresses));
      // alert(parsedAddress ? "Address Updated!" : "Address Saved!");
      router.back();
    } catch (error) {
      console.log("Error saving address:", error);
    }
  };

  return (
    <View style={{flex:1,backgroundColor:"#f8f8ff",}}>
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Stack.Screen options={{
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
                  onPress={() => router.replace("/(profile)/ManageAddress")}
                  style={{
                    backgroundColor: "#d7d7dcff",
                    padding: 6,
                    borderRadius: 16,
                    marginLeft: 15,
                  }}
                >
                  <BackArrow width={16} height={16} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginLeft: 14,
                    color: "#252525",
                  }}
                >
                  
                 Add address details
                </Text>
              </View>
            );
          },
        }} />
















          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSaveAddress}
          >
            {({handleChange, handleSubmit, values, errors, touched, setFieldValue,setFieldTouched,})=>(<>
              <View style={styles.inputContainer}>
              <Text style={styles.title}>Add Address</Text>

              <TextInput
                placeholder="House No. & Floor*"
                placeholderTextColor="#999"
                style={[styles.input,touched.houseNo && errors.houseNo && styles.inputError,]}
                value={values.houseNo}
                onChangeText={handleChange("houseNo")}
                keyboardType="default"
                onBlur={() => setFieldTouched("houseNo")}

              />
              {touched.houseNo && errors.houseNo && <Text style={styles.error}>{errors.houseNo}</Text>}

              <TextInput
                placeholder="Building & Block No. (Optional)"
                placeholderTextColor="#999"
                style={styles.input}
                value={values.building}
                onChangeText={handleChange("building")}
              />

              <TextInput
                placeholder="Landmark & Area Name (Optional)"
                placeholderTextColor="#999"
                style={styles.input}
                value={values.landmark}
                onChangeText={handleChange("landmark")}
              />
              </View>

              <View style={styles.addAddressLabel}>
                <Text style={styles.subtitle}>Add Address Label</Text>
                <View style={styles.labelContainer}>
                  {["home", "work", "other"].map((lbl) => (
                      <Pressable
                        key={lbl}
                        style={[styles.label, values.label === lbl && styles.activeLabel]}
                        onPress={() => setFieldValue("label", lbl)}
                      >
                        <Text style={{ fontWeight: "500" }}>{lbl.charAt(0).toUpperCase() + lbl.slice(1)}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>


                 <View style={styles.receiverDetailsContainer}>
                  <Text style={styles.title}>Receiver Details</Text>

                  <TextInput
                    placeholder="Receiver’s Name"
                    placeholderTextColor="#999"
                    style={[styles.input, touched.receiverName &&
                        errors.receiverName &&
                        styles.inputError,]}
                    value={values.receiverName}
                    onChangeText={handleChange("receiverName")}
                    onBlur={() => setFieldTouched("receiverName")}
                  />
                  {touched.receiverName && errors.receiverName && <Text style={styles.error}>{errors.receiverName}</Text>}

                  <TextInput
                    placeholder="Receiver’s Phone Number"
                    placeholderTextColor="#999"
                    maxLength={10}
                     style={[
                      styles.input,
                      touched.receiverPhNum &&
                        errors.receiverPhNum &&
                        styles.inputError,
                    ]}
                    keyboardType="phone-pad"
                    value={values.receiverPhNum}
                    onChangeText={handleChange("receiverPhNum")}
                    onBlur={() => setFieldTouched("receiverPhNum")}
                  />
                  {touched.receiverPhNum && errors.receiverPhNum && <Text style={styles.error}>{errors.receiverPhNum}</Text>}
                </View>

                <View style={styles.btncontainer}>
                  <Pressable style={styles.btnStyling} onPress={handleSubmit}>
                    <Text style={styles.txtStyle}>Save Address</Text>
                  </Pressable>
                </View>

            </>)}
            
              

              

              

              
            

            
              
              
                {/* <Pressable
                  style={[
                    styles.label,
                    userAddress.label === "home" && styles.activeLabel,
                  ]}
                  onPress={() => handleLabel("home")}
                >
                  <Text style={{ fontWeight: "500" }}>Home</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.label,
                    userAddress.label === "work" && styles.activeLabel,
                  ]}
                  onPress={() => handleLabel("work")}
                >
                  <Text style={{ fontWeight: "500" }}>Work</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.label,
                    userAddress.label === "other" && styles.activeLabel,
                  ]}
                  onPress={() => handleLabel("other")}
                >
                  <Text style={{ fontWeight: "500" }}>Other</Text>
                </Pressable>
              </View>
            </View> */}

            {/* <View style={styles.receiverDetailsContainer}>
              <Text style={styles.title}>Receiver Details</Text>

              <TextInput
                placeholder="Receiver’s Name"
                placeholderTextColor="#999"
                style={styles.input}
                value={userAddress.receiverName}
                onChangeText={(e) =>
                  setUserAddress({ ...userAddress, receiverName: e })
                }
                keyboardType="default"
              />

              <TextInput
                placeholder="Receiver’s Phone Number"
                placeholderTextColor="#999"
                style={styles.input}
                value={userAddress.receiverPhNum}
                keyboardType="phone-pad"
                onChangeText={(e) =>
                  setUserAddress({ ...userAddress, receiverPhNum: e })
                }
              />
            </View>

            <View style={styles.btncontainer}>
              <Pressable style={styles.btnStyling} onPress={handleSaveAddress}>
                <Text style={styles.txtStyle}>Save Address</Text>
              </Pressable>
            </View> */}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: "#F6F6F6",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderRadius: 6,
    height: 50,
    paddingHorizontal: 12,
    elevation: 0.1,
    borderWidth: 0.5,
    borderColor: "#CCC",
  },
  addAddressLabel: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  labelContainer: {
    marginTop: 8,
    flexDirection: "row",
    gap: 18,
  },
  label: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeLabel: {
    backgroundColor: "#87ef38ff",
  },
  receiverDetailsContainer: {
    marginTop: 35,
  },
  btnStyling: {
    width: "100%",
    marginTop: 12,
    backgroundColor: "#252525",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  txtStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  btncontainer: {
    marginTop: 30,
    marginBottom: 50, // keeps it above keyboard on scroll
    alignItems: "center",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
});
