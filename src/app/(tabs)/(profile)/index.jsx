import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
  Linking,
  TouchableOpacity
} from "react-native";


import Person from "../../../assets/svgIcons/Person";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// import Pen from "../../../../assets/svgs/SVGIcons/Pen";
import Pen from "../../../assets/svgIcons/Pen";

// import ProfileOptions from "../../../../customComponents/ProfileOptions";
import ProfileOptions from "../../../components/ProfileOptions";

// import ManageCard from "../../../../assets/svgs/SVGIcons/ManageCard";
import ManageCard from "../../../assets/svgIcons/ManageCard";

// import Condition from "../../../../assets/svgs/SVGIcons/Condition";
import Condition from "../../../assets/svgIcons/Condition";

// import Question from "../../../../assets/svgs/SVGIcons/Question";
import Question from "../../../assets/svgIcons/Question";
// import Cancellation from "../../../../assets/svgs/SVGIcons/Cancellation";
import Cancellation from "../../../assets/svgIcons/Cancellation";
// import Refund from "../../../../assets/svgs/SVGIcons/Refund";
import Refund from "../../../assets/svgIcons/Refund";
// import Delete from "../../../../assets/svgs/SVGIcons/Delete";
import Delete from "../../../assets/svgIcons/Delete";

// import Policies from "../../../../assets/svgs/SVGIcons/Policies";
import Policies from "../../../assets/svgIcons/Policies";

import Profile from "../../(authScreen)/AuthProfile";
import { useRouter, Stack } from "expo-router";
// import Footer from "../../../../customComponents/Footer";
import Footer from "../../../components/Footer";

// import BackArrow from "../../../../assets/svgs/SVGIcons/BackArrow";
import BackArrow from "../../../assets/svgIcons/BackArrow";


const { height } = Dimensions.get("window");

