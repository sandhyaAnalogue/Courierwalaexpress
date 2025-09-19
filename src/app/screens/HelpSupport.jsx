import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrow from "../../../assets/svgs/SVGIcons/BackArrow";

const CustomerSupport = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#f8f8ff"}}>

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
  );
};

export default CustomerSupport;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor:"#f8f8ff"

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
    marginBottom: 15,
  },
  cardTitle: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
  },
  txt: {
    color: "#5D5D5D",
    marginBottom: 3,
  },
});
