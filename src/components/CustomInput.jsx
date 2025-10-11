import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const { height, width } = Dimensions.get("window");
const CustomInput = ({
  placeholder,
  inpLabel,
  inputLabelStyle,
  onChangeText,
  keyboardType,
  error,
  editable = true,
  multiline = false,
  secureTextEntry = false,
  containerStyle,
  input,
  value,
  rightIcon,
  leftIcon,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {inpLabel && (
        <Text style={[styles.label, inputLabelStyle]}>{inpLabel}</Text>
      )}
      <View style={[styles.inputWrapper, error && styles.errorInput]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          placeholder={placeholder}
          value={value}
          style={[styles.input, input]}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <View style={styles.iconRight}>{rightIcon}</View>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: width - 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    // borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
  },

  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