const MyProfile = () => {
  const router = useRouter();
    const inserts = useSafeAreaInsets();
  const [userName, setUserName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlewebsitelink=()=>{
    Linking.openURL("https://www.analogueitsolutions.com/") 
  }

  useEffect(() => {
    const userProfileData = async () => {
      try {
        const userName = await AsyncStorage.getItem("userProfile");
        if (userName) {
          const userProfileName = JSON.parse(userName);
          console.log(userProfileName.name, "userName");
          setUserName(userProfileName.name);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    userProfileData();
  }, []);

  const handleProfileEdit = () => {
    router.push("/screens/editProfile");
  };

  const handleManageAddress = () => {
    router.push("/(tabs)/(profile)/manageAddress");
  };

  const handleCustomerSupport = () => {
    router.push("/screens/helpSupport");
  };
  const handleTermsConditions = () => {
    router.push("/screens/termsConditions");
  };
  const handlePrivacyPolicy = () => {
    router.push("/screens/privacyPolicies");
  };
  const handleCancellationPolicy = () => {
    router.push("/screens/cancellationPolicy");
  };
  const handleRefundPolicy = () => {
    router.push("/screens/refundPolicy");
  };
  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>

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
                  onPress={() => router.replace("/(homeScreen)")}
                  style={{
                    // backgroundColor: "#d7d7dcff",
                    backgroundColor:"#E7E7E7",
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
                  
                  My Profile
                </Text>
              </View>
            );
          },
        }} />


      {/* <Stack.Screen
        options={{
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
                  onPress={() => router.replace("/Home")}
                  style={{
                    backgroundColor: "#d7d7dcff",
                    padding: 6,
                    borderRadius: 16,
                    marginLeft: 15,
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
                  My Orders
                </Text>
              </View>
            );
          },
        }}
      /> */}











        <View style={{ alignItems: "center", flex: 1,marginBottom:90,backgroundColor:"#f8f8ff",paddingTop:12 }}>
          <View style={styles.EditProfileContainer}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Person width={22} height={22} fill="#252525" />
              <Text style={{ fontSize: 14,fontWeight:500 }}>Sandhya</Text>
            </View>

            <Pressable
              style={styles.editBtnContainer}
              onPress={handleProfileEdit}
            >
              <View style={{ flexDirection: "row", gap: 7,alignItems:"center" }}>
                <Pen width={14} height={14} fill="#F6F6F6" />
                <Text style={{ color: "#F6F6F6",fontWeight:400,fontSize:12 }}>Edit profile</Text>
              </View>
            </Pressable>
          </View>

          {/* ALL OPTIONS */}
          <View
            style={{ width: "90%", marginTop: 40, backgroundColor: "#FFFFFF" }}
          >
            <ProfileOptions
              label="Manage Address"
              Icon={ManageCard}
              onPress={handleManageAddress}
            />
            <ProfileOptions
              label="Terms & Conditions"
              Icon={Condition}
              onPress={handleTermsConditions}
            />
            <ProfileOptions
              label="Privacy Policies"
              Icon={Policies}
              onPress={handlePrivacyPolicy}
            />
            <ProfileOptions
              label="Help & Support"
              Icon={Question}
              onPress={handleCustomerSupport}
            />
            <ProfileOptions
              label="Cancellation Policy"
              Icon={Cancellation}
              onPress={handleCancellationPolicy}
            />
            <ProfileOptions
              label="Refund Policy"
              Icon={Refund}
              onPress={handleRefundPolicy}
            />
            <ProfileOptions
              label="Delete Account"
              Icon={Delete}
              isLast={true}
              onPress={handleDeleteAccount}
            />
          </View>

          <View style={styles.logoutContainer}>
            <Text style={{ fontSize: 16 }}>Logout</Text>
          </View>
          <Modal
            visible={showDeleteModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDeleteModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  "Are You Sure You Want to Delete?"
                </Text>
                <Text style={styles.modalDesc}>
                  Lorem ipsum dolor sit amet consectetur. Mi faucibus
                  consectetur non condimentum feugiat malesuada
                </Text>

                <View style={styles.buttonRow}>
                  <Pressable
                    style={[styles.btn, styles.noBtn]}
                    onPress={() => setShowDeleteModal(false)}
                  >
                    <Text style={styles.noBtnText}>No</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.btn, styles.yesBtn]}
                    onPress={() => {
                      setShowDeleteModal(false);
                      console.log("Account deleted");
                    }}
                  >
                    <Text style={styles.yesBtnText}>Yes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>


          {/* <View style={{marginTop:20,marginBottom:20,justifyContent:"center",alignItems:"center"}}>
            <Text >Version 1.0.0 (1)</Text>
            <Pressable style={{marginVertical:5}} onPress={handlewebsitelink}>
              <Text>Analogue IT Solutions</Text>
            </Pressable>
          </View> */}
      
          
        
            
        </View>
        <Footer></Footer>
        </ScrollView>
        </SafeAreaView>
      
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  EditProfileContainer: {
    marginTop: 10,
    width: "90%",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#252525",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  btnContainer: {
    borderWidth: 1,
  },
  btnText: {
    color: "#F6F6F6",
  },
  logoutContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 30,
    borderRadius: 7,
    backgroundColor: "#D1D1D1",
  },
  logoutContainer1: {
    width: "100%",
    backgroundColor: "#D1D1D1",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText1: {
    color: "#252525",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    // height:1000,

    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
    color: "#252525",
  },
  modalDesc: {
    fontSize: 11,
    color: "#5d5d5d",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  noBtn: {
    backgroundColor: "#252525",
    borderColor: "#252525",
  },
  noBtnText: {
    color: "#fff",
    fontWeight: "500",
    fontSize:12,
  },
  yesBtn: {
    backgroundColor: "#fff",
    borderColor: "#252525",
  },
  yesBtnText: {
    color: "#252525",
    fontWeight: "500",
    fontSize:12,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
});
