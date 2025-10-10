import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import QrUpload from "../../assets/svgIcons/qrUploadIcon";
import Tourch from "../../assets/svgIcons/tourch";
import * as ImagePicker from "expo-image-picker";
import jsQR from "jsqr";
// import { CameraView, useCameraPermissions,} from 'expo-camera';

const { width, height } = Dimensions.get("window");

export default function qrCode() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [torchOn, setTorchOn] = useState(false);

  const handleGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      console.log("Selected image:", selectedImage);
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8ff" }}>
      <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content" />
      <View>
        {/* Instructions */}
        <View style={styles.instructionContainer}>
          <Text style={styles.title}>Scan QR code</Text>
          <Text style={styles.txt}>Place the QR code inside the frame</Text>
          <Text style={styles.txt}>
            to scan please Avoid shaking to get results quickly
          </Text>
        </View>

        {/* Camera */}
        <View style={styles.cameraView}>
          <CameraView
            style={styles.camera}
            enableTorch={torchOn}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={(val) => {
              console.log(val);
              Alert.alert(val?.data);
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60,
          }}
        >
          <TouchableOpacity onPress={handleGallery}>
            <QrUpload width={16} height={16} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTorchOn(!torchOn);
            }}
          >
            <Tourch width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: { textAlign: "center", paddingBottom: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8ff",
    paddingHorizontal: 16,
  },
  backButton: { padding: 6, borderRadius: 16, backgroundColor: "#E7E7E7" },
  headerTitle: { fontSize: 16, fontWeight: "500", marginLeft: 10 },
  instructionContainer: { marginVertical: 20, alignItems: "center" },
  title: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 20,
  },
  txt: {
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
    paddingVertical: 1,
  },
  cameraView: {
    width: width - 150,
    height: height - 550,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 30,
    backgroundColor: "#000",
  },
  camera: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    width: "100%",
    paddingHorizontal: 64,
  },
  button: { flex: 1, alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold", color: "white" },
});
