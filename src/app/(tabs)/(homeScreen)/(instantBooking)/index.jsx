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
import { Formik } from "formik";
import * as Yup from "yup";

import Feather from "@expo/vector-icons/Feather";
import { ScrollView } from "react-native";
import InputField from "../../../../components/InputField";
import Location from "../../../../assets/svgIcons/Location";
import UploadIcon from "../../../../assets/svgIcons/uploadIcon";
import RemoveImgIcon from "../../../../assets/svgIcons/removeImgIcon";
import Stepper from "../../../../components/Stepper";
import CourierTypeDropDown from "../../../../components/courierTypeDropDown";
import { InputDropdown } from "../../../../components/bookForOthers";
import CalculatorIcon from "../../../../assets/svgIcons/calculatorIcon";
import CalculatorIconBlack from "../../../../assets/svgIcons/calculatorIconBlack";
import RightArrowIcon from "../../../../assets/svgIcons/rightArrowIcon";

import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { error } from "pdf-lib";

const screenHeight = Dimensions.get("window").height;

// Validation Schema
const parcelDetailsValidationSchema = Yup.object().shape({
  courierType: Yup.string().required("Courier type is required"),
  itemName: Yup.string().required("Item name is required"),
  width: Yup.number()
    .required("Width is required")
    .positive("Width must be positive")
    .min(1, "Width must be at least 1cm"),
  height: Yup.number()
    .required("Height is required")
    .positive("Height must be positive")
    .min(1, "Height must be at least 1cm"),
  weight: Yup.number()
    .required("Weight is required")
    .positive("Weight must be positive")
    .min(0.5, "Weight must be at least 0.5kg")
    .max(999, "Weight cannot exceed 999kg"),
  pickupAddress: Yup.string().required("Pickup address is required"),
  dropAddress: Yup.string().required("Drop address is required"),
  courierSize: Yup.string().required("Service type is required"),
  specialInstructions: Yup.string(),
  packageImages: Yup.array().min(1, "At least one package image is required"),
  insurance: Yup.boolean(),
  insuredValue: Yup.string().when("insurance", {
    is: true,
    then: Yup.string().required(
      "Insured value is required when insurance is selected"
    ),
  }),
  acceptInsuranceTerms: Yup.boolean().when("insurance", {
    is: true,
    then: Yup.boolean().oneOf([true], "You must accept insurance terms"),
  }),
  bookOnBehalf: Yup.object().shape({
    name: Yup.string().required("Recipient name is required"),
    mobile: Yup.string()
      .required("Recipient mobile is required")
      .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  }),
});

