import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const Button = ({
  onPress,
  ButtonName,
  backgroundColor,
  color,
  paddingVertical,
  fontWeight,
  borderWidth,
  style
}) => {
  return (
    <View style={styles.Container}>
      <Pressable
        style={[
          styles.buttonContainer,
          { backgroundColor: backgroundColor },
          { borderWidth: borderWidth },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.buttonText,
            { color: color,paddingVertical: paddingVertical,fontWeight: fontWeight },
            style
          ]}
        >
          {ButtonName}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  Container: {
    // borderWidth:1,
    // marginLeft:20,
  },
  buttonContainer: {
    // borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    // margin:"auto"
    alignItems: "center",
    // width: "90%",
    // backgroundColor:"yellow"
  },
});
