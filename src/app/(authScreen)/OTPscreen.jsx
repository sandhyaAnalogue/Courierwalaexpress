import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { TextInput } from "react-native";
import Button from "../../components/Button";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AlertModel from "../../components/AlertModel";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
// import { Keyboard } from "react-native";
// import { ImageBackground } from "react-native";
import {
  otpVerification,
  resendOtpVerification,
} from "../../services/apiCalls";
import HybridStorage from "../../utils/helpers/HybridStorage";
import Loading from "../../components/Loading";

const OTPForm = () => {
  // const isFocused = useIsFocused();

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [currentOtp, setCurrentOtp] = useState("");
  const [timer, setTimer] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [token, setToken] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await HybridStorage.getItem("token");
        console.log("Token from HybridStorage:", storedToken);
        setToken(storedToken);
      } catch (error) {
        console.log("Error fetching token:", error);
      }
    };

    loadToken();
  }, []);

  const handleChange = (text, index) => {
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = text;
      setCurrentOtp(newOtp.join(""));
      return newOtp;
    });

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
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
  const handleSubmit = async () => {
    setLoading(true);
    if (isLocked) {
      setError("Too many failed attempts. Try again after 5 minutes.");
      return;
    }

    if (currentOtp.length !== 6) {
      setError(
        "Invalid OTP. Please enter the 6-digit OTP sent to your number."
      );
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("otp", currentOtp);
      console.log(currentOtp, "OTP User Typed");

      const otpVerificationRes = await otpVerification(formdata);

      if (otpVerificationRes.status === 200) {
        setError("");
        router.replace("/AuthProfile");
      } else {
        setError(otpVerificationRes.data.message || "Invalid OTP");
        handleFailedAttempt();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      handleFailedAttempt();
    }
    finally{
      setLoading(false);
    }
  };

  // Separate function to handle failed attempts & lock
  const handleFailedAttempt = () => {
    setFailedAttempts((prev) => {
      const updated = prev + 1;
      if (updated >= 5) {
        setIsLocked(true);
        setError("Too many failed attempts. Try again after 5 minutes.");
        setTimeout(() => {
          setIsLocked(false);
          setFailedAttempts(0);
        }, 5 * 60 * 1000);
      }
      return updated;
    });
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  //RESEND FUNCTION:
  const handleResend = async () => {
    if (resendCount >= 3) {
      Alert.alert("Limit Reached", "You can resend OTP only 3 times.");
      return;
    }

    try {
      const resendOTPRes = await resendOtpVerification();
      if (resendOTPRes.status === 200) {
        console.log(resendOTPRes.data,"RESEND OTP")
        Alert.alert("OTP Sent",`Your OTP is: ${resendOTPRes.data.otp}`);

        setResendCount(resendCount + 1);
        setOtp(Array(6).fill(""));
        setCurrentOtp("");
        startTimer();
        setError("");
      }
    } catch (error) {
      if(error.response){
        setError(error.response.data?.message || "Server error occurred.")
      }else if (error.request) {
      Alert.alert("Network Error", "Unable to connect. Check your internet.");
    } else {
      Alert.alert("Error", error.message);
    }
    }
    finally {
    setIsRunning(false);
  }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8f8ff" }}
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
              source={require("../../assets/pngs/appImg.png")}
              style={{ width: 310, height: 200, marginLeft: -50 }}
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
            <Text
              style={{
                color: "red",
                marginLeft: 20,
                marginTop: 8,
                fontSize: 10,
                fontWeight: "400",
              }}
            >
              {error}
            </Text>
          ) : null}

          <View style={styles.bottonContainer}>
            <Button
              ButtonName="Submit"
              borderWidth={1}
              backgroundColor="#093C31"
              color="#FFFFFF"
              paddingVertical={8}
              fontWeight="600"
              fontSize={14}
              onPress={handleSubmit}
            />
          </View>

          <View>
            {isRunning ? (
              <Text style={styles.timerText}>0.{timer}s</Text>
            ) : (
              <Text onPress={handleResend} style={styles.resendText}>
                RESEND OTP
              </Text>
            )}

            <View>
              <AlertModel
                visible={showCustomAlert}
                onClose={() => setShowCustomAlert(false)}
              />
            </View>
          </View>
          {isLocked && (
            <>
              <AlertModel
                visible={isLocked}
                onClose={() => setIsLocked(false)}
              />
            </>
          )}

          <View style={{ height: 200 }} />
          <Loading visible={loading}/>
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
    gap: 3,
  },
  enterOtpContainer: {
    // borderWidth:1,
    marginLeft: 20,
  },
  enterOtp: {
    fontSize: 18,
    fontWeight: 500,
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
  },
  otpContainer: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#f8f8ff",
    // alignItems:"center",
    // justifyContent:"center",
  },
  otpText: {
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 20,
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
    fontSize: 12,
    fontWeight: 400,
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
  timerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#5D5D5D",
  },
  resendText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#093C31",
    fontWeight: "600",
  },
});
