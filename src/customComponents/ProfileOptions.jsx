import { Pressable, StyleSheet, Text, View } from "react-native";
import ForwardIcon from "../assets/svgIcons/ForwardIcon";
// import ProfileBackArrowIcon from "../assets/svgIcons/profileBackArrowIcon  "
import {Feather} from "@expo/vector-icons"


const ProfileOptions = ({ label, Icon, onPress,isLast }) => {
  return (
    <Pressable style={[styles.optionContainer,isLast && { borderBottomWidth: 0 }]} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10,paddingLeft:10 }}>
        <Icon width={24} height={24} fill="#252525" />
        <Text style={styles.optionText}>{label}</Text>
      </View>
      {/* <ForwardIcon width={20} height={20} fill="#252525" style={styles.ForwardIcon} /> */}
      <Feather name="chevron-right" size={22} color="#252525" style={styles.ForwardIcon} />
    </Pressable>
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    borderStyle:"dashed"
  },
  optionText: {
    fontSize: 14,
    fontWeight:500,
    color: "#252525",
  },
  ForwardIcon:{
    // backgroundColor:"pink",
    marginRight:15
  }
});
