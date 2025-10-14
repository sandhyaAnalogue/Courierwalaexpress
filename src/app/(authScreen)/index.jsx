import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import PhNumInput from "../../components/PhNum";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
// import { router } from "expo-router";
import { useRouter } from "expo-router";

import { useContext } from "react";
import { AuthContext } from "../../utils/AuthProvider";

import { loginApi } from "../../services/apiCalls";
import Loading from "../../components/Loading";

const Login = () => {
  // const isFocused = useIsFocused();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const phoneValidationSchema = Yup.object().shape({
    userPhNum: Yup.string()
      .required("Mobile number is required")
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number"),
  });

  const handleOtp = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("phoneNumber", values.userPhNum);

      const phNumRes = await loginApi(formdata);
      // console.log("sucess", phNumRes);

      if (phNumRes?.data?.token) {
     
        console.log(values.userPhNum, "userNumber");
        console.log(phNumRes.data.otp, "otp");

        login(phNumRes.data.token);
        resetForm();
        router.push("/OTPscreen");
      } else {
        Alert.alert(
          "Error",
          phNumRes.data?.message || "Unknown server response"
        );
      }
    } catch (error) {
      if (error.response) {
        const errorRes = error.response.data?.message || "Something went wrong";
        Alert.alert("Error", errorRes);
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "Cannot reach server. Check your connection."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = () => {
    alert("Under Process");
  };
  return (
    <>
      {/* {isFocused && <StatusBar backgroundColor="black" barStyle="light-content" />} */}
      {/* <KeyboardAwareScrollView
        extraScrollHeight={10}
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
         style={{ flex: 1 }}
      > */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.loginContainer}>
            <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />
            <View style={{ alignItems: "center", marginTop: 35 }}>
              <Image
                source={require("../../assets/pngs/appImg.png")}
                style={{ width: 310, height: 200, marginLeft: -50 }}
              />
            </View>
            <>
              <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>LOGIN</Text>
              </View>

              <Formik
                initialValues={{ userPhNum: "" }}
                validationSchema={phoneValidationSchema}
                onSubmit={handleOtp}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  handleBlur,
                }) => (
                  <>
                    <View style={[styles.inputContainer]}>
                      <PhNumInput
                        placeholder="Enter 10 digit mobile number"
                        style={[
                          styles.input,
                          touched.userPhNum && errors.userPhNum
                            ? { borderWidth: 1, borderColor: "red" }
                            : {},
                        ]}
                        label="Enter Mobile number"
                        keyboardType="number-pad"
                        maxLength={10}
                        value={values.userPhNum}
                        onChangeText={handleChange("userPhNum")}
                        onBlur={handleBlur("userPhNum")}
                      />
                      {errors.userPhNum && (
                        <Text
                          style={{
                            color: "red",
                            borderColor: "red",
                            marginLeft: 20,
                            marginTop: -10,
                            // borderWidth:1,
                          }}
                        >
                          {errors.userPhNum}
                        </Text>
                      )}
                    </View>

                    <View style={styles.buttonContainer}>
                      <Button
                        ButtonName="Send OTP"
                        color="#FFFFFF"
                        fontSize={14}
                        paddingVertical={8}
                        fontWeight={600}
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </>
                )}
              </Formik>

              <View style={styles.GooglebuttonContainer}>
                <Image
                  // source={require("../../../assets/pngs/google.png")}
                  source={require("../../assets/pngs/google.png")}
                  style={styles.googleIcon}
                />
                <Button
                  onPress={handleGoogleSignin}
                  ButtonName="Sign in With Google"
                  paddingVertical={7}
                />
              </View>
            </>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* </KeyboardAwareScrollView> */}
      <Loading visible={loading}/>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    // marginTop: 40,
    backgroundColor: "#f8f8ff",
    paddingBottom: 40,
  },
  inputContainer: {
    // backgroundColor:"pink",
    // width:200,
    marginLeft: 20,
    // marginRight:20,
    // borderWidth:10,
  },
  input: {
    // backgroundColor:"yellow",
    // marginLeft: 20,
    paddingVertical: 7,
  },
  loginTextContainer: {
    marginLeft: 20,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 28,
    fontWeight: "600",
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    backgroundColor: "#093C31",
    borderRadius: 10,
  },
  GooglebuttonContainer: {
    // width: 345,
    borderRadius: 8,
    marginLeft: 20,
    // marginRight:20,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"pink",
    borderWidth: 1,
    marginRight: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    //   justifyContent: "flex-start",
    // paddingBottom: 100,
    justifyContent: "flex-start",
  },
});
