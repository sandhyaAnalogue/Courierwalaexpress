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
// import InputField from "../../../../components/InputField";
import Location from "../../../../assets/svgIcons/Location";
import UploadIcon from "../../../../assets/svgIcons/uploadIcon";
import RemoveImgIcon from "../../../../assets/svgIcons/removeImgIcon";
// import Stepper from "../../../../components/Stepper";
import CourierTypeDropDown from "../../../../components/courierTypeDropDown";
import { InputDropdown } from "../../../../components/bookForOthers";
import CalculatorIcon from "../../../../assets/svgIcons/calculatorIcon";
import CalculatorIconBlack from "../../../../assets/svgIcons/calculatorIconBlack";
import RightArrowIcon from "../../../../assets/svgIcons/rightArrowIcon";
import CustomInput from "../../../../components/CustomInput";

import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import { useState } from "react";
// import { error, values } from "pdf-lib";
import { instantBooking } from "../../../../services/apiCalls";
import { EstimatePrice } from "../../../../services/apiCalls";

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

  pickupLocation: Yup.object().shape({
    address: Yup.string().required("Pickup address is required"),
  }),
  dropLocation: Yup.object().shape({
    address: Yup.string().required("Drop address is required"),
  }),

  courierSize: Yup.string().required("Service type is required"),
  specialInstructions: Yup.string(),

  insurance: Yup.boolean(),
  //  insuredValue: Yup.string().test(
  //     "insuredValue-required",
  //     "Insured value is required when insurance is selected",
  //     function (value) {
  //       const { insurance } = this.parent;
  //       return !insurance || (insurance && value && value.trim() !== "");
  //     }
  //   ),
  //  acceptInsuranceTerms: Yup.boolean().test(
  //     "acceptInsuranceTerms-required",
  //     "You must accept insurance terms",
  //     function (value) {
  //       const { insurance } = this.parent;
  //       return !insurance || (insurance && value === false);
  //     }
  //   ),

  // recipientName: Yup.string().required("Recipient name is required"),
  // recipientContact: Yup.string()
  //   .required("Recipient mobile is required")
  //   .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number"),

  recipientName: Yup.string().when("isBookingForSomeoneElse", {
    is: true,
    then: (schema) => schema.required("Recipient name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  recipientContact: Yup.string().when("isBookingForSomeoneElse", {
    is: true,
    then: (schema) =>
      schema
        .required("Recipient contact is required")
        .matches(/^\d{10}$/, "Enter valid 10 digit number"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// const parcelDetailsValidationSchema = Yup.object().shape({
//   courierType: Yup.string()
//     .required("Courier type is required"),

//   itemName: Yup.string()
//     .required("Item name is required"),

//   width: Yup.number()
//     .nullable()
//     .required("Width is required")
//     .positive("Width must be positive")
//     .min(1, "Width must be at least 1cm"),

//   height: Yup.number()
//     .nullable()
//     .required("Height is required")
//     .positive("Height must be positive")
//     .min(1, "Height must be at least 1cm"),

//   weight: Yup.number()
//     .nullable()
//     .required("Weight is required")
//     .positive("Weight must be positive")
//     .min(0.5, "Weight must be at least 0.5kg")
//     .max(999, "Weight cannot exceed 999kg"),

//   pickupLocation: Yup.object().shape({
//     address: Yup.string().required("Pickup address is required"),
//     latitude: Yup.string().nullable(),
//     longitude: Yup.string().nullable(),
//   }),

//   dropLocation: Yup.object().shape({
//     address: Yup.string().required("Drop address is required"),
//     latitude: Yup.string().nullable(),
//     longitude: Yup.string().nullable(),
//   }),

//   courierSize: Yup.string()
//     .required("Service type is required"),

//   specialInstructions: Yup.string(),

//   insurance: Yup.boolean(),

//   insuredValue: Yup.string().when("insurance", {
//     is: true,
//     then: Yup.string().required("Insured value is required when insurance is selected"),
//     otherwise: Yup.string().notRequired(),
//   }),

//   acceptInsuranceTerms: Yup.boolean().when("insurance", {
//     is: true,
//     then: Yup.boolean().oneOf([true], "You must accept insurance terms"),
//     otherwise: Yup.boolean().notRequired(),
//   }),

//   recipientName: Yup.string()
//     .required("Recipient name is required"),

//   recipientContact: Yup.string()
//     .required("Recipient mobile is required")
//     .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
// })
const index = () => {
  const inserts = useSafeAreaInsets();
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showEstimateOptions, setShowEstimateOptions] = useState(false);
  const [isBookingForSomeoneElse, setIsBookingForSomeoneElse] = useState(false);
  const [isInsured, setIsInsured] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [acceptInsuranceTerms, setAcceptInsuranceTerms] = useState(false);
  const [insureError, setInsureError] = useState("");
  const [estimatePrice, setEstimatePrice] = useState(null);

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

  const packedvalues = ["10,000", "20,000", "30,000", "Above  30,000"];

  const handleEstimatePrice = async (values) => {
    console.log("apihitting");
    console.log(insureError, "INSUREeRROR");
    console.log(isInsured, "IsInsured");
    console.log(acceptInsuranceTerms, "ACCEPT");
    console.log(selectedPrice, "selectPrice");

    if (isInsured) {
      if (!selectedPrice) {
        setInsureError("Please select an insurance amount");
        return;
      }
      if (!acceptInsuranceTerms) {
        setInsureError("Please accept the insurance Terms & Conditions");
        return;
      }
    }
    setInsureError("");

    try {
      const formdata = new FormData();
     
      formdata.append("width", values.width);
      formdata.append("height", values.height);
      formdata.append("weight", values.weight);
      formdata.append("isInsured", isInsured);
      formdata.append("packagevalue", selectedPrice);
      

      const res = await EstimatePrice(formdata);
      if (res.status === 200) {
        console.log("success response", res?.data);
        setEstimatePrice(res?.data.estimatedPrice);
      }
      setShowEstimateOptions(true);
    } catch (error) {
      console.log(error.response, "error from api//////////////");
    }
  };

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
              width: null,
              height: null,
              weight: null,
              pickupLocation: {
                address: "",
                latitude: "17.27856598171986",
                longitude: "78.54647018465576",
              },
              dropLocation: {
                address: "",
                latitude: "17.27856598171986",
                longitude: "78.54647018465576",
              },
              courierSize: "",
              specialInstructions: "",

              insurance: false,
              insuredValue: "",
              acceptInsuranceTerms: false,
              packagevalue: "",
              // acceptInsuranceTerms: false,
              isBookingForSomeoneElse: false,

              recipientName: "",
              recipientContact: "6666677777",
            }}
            validationSchema={parcelDetailsValidationSchema}
            onSubmit={(values) => handleEstimatePrice(values)}
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
                {console.log("formik error", errors)}
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
                      value={values?.courierType}
                      placeholder="Select type"
                      onSelect={(item) => {
                        setSelectedType(item);
                        setFieldValue("courierType", item.value);
                        // setFieldTouched("courierType", true);
                      }}
                      selected={selectedType}
                      error={touched.courierType && errors.courierType}
                    />
                  </View>

                  <View style={{ width: "45%" }}>
                    <CustomInput
                      inpContainer={{}}
                      inpLabel="Item Name *"
                      style={[{ fontSize: 14, fontWeight: 500 }]}
                      placeholder="Enter item name"
                      value={values.itemName}
                      onChangeText={handleChange("itemName")}
                      onBlur={handleBlur("itemName")}
                      error={touched.itemName && errors.itemName}
                    />
                  </View>
                </View>

                {/* Dimensions */}
                <View style={styles.dimensionsContainer}>
                  <View style={{ width: "30%" }}>
                    <CustomInput
                      inpContainer={{ width: "100%" }}
                      inpLabel="Width (cm) *"
                      placeholder="0"
                      keyboardType="numeric"
                      placeholderStyle={{ fontWeight: "500", fontSize: 20 }}
                      value={values.width}
                      onChangeText={(text) =>
                        setFieldValue("width", text ? Number(text) : null)
                      }
                      onBlur={handleBlur("width")}
                      error={touched.width && errors.width}
                    />
                    {/* {touched.width && errors.width && (
                      <Text style={styles.errorText}>{errors.width}</Text>
                    )} */}
                  </View>

                  <View style={{ width: "30%" }}>
                    <CustomInput
                      inpContainer={{ width: "100%" }}
                      inpLabel="Height (cm) *"
                      keyboardType="numeric"
                      placeholder="0"
                      value={values.height}
                      onChangeText={(text) =>
                        setFieldValue("height", text ? Number(text) : null)
                      }
                      onBlur={handleBlur("height")}
                      error={touched.height && errors.height}
                    />
                    {/* {touched.height && errors.height && (
                      <Text style={styles.errorText}>{errors.height}</Text>
                    )} */}
                  </View>

                  <View style={{ width: "33%", marginTop: 8 }}>
                    <CustomInput
                      inpContainer={{ width: "100%" }}
                      inpLabel="Weight (kg) *"
                      keyboardType="numeric"
                      placeholder="0"
                      value={values.weight}
                      onChangeText={(text) =>
                        setFieldValue("weight", text ? Number(text) : null)
                      }
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
                      touched.pickupLocation &&
                        errors.pickupLocation &&
                        styles.inputError,
                    ]}
                    placeholderTextColor="#888888"
                    keyboardType="default"
                    value={values.pickupLocation.address}
                    onChangeText={(text) =>
                      setFieldValue("pickupLocation.address", text)
                    }
                    onBlur={() =>
                      setFieldTouched("pickupLocation.address", true)
                    }
                    multiline
                  />
                  {touched.pickupLocation?.address &&
                    errors.pickupLocation?.address && (
                      <Text style={styles.errorText}>
                        {errors.pickupLocation.address}
                      </Text>
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
                      touched.dropLocation &&
                        errors.dropLocation &&
                        styles.inputError,
                    ]}
                    placeholderTextColor="#888888"
                    keyboardType="default"
                    value={values.dropLocation.address}
                    onChangeText={(text) =>
                      setFieldValue("dropLocation.address", text)
                    }
                    onBlur={() => setFieldTouched("dropLocation.address", true)}
                    multiline
                  />
                  {touched.dropLocation?.address &&
                    errors.dropLocation?.address && (
                      <Text style={styles.errorText}>
                        {errors.dropLocation.address}
                      </Text>
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
                    value={values?.courierSize}
                    placeholder="Select type"
                    onSelect={(item) => {
                      console.log("item", item);
                      setSelectedSize(item);
                      setFieldValue("courierSize", item.value);
                      // setFieldTouched("courierSize", true);
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
                    style={[styles.imguploader]}
                    onPress={() => {
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
                            removeImage(index);
                          }}
                        >
                          <RemoveImgIcon width={10} height={10} />
                        </Pressable>
                      </View>
                    ))}
                  </View>

                  {/* Show package images error below the images */}
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
                  {/* <InputDropdown
                    placeholder="Book on Behalf someone else"
                    style={styles.textInputDropdown}
                    inp1={values.recipientName}
                    inp2={values.recipientContact}
                    onSelect={(val) => {
                      setFieldValue("recipientName", val);
                    }}
                    onBlur={() => setFieldTouched("recipientName", true)}
                    error={touched.recipientName && errors.recipientName}
                  /> */}

                  <InputDropdown
                    placeholder="Book on Behalf someone else"
                    isBooking={() => {
                      setIsBookingForSomeoneElse(!isBookingForSomeoneElse);
                      setFieldValue(
                        "isBookingForSomeoneElse",
                        !isBookingForSomeoneElse
                      );
                    }}
                    value1={values.recipientName}
                    value2={values.recipientContact}
                    onChange1={(value) => {
                      setFieldValue("recipientName", value);
                    }}
                    onChange2={(value) => {
                      setFieldValue("recipientContact", value);
                    }}
                    // onChange2={handleChange("recipientContact")}
                    onBlur1={handleBlur("recipientName")}
                    onBlur2={handleBlur("recipientContact")}
                    // error1={touched.recipientName && errors.recipientName}
                    // error2={touched.recipientContact && errors.recipientContact}
                  />
                  {isBookingForSomeoneElse &&
                    (!values.recipientName || !values.recipientContact) && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 5 }}
                      >
                        Please fill recipient name and contact before proceeding
                      </Text>
                    )}
                </View>

                {/* Insurance Section */}
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={isInsured}
                    onValueChange={(value) => {
                      setIsInsured(value);
                      // if (!value) {
                      //   setSelectedPrice(null);
                      //   setAcceptInsuranceTerms(false);
                      //   setInsureError("");
                      // }
                    }}
                    color={values.isInsured ? "#252525" : undefined}
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

                {isInsured && (
                  <>
                    <View style={styles.slotsContainer}>
                      {packedvalues.map((price, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.priceButton2,

                            selectedPrice === price &&
                              styles.selectedPiceButton2,
                          ]}
                          onPress={() => {
                            setSelectedPrice(price);
                            setInsureError("");
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.slotText2,
                              selectedPrice === price &&
                                styles.selectedPiceText,
                            ]}
                          >
                            {price}/-
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

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
                        value={acceptInsuranceTerms}
                        onValueChange={(value) => {
                          setAcceptInsuranceTerms(value);
                          setInsureError("");
                        }}
                        color={acceptInsuranceTerms ? "#252525" : undefined}
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
                    {insureError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: 12,
                          marginTop: 6,
                          marginHorizontal: 13,
                        }}
                      >
                        {insureError}
                      </Text>
                    ) : null}
                  </>
                )}

                {/* Estimate Price Section */}
                <View style={styles.containers}>
                  {!showEstimateOptions && (
                    <TouchableOpacity
                      style={styles.buttonContainers}
                      // onPress={() => setShowEstimateOptions(true)}
                      onPress={() => {
                        console.log("errors", errors);

                        handleSubmit();
                      }}
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
                          <Text style={styles.priceText}>
                            ₹ {estimatePrice}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Buttons */}
                      <View
                        // onPress={
                        //   ()=>{
                        //     const data={

                        //     }
                        //     router.push({
                        //       pathname:"/f",
                        //       params:{
                        //         data:JSON.stringify(data)
                        //       }
                        //     })
                        //   }
                        // }
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
                        <TouchableOpacity
                          onPress={() => {
                            const data = {
                              courierType: values.courierType,
                              itemName: values.itemName,
                              width: values.width,
                              height: values.height,
                              weight: values.weight,
                              bookingMode:values.courierSize,
                              pickupAddress: values.pickupLocation.address,
                              dropAddress: values.dropLocation.address,
                              specialInstructions: values.specialInstructions,
                              isBookingForSomeoneElse:
                                values.isBookingForSomeoneElse,
                              recipientName: values.recipientName,
                              recipientContact: values.recipientContact,
                              isInsured: isInsured,
                              packagevalue: selectedPrice,
                              estimatedPrice: estimatePrice,
                              packageImages: images,
                              // selectedPrice:selectedPrice,
                              pickupLatitude: values.pickupLocation.latitude,
                              pickupLongitude: values.pickupLocation.longitude,
                              dropLatitude: values.dropLocation.longitude,
                              dropLongitude: values.dropLocation.longitude,
                            };
                            router.push({
                              pathname: "/bookingSummary",
                              params: {
                                parcelData: JSON.stringify(data),
                              },
                            });
                          }}
                        >
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
    // borderWidth:1,
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
    color: "#FFFFFF",
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
    marginLeft: 5,
  },
});
