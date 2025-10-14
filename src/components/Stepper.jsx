import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import StepIndicator from "react-native-step-indicator";
import AwaitIcon from "../assets/svgIcons/AwaitIcon";
import Location from "../assets/svgIcons/Location";
import PickUp from "../assets/svgIcons/PickUp";
import Success from "../assets/svgIcons/Success";
import Van from "../assets/svgIcons/Van";

const { width, height } = Dimensions.get("window");

const Stepper = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const icons = [AwaitIcon, PickUp, Location, Van, Success];

  const data = [
    {
      label: "Awaiting captain for pick up",
      dateTime: "08-09-2025 09:15 AM",
    },
    {
      label: "Picked up",
      dateTime: "08-09-2025 09:20 AM",
    },
    {
      label: "In Transit",
      dateTime: "08-09-2025 09:25 AM",
    },
    {
      label: "Out of delivery",
      dateTime: "08-09-2025 09:30 AM",
    },
    {
      label: "Delivered",
      dateTime: "08-09-2025 09:45 AM",
    },
  ];

  const customStyles = {
    stepIndicatorSize: 30, 
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 0,
    stepStrokeWidth: 0,
    stepStrokeCurrentColor: "transparent",
    stepStrokeFinishedColor: "transparent",
    stepStrokeUnFinishedColor: "trasparent",

    separatorFinishedColor: "#000000",
    separatorUnFinishedColor: "#B0B0B0",

    stepIndicatorFinishedColor: "transparent",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",

    stepIndicatorLabelFontSize: 0, // Hide default labels
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: "transparent",
    stepIndicatorLabelFinishedColor: "transparent",
    stepIndicatorLabelUnFinishedColor: "transparent",
    labelColor: "transparent",
    labelSize: 0,
    currentStepLabelColor: "transparent",
    labelAlign: "flex-start",
  };

  const handleNext = () => {
    setCurrentPosition((prev) => {
      if (prev < data.length - 1) return prev + 1;
      return prev;
    });
  };

  const handlePrevious = () => {
    setCurrentPosition((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={data.map(item => item.label)}
          direction="vertical"
          stepCount={data.length}
          renderStepIndicator={({ position, stepStatus }) => {
            const Icon = icons[position];
            const isCurrent = position === currentPosition;
            const isCompleted = position <= currentPosition;
            
            
            let iconColor = "#aaaaaa"; // Default/uncompleted color
            
            
            return (
              <View style={[
                styles.iconContainer,
                { color: isCompleted ? "#000000" : "#B0B0B0" },
                isCompleted && styles.completedIconContainer,
                isCurrent && styles.currentIconContainer
              ]}>
                <Icon
                  width={25}
                  height={25}
                  fill={isCompleted ? "black" : iconColor}
                />
              </View>
            );
          }}
          renderLabel={({ position, stepStatus, label, currentPosition }) => {
            const isCompleted = position <= currentPosition;
            const isCurrent = position === currentPosition;

            return (
              <View style={styles.statusContainer}>
                <Text style={[
                  styles.label, 
                  { color: isCompleted ? "#000000" : "#B0B0B0" },
                  isCompleted && styles.completedLabel,
                  isCurrent && styles.currentLabel
                ]}>
                  {data[position].label}
                </Text>
                {(isCompleted || isCurrent) && (
                  <View style={styles.dateCard}>
                    <Text style={[styles.dateText,{ color: isCompleted ? "#000000" : "#B0B0B0" },]}>
                      {data[position].dateTime}
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable 
           style={[styles.button, styles.prevButton]}
          onPress={handlePrevious} 
          disabled={currentPosition === 0}
         > 
           <Text style={{color:"white"}}>Previous</Text> 
        </Pressable>
        
        <Pressable 
          style={[styles.button, styles.nextButton]} 
          onPress={handleNext}
          disabled={currentPosition === data.length - 1}
        >
          <Text style={{color:"white"}}>Next</Text>
        </Pressable> 
      </View> 
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth:1,
    height:470,
    backgroundColor: "white", 
    padding: 15, 
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    // borderWidth:1,
    width: width - 60,
    paddingLeft:13,
    minHeight: 400,
  },
  iconContainer: {
    // borderWidth:1,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  completedIconContainer: {
    // borderWidth:1,
    backgroundColor: 'white',
    color:"black",
    borderColor: '#191b1aff',
  },
  currentIconContainer: {
    // backgroundColor: '#e8f8eb',
    // borderColor: '#101111ff',
    // borderWidth: 2,
  },
  statusContainer: {
    flexDirection:"row",
    alignItems:"center",
    gap:25,
    // borderWidth:1,
    // paddingVertical:9,
    marginBottom: 30,
    marginLeft:10,
  },
  label: {
    fontSize: 12,
    // borderWidth:1,
    width:"40%",
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
    marginTop:20,
  },
  completedLabel: {
    
  },
  currentLabel: {
    
  },
  statusText: {
    color: "#7e7c7cff",
    fontSize: 14,
    marginBottom: 2,
  },
  dateText: {
    color: "#7e7c7cff",
    width:"60%",
    fontSize: 12,
    fontWeight:"500",
  },
  
  
  
  
  dateCard:{
    // borderWidth:1,
    marginTop:20,
  },
  buttonContainer:{
// borderWidth:1,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
  },
  button:{
    // borderWidth:1,
    paddingHorizontal:50,
    paddingVertical:10,
    borderRadius:6,
    backgroundColor:"#093C31"
  },
 
});