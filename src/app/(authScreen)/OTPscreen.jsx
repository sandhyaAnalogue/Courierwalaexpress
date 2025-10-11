import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,Platform
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { TextInput } from "react-native";
// import Button from "../../../customComponents/Button";
import Button from "../../customComponents/Button";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AlertModel from "../../customComponents/AlertModel";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
// import { Keyboard } from "react-native";
// import { ImageBackground } from "react-native";

const OTPForm = () => {
  // const isFocused = useIsFocused();

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [currentOtp, setCurentOtp] = useState();
  const [timer, setTimer] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const handleChange = (text, index) => {
    // console.log(otp,"otp")
    const newOtp = [...otp];
    // console.log(newOtp,"newOtp")
    newOtp[index] = text;
    setOtp(newOtp);
    //  console.log("Current OTP:", newOtp.join(""));
    setCurentOtp(newOtp.join(""));
    //  console.log(currentOtp,"current Otp")

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  //TIMER FUNCTION
  const startTimer = () => {
    setTimer(60);
    setIsRunning(true);
    setShowTimer(true);
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    const firstEmptyBox = otp.findIndex((digit) => digit === "");

    if (firstEmptyBox !== -1 && inputRefs.current[firstEmptyBox]) {
      inputRefs.current[firstEmptyBox].focus();
    }
  }, [otp]);
  

  //TimerFunction
  const handleTimerFunction = () => {
    setAttempts((prev) => prev + 1);
    console.log(attempts, "attempts");
    

    if (attempts >= 3) {
      setShowCustomAlert(true);
      console.log(showCustomAlert, "customAlert");
      return;
    }

    if (currentOtp?.length === 6) {
      // setTimer(60);
      // setIsRunning(true);
      // setShowTimer(true);
      setError("");
      router.replace("/AuthProfile");

      //    const focusedIndex = otp.findIndex((digit, i) => inputRefs.current[i]?.isFocused());
      // if (focusedIndex !== -1) {
      //   inputRefs.current[focusedIndex].blur();
      // }

      // Keyboard.dismiss();
    } else {
      setError("*Please enter valid OTP");
    }
  };
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsRunning(false);
            return prev - 1;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  

  //RESEND FUNCTION:
  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setCurentOtp("");
    startTimer();
    setTimer(60);
    setIsRunning(true);
    setShowTimer(true);
    setError("");
  };

  return (
    // <KeyboardAwareScrollView
    // extraScrollHeight={10}
    // enableOnAndroid={true}
    // keyboardShouldPersistTaps="handled"
    // contentContainerStyle={styles.scrollContainer}
    // >
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.otpContainer}>
          <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />
          {/* IMAGE */}
          <View style={{ alignItems: "center" }}>
            <Image
              // source={require("../../../assets/pngs/appImg.png")}
              source={require("../../assets/pngs/appImg.png")}
              // style={{ width: 300, height: 300 }}
              style={{ width: 310, height: 200,marginLeft:-50,}}
            />
          </View>

          <View style={styles.otpText}>
            <Text style={styles.text}>OTP Verification</Text>
          </View>

          <View style={styles.enterOtpContainer}>
            <Text style={styles.enterOtp}>Enter the OTP</Text>
            <Text style={styles.enterOtpText}>
              A 6 digit code is sent to your mobile number
            </Text>
          </View>
          <View style={styles.container}>
            {otp.map((val, index) => (
              <TextInput
                key={index}
                value={otp[index]}
                keyboardType="numeric"
                maxLength={1}
                ref={(input) => (inputRefs.current[index] = input)}
                onKeyPress={(input) => handleKeyPress(input, index)}
                onChangeText={(text) => handleChange(text, index)}
                style={[styles.input, error ? styles.errorBorder : null]}
              />
            ))}
          </View>
          {error ? (
            <Text style={{ color: "red", marginLeft: 20, marginTop: 8 }}>
              {error}
            </Text>
          ) : null}

          <View style={styles.bottonContainer}>
            <Button
              ButtonName="Submit"
              borderWidth={1}
              backgroundColor="#252525"
              color="#FFFFFF"
              paddingVertical={8}
              fontWeight="600"
              fontSize={14}
              onPress={handleTimerFunction}
            />
          </View>

          <View>
            {showTimer &&
              (isRunning ? (
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 30,
                    fontSize: 12,
                    color: "#5D5D5D",
                  }}
                >
                  0.{timer} sec
                </Text>
              ) : (
                <Text
                  onPress={handleResend}
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 14,
                    color: "#5D5D5D",
                  }}
                >
                  RESEND
                </Text>
              ))}

            <View>
              <AlertModel
                visible={showCustomAlert}
                onClose={() => setShowCustomAlert(false)}
              />
            </View>
          </View>

          <View style={{ height: 200 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    // </KeyboardAwareScrollView>
  );
};

export default OTPForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    // borderWidth:1,
    gap:3,
  },
  enterOtpContainer: {
    // borderWidth:1,
    marginLeft: 20,
  },
  enterOtp: {
    fontSize: 18,
    fontWeight:500,
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
  },
  otpContainer: {
    flex: 1,
    marginTop: 30,
    backgroundColor:"#f8f8ff",
    // alignItems:"center",
    // justifyContent:"center",
  },
  otpText: {
    marginLeft: 20,
    marginBottom: 30,
    marginTop:20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 49,
    height: 49,
    textAlign: "center",
    fontSize: 18,
    // backgroundColor: "#fff",
  },
  errorBorder: {
    borderColor: "red", // Make sure to add this style
  },
  enterOtpText: {
    color: "#b6b5b5ff",
    fontSize:12,
    fontWeight:400,
  },
  bottonContainer: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  bg: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.9,
  },
});
