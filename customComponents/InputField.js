import { StyleSheet, Text, View, TextInput } from "react-native";
import { Platform } from "react-native";

const InputField = ({
  placeholder,
  keyboardType="default",
  style,
  label,
  iconComponent,
  iconStyle,
  iconPosition,
  editable=true,
  onPressIn,
  value,
  onChangeText,
  onBlur,
  hasError = false,
  ...props

}) => {
  return (
    <View style={styles.inputFieldContainer}>
      <Text style={[styles.text, style]}>{label}</Text>

      <View style={[styles.inputWrapper,{ borderColor: hasError ? "red" : "#E0E0E0" },]}>
        {iconComponent && iconPosition === "left" && (
          <View style={[styles.iconLeft, iconStyle]}>{iconComponent}</View>
        )}

        <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          editable={editable}
          onPressIn={onPressIn}
          value={value}
          style={[styles.inputField, style,Platform.OS === "web" && { outline: "none" }]}
          placeholderTextColor="#999"
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
    // justifyContent:"center",
    // alignItems:"center",
    // backgroundColor:"pink"
    // borderWidth:1,
    margin: "auto",
    marginVertical: 10,
  },
  text: {
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 50,
  },
  inputField: {
    // borderWidth: 1,
    // borderRadius: 8,
    // borderColor: "#ddd",
    // backgroundColor:"#fff",
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
