import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

const Loading = ({visible,text}) => {
  return (
    <View>
      <Spinner
        visible={visible}
        textContent={text || "Loading..."}
        textStyle={styles.textStyle}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
        size="large"
        color="#FFFFFF"
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
    textStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
