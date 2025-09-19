import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrow from "../../../assets/svgs/SVGIcons/BackArrow";


import WebView from 'react-native-webview'
const CancellationPolicy = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();
  return (
    <View style={{flex:1}}>

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
                  
                 Cancellation Policy
                </Text>
              </View>
            );
          },
        }} />

      <WebView source={require("./HTMLContent/Cancellation.html")} style={{flex:1}}/>
    </View>
  )
}

export default CancellationPolicy

const styles = StyleSheet.create({})