import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Platform,
  View,
  Pressable,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
// import InputField from "../../../customComponents/InputField";
import InputField from "../../components/InputField"
// import PersonIcon from "../../../assets/icons/PersonIcon";
import PersonIcon from "../../assets/svgIcons/icons/PersonIcon"
// import MailIcon from "../../../assets/icons/MailIcon";
import MailIcon from "../../assets/svgIcons/icons/MailIcon"
// import CalenderIcon from "../../../assets/icons/CalenderIcon";
import CalenderIcon from "../../assets/svgIcons/CalenderIcon"
// import CalenderIcon from "../../../assets/icons/LocationIcon";
// import CalenderIcon from "../../assets/svgIcons/CalenderIcon"
// import DownArrow from "../../../assets/icons/DownArrow";
import DownArrow from "../../assets/svgIcons/icons/DownArrow";
import DateTimePicker from "@react-native-community/datetimepicker";
// import DropDownInputfield from "../../../customComponents/DropDownInputfield";
import DropDownInputfield from "../../components/DropDownInputfield";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
// import GenderDropDown from "../../../customComponents/GenderDropDown";
import GenderDropDown from "../../components/GenderDropDown"
import { Formik } from "formik";
// import { ProfileValidationSchema } from "../../../validations/ProfileValidation";
import { ProfileValidationSchema } from "../../validations/ProfileValidation"
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import BackArrow from "../../../assets/svgs/SVGIcons/BackArrow";
import BackArrow from "../../assets/svgIcons/BackArrow";
import LocationIcon from "../../assets/svgIcons/LocationIcon";

// import AuthProvider from "../../utils/AuthProvider";
import AuthProvider from "../../utils/AuthProvider"
// import { AuthContext } from "../../utils/AuthProvider";
import { AuthContext } from "../../utils/AuthProvider"

// const ProfileScreen = () => {
//   const router = useRouter();
//   const inserts = useSafeAreaInsets();
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const {login} = useContext(AuthContext)

//   const showDatePickerHandler = () => {
//     setShowDatePicker(true);
//   };

//   return (
//     // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <View style={{flex:1,backgroundColor:"#f8f8ff"}}>
    
//     <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//         >
//           <ScrollView
//                   keyboardShouldPersistTaps="handled"
//                   contentContainerStyle={styles.scrollContainer}
//                 >

//                   <Stack.Screen options={{
//           header: () => {
//             return (
//               <View
//                 style={{
//                   backgroundColor: "#f8f8ff",
//                   paddingTop: inserts.top + 20,
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() => router.replace("/(profile)")}
//                   style={{
//                     backgroundColor: "#d7d7dcff",
//                     padding: 6,
//                     borderRadius: 16,
//                     marginLeft: 15,
//                   }}
//                 >
//                   <BackArrow width={16} height={16} />
//                 </TouchableOpacity>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     fontWeight: "500",
//                     marginLeft: 14,
//                     color: "#252525",
//                   }}
//                 >
                  
//                  My Profile
//                 </Text>
//               </View>
//             );
//           },
//         }} />



//       <View style={styles.profileScreenContainer}>
//         <StatusBar backgroundColor="white" barStyle="dark-content" />

//         <Formik
//           initialValues={{
//             name: "",
//             email: "",
//             dob: "",
//             gender: "",
//             address: "",
//           }}
//           validationSchema={ProfileValidationSchema}
//           validateOnChange={true}
//           validateOnBlur={true}
//           onSubmit={async (values, { resetForm }) => {
//             try {
//               await AsyncStorage.setItem("userProfile", JSON.stringify(values));
//               alert("submitted");
//               login();
//               resetForm();
//               router.push("/(homeScreen)");
//             } catch (error) {
//               console.log(error);
//             }
//           }}
//         >
//           {({
//             handleChange,
//             handleSubmit,
//             setFieldValue,
//             values,
//             errors,
//             resetForm,
//             touched,
//           }) => (
//             <>
//               <InputField
//                 placeholder="Jhon Doe"
//                 label="User Name*"
//                 iconComponent={<PersonIcon />}
//                 iconPosition="left"
//                 keyboardType="default"
//                 value={values.name}
//                 onChangeText={handleChange("name")}
//                 hasError={!!errors.name}
//               />
//               {errors.name && <Text style={styles.error}>{errors.name}</Text>}