const index = () => {
  const inserts = useSafeAreaInsets();
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showEstimateOptions, setShowEstimateOptions] = useState(false);

  //UPLOADIMG
  const handleuploadImg = () => {
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
        setImages(combined.slice(0, 5));
      } else {
        setImages(combined);
      }
    }
  };

  // GALLERY
  const openGallery = async () => {
    if (images.length >= 5) {
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
        setImages(combined.slice(0, 5));
      } else {
        setImages(combined);
      }
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
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
    <View style={{ backgroundColor: "#f8f8ff" }}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />

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
                      Parcel Details
                    </Text>
                  </View>
                );
              },
            }}
          />

          <Formik
            initialValues={{
              courierType: "",
              itemName: "",
              width: "",
              height: "",
              weight: "",
              pickupAddress: "",
              dropAddress: "",
              courierSize: "",
              specialInstructions: "",
              packageImages: [],
              insurance: false,
              insuredValue: "",
              acceptInsuranceTerms: false,
              bookOnBehalf: { name: "", mobile: "" },
            }}
            validationSchema={parcelDetailsValidationSchema}
            onSubmit={(values) => {
              console.log("Form submitted with:", {
                ...values,
                packageImages: images,
              });
              router.push("/bookingSummary");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              setFieldTouched,
              errors,
              touched,
            }) => (
              <>
                {/* Courier Type and Item Name */}
                <View style={styles.courierTypecard}>
                  <View style={{ width: "45%", paddingTop: 14, marginLeft: 6 }}>
                    <Text
                      style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}
                    >
                      Courier Type *
                    </Text>
                    <CourierTypeDropDown
                      data={courierTypes}
                      value={selectedType?.value}
                      placeholder="Select type"
                      onSelect={(item) => {
                        setSelectedType(item);
                        setFieldValue("courierType", item.value);
                        setFieldTouched("courierType", true);
                      }}
                      selected={selectedType}
                      error={touched.courierType && errors.courierType}
                    />
                    {/* {touched.courierType && errors.courierType && (
                      <Text style={styles.errorText}>{errors.courierType}</Text>
                    )} */}
                  </View>

                  <View style={{ width: "45%" }}>
                    <InputField
                      inpContainer={{ width: "100%" }}
                      label="Item Name *"
                      style={{ fontSize: 14, fontWeight: 500 }}
                      placeholder="Enter item name"
                      value={values.itemName}
                      onChangeText={handleChange("itemName")}
                      onBlur={handleBlur("itemName")}
                      error={touched.itemName && errors.itemName}
                    />
                    {/* {touched.itemName && errors.itemName && (
                      <Text style={styles.errorText}>{errors.itemName}</Text>
                    )} */}
                  </View>
                </View>

                {/* Dimensions */}
                <View style={styles.dimensionsContainer}>
                  <View style={{ width: "30%" }}>
                    <InputField
                      inpContainer={{ width: "100%" }}
                      label="Width (cm) *"
                      placeholder="0"
                      keyboardType="numeric"
                      placeholderStyle={{ fontWeight: "500", fontSize: 20 }}
                      value={values.width}
                      onChangeText={handleChange("width")}
                      onBlur={handleBlur("width")}
                      error={touched.width && errors.width}
                    />
                    {/* {touched.width && errors.width && (
                      <Text style={styles.errorText}>{errors.width}</Text>
                    )} */}
                  </View>

                  <View style={{ width: "30%" }}>
                    <InputField
                      inpContainer={{ width: "100%" }}
                      label="Height (cm) *"
                      keyboardType="numeric"
                      placeholder="0"
                      value={values.height}
                      onChangeText={handleChange("height")}
                      onBlur={handleBlur("height")}
                      error={touched.height && errors.height}
                    />
                    {/* {touched.height && errors.height && (
                      <Text style={styles.errorText}>{errors.height}</Text>
                    )} */}
                  </View>

                  <View style={{ width: "32%", marginTop: 8 }}>
                    <InputField
                      inpContainer={{ width: "90%" }}
                      label="Weight (kg) *"
                      keyboardType="numeric"
                      placeholder="0"
                      value={values.weight}
                      onChangeText={handleChange("weight")}
                      onBlur={handleBlur("weight")}
                      error={touched.weight && errors.weight}
                    />
                    <Text style={styles.bottomText}>500gm-999kg only</Text>
                    {/* {touched.weight && errors.weight && (
                      <Text style={styles.errorText}>{errors.weight}</Text>
                    )} */}
                  </View>
                </View>

                {/* Pickup Address */}
                <View style={styles.addressContainer}>
                  <View style={styles.addressLabel}>
                    <Location width={16} height={16} />
                    <Text style={styles.labelText}>Pick up Address *</Text>
                  </View>
                  <TextInput
                    placeholder="Enter pick up address"
                    style={[
                      styles.addressinp,
                      touched.pickupAddress &&
                        errors.pickupAddress &&
                        styles.inputError,
                    ]}
                    placeholderTextColor="#888888"
                    keyboardType="default"
                    value={values.pickupAddress}
                    onChangeText={handleChange("pickupAddress")}
                    onBlur={handleBlur("pickupAddress")}
                    multiline
                  />
                  {touched.pickupAddress && errors.pickupAddress && (
                    <Text style={styles.errorText}>{errors.pickupAddress}</Text>
                  )}
                </View>

                {/* Drop Address */}
                <View style={styles.addressContainer}>
                  <View style={styles.addressLabel}>
                    <Location width={16} height={16} />
                    <Text style={styles.labelText}>Drop Address *</Text>
                  </View>
                  <TextInput
                    placeholder="Enter drop address"
                    style={[
                      styles.addressinp,
                      touched.dropAddress &&
                        errors.dropAddress &&
                        styles.inputError,
                    ]}
                    placeholderTextColor="#888888"
                    keyboardType="default"
                    value={values.dropAddress}
                    onChangeText={handleChange("dropAddress")}
                    onBlur={handleBlur("dropAddress")}
                    multiline
                  />
                  {touched.dropAddress && errors.dropAddress && (
                    <Text style={styles.errorText}>{errors.dropAddress}</Text>
                  )}
                </View>

                {/* Choose Services */}
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
                    Choose Services *
                  </Text>
                  <CourierTypeDropDown
                    data={courierSizes}
                    value={selectedType?.value}
                    placeholder="Select type"
                    onSelect={(item) => {
                      setSelectedSize(item);
                      setFieldValue("courierSize", item.value);
                      setFieldTouched("courierSize", true);
                    }}
                    selected={selectedSize}
                    error={touched.courierSize && errors.courierSize}
                  />
                  {/* {touched.courierSize && errors.courierSize && (
                    <Text style={styles.errorText}>{errors.courierSize}</Text>
                  )} */}
                </View>

                {/* Special Instructions */}
                <View style={styles.addressContainer}>
                  <Text style={styles.labelText1}>
                    Special Instructions (optional)
                  </Text>
                  <TextInput
                    placeholder="Any special handling instructions..."
                    style={styles.textarea}
                    multiline={true}
                    textAlignVertical="top"
                    placeholderTextColor="#6D6D6D"
                    value={values.specialInstructions}
                    onChangeText={handleChange("specialInstructions")}
                    onBlur={handleBlur("specialInstructions")}
                  />
                </View>

                <View style={styles.imgUploadContainer}>
                  <Text style={styles.labelText1}>Package Images *</Text>
                  <Pressable
                    style={[
                      styles.imguploader,
                      touched.packageImages &&
                        errors.packageImages &&
                        styles.inputError,
                    ]}
                    onPress={() => {
                      setFieldTouched("packageImages", true);
                      handleuploadImg();
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <UploadIcon />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "400",
                          color: "#5D5D5D",
                        }}
                      >
                        Upload package image (max5) up-to 1mb
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: "400",
                        textAlign: "center",
                        color: "#5D5D5D",
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
                        <Pressable
                          style={styles.removeIcon}
                          onPress={() => {
                            setFieldTouched("packageImages", true);
                            removeImage(index);
                          }}
                        >
                          <RemoveImgIcon width={10} height={10} />
                        </Pressable>
                      </View>
                    ))}
                  </View>

                  {/* Show package images error below the images */}
                  {touched.packageImages && errors.packageImages && (
                    <Text style={styles.errorText}>{errors.packageImages}</Text>
                  )}
                </View>
                {/* Upload Image Modal */}
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
                        style={[
                          styles.modalButton,
                          { backgroundColor: "#ccc" },
                        ]}
                        onPress={() => setIsModalVisible(false)}
                      >
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

             <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
  <InputDropdown
    placeholder="Book on Behalf someone else"
    style={styles.textInputDropdown}  
    value={values.bookOnBehalf}
    onSelect={(val) => {
      setFieldValue("bookOnBehalf", val);
      setFieldTouched("bookOnBehalf", true);
    }}
    onBlur={() => setFieldTouched("bookOnBehalf", true)}
    error={touched.bookOnBehalf && errors.bookOnBehalf}
  />

 
  {/* {touched.bookOnBehalf?.name && errors.bookOnBehalf?.name && (
    <Text style={styles.errorText}>{errors.bookOnBehalf.name}</Text>
  )}
  {touched.bookOnBehalf?.mobile && errors.bookOnBehalf?.mobile && (
    <Text style={styles.errorText}>{errors.bookOnBehalf.mobile}</Text>
  )} */}
