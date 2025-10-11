import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Alert,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import { router, Stack } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";
import { ScrollView } from "react-native";
import InputField from "../../../../customComponents/InputField";
import Location from "../../../../assets/svgIcons/Location";
import UploadIcon from "../../../../assets/svgIcons/uploadIcon";
import RemoveImgIcon from "../../../../assets/svgIcons/removeImgIcon";
// import MultiStepProgressBar from "../../../../customComponents/MultiStepProgressBar";
import Stepper from "../../../../customComponents/Stepper";
import CourierTypeDropDown from "../../../../customComponents/courierTypeDropDown";
import { InputDropdown } from "../../../../customComponents/bookForOthers";
import CalculatorIcon from "../../../../assets/svgIcons/calculatorIcon";
import CalculatorIconBlack from "../../../../assets/svgIcons/calculatorIconBlack";
import RightArrowIcon from "../../../../assets/svgIcons/rightArrowIcon";

import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import { useState } from "react";
// import {qrCode} from "../../../screens/qrCode";

const screenHeight = Dimensions.get("window").height;

const index = () => {
  const inserts = useSafeAreaInsets();
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState(null); ///courierType
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);
  const [showEstimateOptions, setShowEstimateOptions] = useState(false);

  //MULTISTEPPER
  const steps = [
    { title: "Order Placed", date: "08-10-2025", time: "10:30 AM" },
    { title: "Picked Up", date: "08-10-2025", time: "12:00 PM" },
    { title: "In Transit", date: "08-10-2025", time: "03:00 PM" },
    { title: "Out for Delivery", date: "08-10-2025", time: "05:00 PM" },
    { title: "Delivered", date: "08-10-2025", time: "07:00 PM" },
  ];

  //UPLOADIMG
  const handleuploadImg = () => {
    // Alert.alert("Upload Image", "Choose image source", [
    //   { text: "Camera", onPress: openCamera },
    //   { text: "Gallery", onPress: openGallery },
    //   { text: "Cancel", style: "cancel" },
    // ]);
    setIsModalVisible(true);
  };
  // CAMERA
  const openCamera = async () => {
    if (images.length >= 5) {
      Alert.alert("Limit Reached", "You can only upload up to 5 images.");
      return;
    }

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera access is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      const selected = result.assets.map((asset) => asset.uri);
      const combined = [...images, ...selected];
      if (combined.length > 5) {
        // Alert.alert("Limit Reached", "Only 5 images are allowed.");
        setImages(combined.slice(0, 5)); // only keep 5
      } else {
        setImages(combined);
      }
    }
  };

  // GALLERY
  const openGallery = async () => {
    if (images.length >= 5) {
      // Alert.alert("Limit Reached", "You can only upload up to 5 images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selected = result.assets.map((asset) => asset.uri);
      const combined = [...images, ...selected];
      if (combined.length > 5) {
        // Alert.alert("Limit Reached", "Only 5 images are allowed.");
        setImages(combined.slice(0, 5));
      } else {
        setImages(combined);
      }
    }
  };

  const courierTypes = [
    { label: "Documents", value: "documents" },
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Books", value: "books" },
    { label: "Fragile Items", value: "fragile items" },
    { label: "Food Items", value: "food items" },
    { label: "Others", value: "others" },
  ];

  const courierSizes = [
    { label: "Premiuim", value: "premium" },
    { label: "Express", value: "express" },
    { label: "Economy", value: "economy" },
  ];

  const packedvalues = ["10,000/-", "20,000/-", "30,000/-", "Above  30,000/-"];

  return (
    <SafeAreaView style={{ backgroundColor: "#f8f8ff" }}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />

          {/* STACK-SCREEN-START */}
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
                      onPress={() => router.back()}
                      style={{
                        backgroundColor: "#E7E7E7",
                        padding: 6,
                        borderRadius: 16,
                        marginLeft: 20,
                      }}
                    >
                      <Feather name="chevron-left" size={20} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginLeft: 10,
                        color: "#252525",
                      }}
                    >
                      {" "}
                      Parcel Details
                    </Text>
                  </View>
                );
              },
            }}
          />
          {/* STACK-SCREEN-END */}

          <View style={styles.courierTypecard}>
            <View style={{ width: "45%", paddingTop: 14, marginLeft: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}>
                Courier Type *
              </Text>
              <CourierTypeDropDown
                data={courierTypes}
                placeholder="Select type"
                onSelect={(item) => setSelectedType(item)}
              />
            </View>

            <InputField
              inpContainer={{ width: "45%" }}
              label="Item Name *"
              style={{ fontSize: 14, fontWeight: 500 }}
              placeholder="Enter item name"
            />
          </View>
          <View style={styles.dimensionsContainer}>
            <InputField
              inpContainer={{ width: "30%" }}
              label="Width (cm) *"
              placeholder="0"
              keyboardType="numeric"
              placeholderStyle={{ fontWeight: "500", fontSize: 20 }}
            />
            <InputField
              inpContainer={{ width: "30%" }}
              label="Height (cm) *"
              keyboardType="numeric"
              placeholder="0"
            />
            <View style={{ width: "32%", marginTop: 8 }}>
              <InputField
                inpContainer={{ width: "90%" }}
                label="Weight (kg) *"
                keyboardType="numeric"
                placeholder="0"
              />
              <Text style={styles.bottomText}>500gm-999kg only</Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View style={styles.addressLabel}>
              <Location width={16} height={16} />
              <Text style={styles.labelText}>Pick up Address</Text>
            </View>
            <TextInput
              placeholder="Enter pick up address"
              style={styles.addressinp}
              placeholderTextColor="#888888"
              keyboardType="default"
            />
          </View>

          <View style={styles.addressContainer}>
            <View style={styles.addressLabel}>
              <Location width={16} height={16} />
              <Text style={styles.labelText}>Drop Address</Text>
            </View>
            <TextInput
              placeholder="Enter drop address"
              style={styles.addressinp}
              placeholderTextColor="#888888"
              keyboardType="default"
            />
          </View>

          {/* CHOOSE-SERVICE-START */}
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={[
                styles.label,
                {
                  marginBottom: 4,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#252525",
                },
              ]}
            >
              Choose Services
            </Text>
            <CourierTypeDropDown
              data={courierSizes}
              placeholder="Select type"
              onSelect={(item) => setSelectedSize(item)}
            />
          </View>

          {/* CHOOSE-SERVICE-END */}

          <View style={styles.addressContainer}>
            <Text style={styles.labelText1}>
              Special Instructions (optional){" "}
            </Text>
            <TextInput
              placeholder="Any special handling instructions..."
              style={styles.textarea}
              multiline={true}
              textAlignVertical="top"
              placeholderTextColor="#6D6D6D"
              keyboardType="textarea"
            />
          </View>

          <View style={styles.imgUploadContainer}>
            <Text style={styles.labelText1}>Package Images *</Text>
            <Pressable style={styles.imguploader} onPress={handleuploadImg}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <UploadIcon />
                <Text
                  style={{ fontSize: 12, fontWeight: "400", color: "#5D5D5D" }}
                >
                  Upload package image (max5) up-to 1mb
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: "400",
                  textAlign: "center",
                  color: "5D5D5D",
                  paddingVertical: 2,
                }}
              >
                Format: PNG & JPG
              </Text>
            </Pressable>

            <View style={styles.previewContainer}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.previewImage} />
                  <Pressable style={styles.removeIcon}>
                    <RemoveImgIcon width={10} height={10} />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>

          {/* MODAL */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.bottomModal}>
                <Text style={styles.modalTitle}>Upload Image</Text>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    openCamera();
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    openGallery();
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* BEHALF-OF-SOMEONE-STARTED */}
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <InputDropdown
              placeholder="Book on Behalf someone else"
              placeholderTextColor=""
              style={styles.textInputDropdown}
            />
          </View>
          {/* BEHALF-OF-SOMEONE-ENDED */}

          {/* INSURED START */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? "#252525" : undefined}
              style={{ borderColor: "#000000", width: 16, height: 16 }}
            />
            <Text style={{ fontSize: 11, fontWeight: "500", color: "#252525" }}>
              Insure my parcel
            </Text>
          </View>

          {isChecked && (
            <>
              <View style={styles.slotsContainer}>
                {packedvalues.map((price, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.priceButton2,
                      selectedPrice === price && styles.selectedPiceButton2,
                    ]}
                    onPress={() => setSelectedPrice(price)} // Make sure this setter exists
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.slotText2,
                        selectedPrice === price && styles.selectedPiceText,
                      ]}
                    >
                      {price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* ACCEPT-CHECKBOX-START */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  marginHorizontal: 20,
                }}
              >
                <Checkbox
                  value={isAcceptTerms}
                  onValueChange={setIsAcceptTerms}
                  color={isAcceptTerms ? "#252525" : undefined}
                  style={{ borderColor: "#000000", width: 16, height: 16 }}
                />
                <Text
                  style={{ marginLeft: 10, fontSize: 10, fontWeight: "500" }}
                >
                  I accept the insurance Terms & Conditions
                </Text>
              </View>
              {/* ACCEPT-CHECKBOX-END */}

              {/* INSURANCE-FEE */}
              <View style={styles.insuranceFeeCard}>
                <Text
                  style={{ fontSize: 14, fontWeight: 500, color: "#252525" }}
                >
                  Insurance Fee:50
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#6D6D6D",
                    paddingVertical: 3,
                  }}
                >
                  This adds protection against loss or damage during transit
                </Text>
              </View>
              {/* INSURANCE-FEE-END */}
            </>
          )}
          {/* INSURED-END */}

          <View style={styles.containers}>
            {!showEstimateOptions && (
              <TouchableOpacity
                style={styles.buttonContainers}
                onPress={() => setShowEstimateOptions(true)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 70,
                  }}
                >
                  <CalculatorIcon style={styles.iconLeft} />
                  <Text style={styles.buttonText}>Estimate Price</Text>
                </View>
                <RightArrowIcon style={styles.iconRight} />
              </TouchableOpacity>
            )}

            {showEstimateOptions && (
              <>
                <View style={styles.estimateContainer}>
                  <TouchableOpacity style={styles.estimateButton}>
                    <CalculatorIconBlack />
                    <Text style={styles.estimateText}>Estimated Price</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.priceButtons}>
                    <Text style={styles.priceText}>₹ 256</Text>
                  </TouchableOpacity>
                </View>

              {/* BUTTONS-START */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    width:"90%",
                    // borderWidth:1,
                    marginTop:40,
                    paddingBottom:30,
                  }}
                >
                  <TouchableOpacity>
                    <Text
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 65,
                        paddingVertical: 10,
                        borderRadius: 6,
                        color: "#252525",
                        fontWeight: 600,
                      }}
                    >
                      Back
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>router.navigate("/bookingSummary")}>
                    <Text
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 55,
                        paddingVertical: 10,
                        borderRadius: 6,
                        backgroundColor: "#252525",
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
                              {/* BUTTONS-END */}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8ff",
    flex: 1,
    marginTop: 20,
    marginBottom: 50,
    paddingBottom:10,
  },
  courierTypecard: {
    // borderWidth:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  dimensionsContainer: {
    // borderWidth:1,
    marginHorizontal: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomText: {
    // borderWidth: 1,
    marginTop: -7,
    marginRight: 10,
    fontSize: 10,
    fontWeight: 400,
    color: "#888888",
    textAlign: "right",
  },
  addressContainer: {
    // borderWidth:1,
    marginHorizontal: 20,
    marginBottom: 15,

    flexDirection: "column",
    // alignItems: "center",
  },
  addressinp: {
    // width:"90%",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    fontSize: 12,
    fontWeight: "500",
    height: 48,
  },
  addressLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 7,
  },
  labelText1: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 7,
    marginBottom: 5,
  },
  textarea: {
    paddingHorizontal: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    fontSize: 11,
    fontWeight: "400",
    height: 100,
  },

  imgUploadContainer: {
    marginHorizontal: 20,
    // borderWidth:1,
  },
  imguploader: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    borderRadius: 5,
    paddingVertical: 30,
    marginBottom: 10,
  },
  previewContainer: {
    flexDirection: "row",
    // borderWidth:1,
    paddingLeft: 2,
    gap: 15,
    marginTop: 8,
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 3,
    overflow: "visible",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    // backgroundColor: "#fff",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 3,
  },
  removeIcon: {
    position: "absolute",
    top: -10,
    right: -8,
    // backgroundColor: "#FFF",
    borderRadius: 1,
    elevation: 3,
    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 2,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // aligns modal at bottom
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
  },
  bottomModal: {
    height: screenHeight / 2, // half screen
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
  },
  modalButton: {
    width: "80%",
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#252525",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // borderWidth: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  insuranceFeeCard: {
    // borderWidth:1,
    width: "90%",
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#E7E7E7",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  priceButton2: {
    width: "30%", // 3 buttons per row
    paddingVertical: 10,
    borderRadius: 4,
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
  containers: {
    alignItems: "center",
    marginTop: 40,
  },
  buttonContainers: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#252525",
    paddingVertical: 12,
    paddingHorizontal: 30,
    // paddingLeft: 100,
    paddingRight: 40,
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
    width:"80%",
  },
  estimateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 6,
  },
  estimateText: {
    marginLeft: 8,
    color: "#000",
    fontSize: 12,
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
    fontSize: 14,
  },
});
