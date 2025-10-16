import { useState, useEffect } from "react";
import { Platform, View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";

import * as Device from "expo-device";
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";

export default function Mapservices() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [address,setAddress]=useState("")

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onRegionChange={async(e) => {
            console.log("new coards", e);
            setLocation(e);
            const address=await Location.reverseGeocodeAsync({
              latitude:e.latitude,
              longitude:e.longitude
            })
            console.log(address)
            setAddress(address[0]?.formattedAddress)
          }}
          onRegionChangeComplete={(e)=>{
            console.log(e)
          }}
          showsUserLocation={true}
          
          
        >
          <Marker
            coordinate={{
              latitude: location?.coords?.latitude || location?.latitude,
              longitude: location?.coords?.longitude || location?.longitude,
            }}
            title="You are here"
            description="Your current location"
          />
          {/* <Marker
            coordinate={{
              latitude: location?.coords.latitude + 0.4,
              longitude: location?.coords.longitude + 0.5,
            }}
            title="You are here"
            description="Your current location"
          /> */}
        </MapView>
        
      ) : (
        // Optional fallback UI while waiting for location
        <View style={styles.loading}>
          {/* You can put a spinner or text here */}
        </View>
      )}
      <TouchableOpacity onPress={async()=>{
        const res=await Location.geocodeAsync(address)
        console.log(res)
      }}>
        {/* <Text>Get Coards</Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