//               <InputField
//                 placeholder="courierwala@.com"
//                 label="Email ID (optional)"
//                 keyboardType="email-address"
//                 iconPosition="left"
//                 iconComponent={<MailIcon />}
//                 value={values.email}
//                 onChangeText={handleChange("email")}
//                 hasError={!!errors.email}
//               />
//               {errors.email && <Text style={styles.error}>{errors.email}</Text>}

//               {/* ---------DatePicker Code--------- */}
//               <TouchableWithoutFeedback onPress={showDatePickerHandler}>
//                 <View>
//                   <InputField
//                     placeholder="dd-mm-yy"
//                     label="Date of Birth(optional)"
//                     iconComponent={<CalenderIcon />}
//                     iconStyle={styles.calenderIcon}
//                     iconPosition="right"
//                     value={values.dob}
//                     editable={false} //user cant edit manually
//                     showSoftInputOnFocus={false}
//                     pointerEvents="none"
//                     hasError={!!errors.dob}
//                   />
//                 </View>
//               </TouchableWithoutFeedback>
//               {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

//               {showDatePicker && (
//                 <DateTimePicker
//                   value={
//                     values.dob
//                       ? new Date(values.dob.split("-").reverse().join("-"))
//                       : new Date()
//                   }
//                   mode="date"
//                   display={Platform.OS === "ios" ? "spinner" : "default"}
//                   onChange={(event, selectedDate) => {
//                     setShowDatePicker(false);
//                     if (selectedDate) {
//                       const d = selectedDate
//                         .getDate()
//                         .toString()
//                         .padStart(2, "0");
//                       const m = (selectedDate.getMonth() + 1)
//                         .toString()
//                         .padStart(2, "0");
//                       const y = selectedDate.getFullYear();
//                       const formatted = `${d}-${m}-${y}`;
//                       setFieldValue("dob", formatted);
//                     }
//                   }}
//                 />
//               )}
//               {/* ---------DatePicker Code--------- */}

//               <GenderDropDown
//                 label="Gender (optional)"
//                 options={["Male", "Female", "Other"]}
//                 value={values.gender}
//                 onSelect={(val) => setFieldValue("gender", val)}
//                 hasError={!!errors.gender}
//               />
//               {errors.gender && (
//                 <Text style={styles.error}>{errors.gender}</Text>
//               )}

//               <InputField
//                 placeholder="Address"
//                 label="Enter drop address"
//                 iconComponent={<LocationIcon />}
//                 keyboardType="default"
//                 iconStyle={styles.locatinIcon}
//                 iconPosition="right"
//                 value={values.address}
//                 onChangeText={handleChange("address")}
//                 hasError={!!errors.address}
//               />
//               {errors.address && (
//                 <Text style={styles.error}>{errors.address}</Text>
//               )}

//               <View style={styles.btnsContainer}>
//                 <Pressable style={styles.btn1} onPress={() => resetForm()}>
//                   <Text style={styles.txt1}>Clear</Text>
//                 </Pressable>
//                 <Pressable style={styles.btn2} onPress={handleSubmit}>
//                   <Text style={styles.txt2}>Submit</Text>
//                 </Pressable>
//               </View>
//             </>
//           )}

//           {/* <DropDownInputfield
//           placeholder="Select Gender"
//           label="Gender(optional)"
//           value={userData.gender}
//           editable={false}
//           options={["Male", "Female", "Other"]}
//           onselect={(val) => setUserData({ ...userData, gender: val })}
//           dropdownContainer={styles.dropDown}
//           inputBox={styles.inputBox}
//           labeltext={styles.labeltext}
//           rightIcon={<DownArrow />}
//         /> */}
//         </Formik>
//       </View>
//       </ScrollView>
//       </KeyboardAvoidingView>
//     {/* // </TouchableWithoutFeedback> */}
//     </View>

