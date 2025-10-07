import { StyleSheet, Text, View, TouchableOpacity,StatusBar } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import BackArrow from "../../../assets/svgs/SVGIcons/BackArrow";
import BackArrow from "../../assets/svgIcons/BackArrow";
import WebView from "react-native-webview";

const htmlContent = `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f8ff;
          padding: 20px;
          line-height: 1.6;
          color: #333;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        p {
        font-size: 12px;
          margin-bottom: 15px;
          text-align: justify;
        }
        .highlight {
          color: blue;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <p>
        Lörëm ipsum trasang pladade. Seliga vesa etnovision bure.
        Buvak planade dinade betese om makronas. Köfgöt artdöden.
        Tregåvis intrang völedes antide.
      </p>
      <p>
        Lörëm ipsum trasang pladade. Seliga vesa etnovision bure.
        Buvak planade dinade betese om makronas. Köfgöt artdöden.
        Tregåvis intrang völedes antide.
      </p>
      <p>
        Lörëm ipsum trasang pladade. Seliga vesa etnovision bure.
        Buvak planade dinade betese om makronas. Köfgöt artdöden.
        Tregåvis intrang völedes antide.
      </p>
      <p>
        Lörëm ipsum trasang pladade. Seliga vesa etnovision bure.
        Buvak planade dinade betese om makronas. Köfgöt artdöden.
        Tregåvis intrang völedes antide.
      </p>
    </body>
  </html>
`;

const CancellationPolicy = () => {
  const router = useRouter();
  const inserts = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#f8f8ff" barStyle="dark-content"/>
      <Stack.Screen
        options={{
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
                  Refund Policy
                </Text>
              </View>
            );
          },
        }}
      />

      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default CancellationPolicy;

const styles = StyleSheet.create({});
