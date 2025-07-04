import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, withSpring, withRepeat, withTiming, useAnimatedStyle } from "react-native-reanimated";

const OTPInput = ({ length = 4 }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  const scaleValues = Array.from({ length }, () => useSharedValue(1));
  const borderColorValues = Array.from({ length }, () => useSharedValue("#fff"));
  const cursorOpacity = useSharedValue(1);

  // Cursor Animation (blinking effect)
  cursorOpacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);

  // Reset borderColor for empty fields
  useEffect(() => {
    otp.forEach((value, index) => {
      if (value === "") {
        borderColorValues[index].value = "#fff"; // Reset to white if empty
      }
    });
  }, [otp]);

  const handleTextChange = (text, index) => {
    if (/^\d*$/.test(text)) { // Only numeric input
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < length - 1) {
        setActiveIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }

      // Animate only the active box when typing
      if (index === activeIndex) {
        scaleValues[index].value = withSpring(1.2, { damping: 5 }, () => {
          scaleValues[index].value = withSpring(1);
        });
      }

      // Change border color on typing
      borderColorValues[index].value = "#000"; // Change to active color
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      let newOtp = [...otp];

      if (newOtp[index] !== "") {
        newOtp[index] = "";
      } else if (index > 0) {
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
      }

      // Ensure scale animation resets only for the active input when deleting
      if (index === activeIndex) {
        scaleValues[index].value = withSpring(1.2, { damping: 5 }, () => {
          scaleValues[index].value = withSpring(1);
        });
      }

      setOtp(newOtp);
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
      {otp.map((digit, index) => {
        // Animated Styles (Fix for Reanimated Warning)
        const animatedBoxStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scaleValues[index].value }],
          borderColor: borderColorValues[index].value,
        }));

        return (
          <TouchableOpacity key={index} onPress={() => inputRefs.current[index]?.focus()} activeOpacity={1}>
            <Animated.View
              style={[
                {
                  width: 50,
                  height: 60,
                  margin: 5,
                  borderWidth: 2,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                },
                animatedBoxStyle, // ✅ FIXED: Used useAnimatedStyle correctly
              ]}
            >
              <TextInput
                ref={(el) => (inputRefs.current[index] = el)}
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  width: "100%",
                  position: "absolute",
                  opacity: 0, // Hidden input
                }}
                keyboardType="numeric"
                maxLength={1}
                value={otp[index]} // ✅ FIXED: Value updates correctly
                onChangeText={(text) => handleTextChange(text, index)} // Ensure numeric input
                onFocus={() => setActiveIndex(index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
              />
              {index === activeIndex && otp[index] === "" ? (
                <Animated.Text style={{ fontSize: 24, opacity: cursorOpacity.value }}>|</Animated.Text>
              ) : (
                <Text style={{ fontSize: 24 }}>{otp[index]}</Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default OTPInput;