//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   profileScreenContainer: {
//     marginTop: 15,
//   },
//   calenderIcon: {
//     marginRight: 20,
//   },
//   dropDown: {
//     width: "90%",
//     marginHorizontal: 20,
//     marginTop: 10,
//   },
//   inputBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",

//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#E0E0E0",
//     backgroundColor: "#fff",
//     paddingVertical: 14,
//     paddingHorizontal: 12,
//   },
//   labeltext: {
//     fontSize: 14,
//     color: "#252525",
//     marginBottom: 5,
//   },
//   btnsContainer: {
//     width: "90%",
//     marginTop: 50,
//     marginHorizontal: 22,
//     paddingHorizontal: 5,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   btn1: {
//     borderWidth: 1,
//     paddingHorizontal: 55,
//     paddingVertical: 12,
//     borderRadius: 5,
//   },
//   btn2: {
//     borderWidth: 1,
//     paddingHorizontal: 50,
//     paddingVertical: 12,
//     borderRadius: 5,
//     backgroundColor: "#252525",
//   },
//   txt1: {
//     fontWeight: "500",
//     fontSize: 17,
//   },
//   txt2: {
//     fontWeight: "500",
//     fontSize: 17,
//     color: "white",
//   },
//   locatinIcon: {
//     marginRight: 13,
//   },
//   error: {
//     color: "red",
//     fontSize: 12,
//     marginLeft: 25,
//     marginBottom: 8,
//     marginTop: -10,
//   },
// });


const ProfileScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const inserts = useSafeAreaInsets();

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };
  const isWeb = Platform.OS === "web";
  return (
    <SafeAreaView edges={["left","right"]} style={{flex:1,backgroundColor:"#f8f8ff"}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        {/* <TouchableWithoutFeedback
          onPress={() => {
            if (!isWeb) Keyboard.dismiss;
          }}
        > */}

      <Stack.Screen options={{
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "#f8f8ff",
                  paddingTop: inserts.top + 30,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
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
                  
                 My Profile
                </Text>
              </View>
         
            );
          },
        }} />












        <View style={styles.profileScreenContainer}>
          <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />

          <Formik
            initialValues={{
              name: "",
              email: "",
              dob: "",
              gender: "",
              address: "",
            }}
            validationSchema={ProfileValidationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={async (values, { resetForm }) => {
              try {
                await AsyncStorage.setItem(
                  "userProfile",
                  JSON.stringify(values)
                );
                // alert("submitted");
                resetForm();
                router.push("/(homeScreen)");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              resetForm,
              touched,
            }) => (
              <>
                <InputField
                  placeholder="Jhon Doe"
                  label="User Name*"
                  iconComponent={<PersonIcon />}
                  iconPosition="left"
                  keyboardType="default"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  hasError={!!errors.name}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <InputField
                  placeholder="courierwala@.com"
                  label="Email ID (optional)"
                  keyboardType="email-address"
                  iconPosition="left"
                  iconComponent={<MailIcon />}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  hasError={!!errors.email}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                {/* ---------DatePicker Code--------- */}
                {/* <TouchableWithoutFeedback onPress={showDatePickerHandler}> */}

                {Platform.OS === "web" ? (
                  <View style={{ marginHorizontal: 60, marginTop: 10,}}>
                    <Text style={styles.labeltext}>Date of Birth*</Text>
                    <View style={styles.inputBox}>
                      <input
                        type="date"
                        value={
                          values.dob
                            ? values.dob.split("-").reverse().join("-") // convert dd-mm-yyyy → yyyy-mm-dd
                            : ""
                        }
                        onChange={(e) => {
                          const date = e.target.value; // yyyy-mm-dd
                          const [y, m, d] = date.split("-");
                          setFieldValue("dob", `${d}-${m}-${y}`);
                        }}
                        style={{
                          flex: 1,
                          fontSize: 16,
                          border: "none",
                          outline: "none",
                          backgroundColor: "transparent",
                          height: 25,
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                      />
                      <CalenderIcon /> {/* same icon as your other fields */}
                    </View>
                    {errors.dob && (
                      <Text style={styles.weberror}>{errors.dob}</Text>
                    )}
                  </View>
                ) : (
                  <>
                    <Pressable onPress={showDatePickerHandler}>
                      <View>
                        <InputField
                          placeholder="dd-mm-yy"
                          label="Date of Birth (optional)"
                          iconComponent={<CalenderIcon />}
                          iconStyle={styles.calenderIcon}
                          iconPosition="right"
                          value={values.dob}
                          editable={false} //user cant edit manually
                          // showSoftInputOnFocus={false}
                          showSoftInputOnFocus={Platform.OS !== "web"}
                          // pointerEvents="none"
                          hasError={!!errors.dob}
                        />
                      </View>
                    </Pressable>
                    {/* </TouchableWithoutFeedback> */}
                    {errors.dob && (
                      <Text style={styles.error}>{errors.dob}</Text>
                    )}
                  </>
                )}

                {showDatePicker && (
                  <DateTimePicker
                    value={
                      values.dob
                        ? new Date(values.dob.split("-").reverse().join("-"))
                        : new Date()
                    }
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        const d = selectedDate
                          .getDate()
                          .toString()
                          .padStart(2, "0");
                        const m = (selectedDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const y = selectedDate.getFullYear();
                        const formatted = `${d}-${m}-${y}`;
                        setFieldValue("dob", formatted);
                      }
                    }}
                  />
                )}
                {/* ---------DatePicker Code--------- */}

                <GenderDropDown
                  label="Gender (optional)"
                  options={["Male", "Female", "Other"]}
                  value={values.gender}
                  onSelect={(val) => setFieldValue("gender", val)}
                  hasError={!!errors.gender && touched.gender}
                />
                {errors.gender && (
                  <Text style={styles.error}>{errors.gender}</Text>
                )}

                <InputField
                  placeholder="Enter drop address"
                  label="Address"
                  iconComponent={<LocationIcon />}
                  keyboardType="default"
                  iconStyle={styles.locatinIcon}
                  iconPosition="right"
                  value={values.address}
                  onChangeText={handleChange("address")}
                  hasError={!!errors.address}
                />
                {errors.address && (
                  <Text style={styles.error}>{errors.address}</Text>
                )}

                <View style={styles.btnsContainer}>
                  <Pressable style={styles.btn1} onPress={() => resetForm()}>
                    <Text style={styles.txt1}>Clear</Text>
                  </Pressable>
                  <Pressable style={styles.btn2} onPress={handleSubmit}>
                    <Text style={styles.txt2}>Submit</Text>
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileScreenContainer: {
    marginTop: 15,
  },
  calenderIcon: {
    marginRight: 20,
  },
  dropDown: {
    width: "90%",
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    // paddingVertical: 14,
    paddingVertical:12,
    paddingHorizontal: 12,
  },
  labeltext: {
    fontSize: 14,
    color: "#252525",
    marginBottom: 5,
  },
  btnsContainer: {
    width: "90%",
    marginTop: 50,
    marginHorizontal: 22,
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn1: {
    borderWidth: 1,
    paddingHorizontal: 55,
    paddingVertical: 12,
    borderRadius: 5,
  },
  btn2: {
    borderWidth: 1,
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: "#252525",
  },
  txt1: {
    fontWeight: "500",
    fontSize: 17,
  },
  txt2: {
    fontWeight: "500",
    fontSize: 17,
    color: "white",
  },
  locatinIcon: {
    marginRight: 13,
  },
  error: {
    color: "red",
    // borderWidth:1,
    fontSize: 12,
    marginLeft: Platform.select({ web: 70, default: 25 }),
    marginBottom: 8,
    marginTop: -10,
  },
  weberror: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
  scrollContainer: {
    // flexGrow: 1,
    // justifyContent: "flex-start",
    paddingBottom: 220,
  },
});
