import React from "react";
import { View, Text, StyleSheet } from "react-native";
 
import stepperIcon1 from "../assets/svgIcons/stepperIcon1";
import stepperIcon2 from "../assets/svgIcons/stepperIcon2";
import stepperIcon3 from "../assets/svgIcons/stepperIcon3";
import stepperIcon4 from "../assets/svgIcons/stepperIcon4";
import stepperIcon5 from "../assets/svgIcons/stepperIcon5";
 
const ICONS = [
  stepperIcon1,
  stepperIcon2,
  stepperIcon3,
  stepperIcon4,
  stepperIcon5,
];
 
export default function MultiStepProgressBar({ currentStep, steps }) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const IconComponent = ICONS[index];
        const isCurrentStep = index === currentStep;
 
        return (
          <View key={index} style={styles.stepItem}>
            {/* Date and Time above icon */}
            <View style={styles.dateTimeContainer}>
              <Text
                style={[
                  styles.dateText,
                  isCurrentStep ? styles.dateActive : { opacity: 0 },
                ]}
              >
                {step.date}
              </Text>
              <Text
                style={[
                  styles.timeText,
                  isCurrentStep ? styles.timeActive : { opacity: 0 },
                ]}
              >
                {step.time}
              </Text>
            </View>
 
            {/* Icon and connecting line */}
            <View style={styles.iconAndLineContainer}>
              <View
                style={[
                  styles.iconContainer,
                  isCurrentStep && styles.currentStepIconContainer,
                ]}
              >
                <IconComponent
                  width={24}
                  height={24}
                  isActive={isCurrentStep}
                  fill={isCurrentStep ? "#252525" : "#999999"} // inactive icon color changed here
                />
              </View>
 
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.horizontalLine,
                    index < currentStep
                      ? styles.lineCompleted
                      : styles.lineInactive,
                  ]}
                />
              )}
            </View>
 
            {/* Step title below icon */}
            <Text
              style={[
                styles.label,
                isCurrentStep
                  ? styles.labelActive
                  : index < currentStep
                  ? styles.labelCompleted
                  : styles.labelInactive,
              ]}
              numberOfLines={2}
            >
              {step.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  dateTimeContainer: {
    alignItems: "center",
    marginBottom: 6,
  },
  dateText: {
    fontSize: 8,
    fontWeight: "500",
  },
  dateActive: {
    color: "#000",
  },
  timeText: {
    fontSize: 9,
  },
  timeActive: {
    color: "#000",
  },
  iconAndLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginRight: -25,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    marginRight: 0,
  },
  currentStepIconContainer: {
    borderColor: "#252525",
    borderRadius: 25,
  },
  horizontalLine: {
    height: 2,
    flex: 1,
  },
  lineCompleted: {
    backgroundColor: "black",
  },
  lineInactive: {
    backgroundColor: "#ccc",
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 80,
    lineHeight: 12,
    marginTop: 4,
  },
  labelActive: {
    color: "black",
    fontWeight: "bold",
  },
  labelCompleted: {
    color: "#666",
  },
  labelInactive: {
    color: "#ccc",
  },
});