</View>


                {/* Insurance Section */}
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={values.insurance}
                    onValueChange={(value) => {
                      setFieldValue("insurance", value);
                      setFieldTouched("insurance", true);

                      // Reset insurance-related fields when insurance is turned off
                      if (!value) {
                        setFieldValue("insuredValue", "");
                        setFieldValue("acceptInsuranceTerms", false);
                        setSelectedPrice(null);
                      }
                    }}
                    color={values.insurance ? "#252525" : undefined}
                    style={{ borderColor: "#000000", width: 16, height: 16 }}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      color: "#252525",
                    }}
                  >
                    Insure my parcel
                  </Text>
                </View>
                {touched.insurance && errors.insurance && (
                  <Text style={styles.errorText}>{errors.insurance}</Text>
                )}

                {values.insurance && (
                  <>
                    <View style={styles.slotsContainer}>
                      {packedvalues.map((price, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.priceButton2,
                            values.insuredValue === price &&
                              styles.selectedPiceButton2,
                          ]}
                          onPress={() => {
                            setSelectedPrice(price);
                            setFieldValue("insuredValue", price);
                            setFieldTouched("insuredValue", true);
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.slotText2,
                              values.insuredValue === price &&
                                styles.selectedPiceText,
                            ]}
                          >
                            {price}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {touched.insuredValue && errors.insuredValue && (
                      <Text style={styles.errorText}>
                        {errors.insuredValue}
                      </Text>
                    )}

                    {/* Accept Insurance Terms */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        marginHorizontal: 20,
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        value={values.acceptInsuranceTerms}
                        onValueChange={(value) => {
                          setFieldValue("acceptInsuranceTerms", value);
                          setFieldTouched("acceptInsuranceTerms", true);
                        }}
                        color={
                          values.acceptInsuranceTerms ? "#252525" : undefined
                        }
                        style={{
                          borderColor: "#000000",
                          width: 16,
                          height: 16,
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 10,
                          fontWeight: "500",
                          flex: 1,
                        }}
                      >
                        I accept the insurance Terms & Conditions
                      </Text>
                    </View>
                    {touched.acceptInsuranceTerms &&
                      errors.acceptInsuranceTerms && (
                        <Text style={styles.errorText}>
                          {errors.acceptInsuranceTerms}
                        </Text>
                      )}

                    {/* Insurance Fee */}
                    <View style={styles.insuranceFeeCard}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#252525",
                        }}
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
                        This adds protection against loss or damage during
                        transit
                      </Text>
                    </View>
                  </>
                )}

                {/* Estimate Price Section */}
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
                          <Text style={styles.estimateText}>
                            Estimated Price
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.priceButtons}>
                          <Text style={styles.priceText}>₹ 256</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Buttons */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 10,
                          marginTop: 40,
                          marginBottom: 10,
                          paddingVertical: 20,
                          width: "90%",
                        }}
                      >
                        <TouchableOpacity onPress={() => router.back()}>
                          <Text
                            style={{
                              borderWidth: 1,
                              paddingHorizontal: 63,
                              paddingVertical: 10,
                              borderRadius: 6,
                              color: "#252525",
                              fontWeight: "600",
                            }}
                          >
                            Back
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit}>
                          <Text
                            style={{
                              borderWidth: 1,
                              paddingHorizontal: 47,
                              paddingVertical: 10,
                              borderRadius: 6,
                              backgroundColor: "#093C31",
                              color: "#FFFFFF",
                              fontWeight: "400",
                            }}
                          >
                            Continue
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8ff",
    flex: 1,
    marginTop: 20,
    marginBottom: 50,
    paddingBottom: 10,
  },
  courierTypecard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  dimensionsContainer: {
    marginHorizontal: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomText: {
    marginTop: -7,
    marginRight: 10,
    fontSize: 10,
    fontWeight: 400,
    color: "#888888",
    textAlign: "right",
  },
  addressContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    flexDirection: "column",
  },
  addressinp: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    fontSize: 12,
    fontWeight: "500",
    height: 48,
  },
  inputError: {
    borderColor: "red",
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
    borderColor: "#E0E0E0",
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
    borderRadius: 1,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomModal: {
    height: screenHeight / 2,
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
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  insuranceFeeCard: {
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
    width: "30%",
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#E7E7E7",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedPiceButton2: {
    backgroundColor: "#093C31",
    borderColor: "#093C31",
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
    marginBottom: 25,
  },
  buttonContainers: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#093C31",
    paddingVertical: 12,
    paddingHorizontal: 30,
    paddingRight: 40,
    borderRadius: 10,
    marginBottom: 30,
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
    width: "80%",
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
    backgroundColor: "#093C31",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  priceText: {
    color: "#F6F6F6",
    fontWeight: "600",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginTop: 4,
    marginLeft: 5,
  },
});
