import { StyleSheet, Text, View,TouchableOpacity,StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import BackArrow from "../../../assets/svgs/SVGIcons/BackArrow";
import BackArrow from "../../assets/svgIcons/BackArrow";

const CustomerSupport = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();
  return (
    <View style={{flex:1}}>
    
    <SafeAreaView style={{flex:1,backgroundColor:"#f8f8ff"}}>
      <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content"/>

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
                  onPress={() => router.replace("/(profile)")}
                  style={{
                    backgroundColor: "#E7E7E7",
                    padding: 8,
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
                  
                 Help & support
                </Text>
              </View>
            );
          },
        }} />
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact support</Text>
        <Text style={styles.txt}>+91 2121212120</Text>
        <Text style={styles.txt}>Available 24/7</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Email support</Text>
        <Text style={styles.txt}>support@cradlewell.com</Text>
        <Text style={styles.txt}>Response within 2 hours</Text>
      </View>
    </View>
    </SafeAreaView>
    </View>
  );
};

export default CustomerSupport;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor:"#f8f8ff",
    // marginTop:25,


  },
  card: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    borderRadius: 10,
    padding: 15,

    // marginBottom: 2,
    marginTop:20,
  },
  cardTitle: {
    color: "#252525",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  txt: {
    color: "#5D5D5D",
    marginBottom: 3,
    fontSize:12,
    fontWeight:400
  },
});
