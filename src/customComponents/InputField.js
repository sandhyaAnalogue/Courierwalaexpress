import { StyleSheet, Text, View, TextInput } from "react-native";
import { Platform } from "react-native";

const InputField = ({
  placeholder,
  keyboardType = "default",
  style,
  label,
  iconComponent,
  iconStyle,
  iconPosition,
  stylebottomText,
  editable = true,
  onPressIn,
  value,
  onChangeText,
  placeholderStyle,
  onBlur,
  labelIconStyle,
  fontStyle,
  inpContainer,
  bottomText,
  labelIcon,
  hasError = false,
  ...props
}) => {
  return (
    <View style={[styles.inputFieldContainer, inpContainer]}>
      <Text style={[styles.text, style]}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          { borderColor: hasError ? "red" : "#E0E0E0" },
        ]}
      >
        {iconComponent && iconPosition === "left" && (
          <View style={[styles.iconLeft, iconStyle]}>{iconComponent}</View>
        )}

        <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#888888"
          editable={editable}
          onPressIn={onPressIn}
          value={value}
          style={[
            styles.inputField,
            // style,
            placeholderStyle,
            { fontWeight: "400", fontSize: 12.5 },
            Platform.OS === "web" && { outline: "none" },
          ]}
          onChangeText={onChangeText}
          onBlur={onBlur}
          {...props}
        />

        {iconComponent && iconPosition === "right" && (
          <View style={[styles.iconRight, iconStyle]}>{iconComponent}</View>
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputFieldContainer: {
    width: "90%",
    display: "flex",
    // backgroundColor:"pink",
    // justifyContent:"center",
    // alignItems:"center",
    // backgroundColor:"pink"
    // borderWidth:1,
    margin: "auto",
    marginVertical: 10,
  },
  text: {
    marginBottom: 5,
    fontWeight: "500", ////testing change
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 45,
  },
  inputField: {
    flex: 1,
  },
  iconLeft: {
    // borderWidth:1,
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
