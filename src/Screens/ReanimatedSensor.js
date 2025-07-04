import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';

const Tilted3DBox = () => {
  // ROTATION sensor for Y-axis (roll)
  const deviceRotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  });

  const rotateY = useDerivedValue(() => {
    const { roll } = deviceRotation.sensor.value;
    return interpolate(
      roll,
      [-1, 0, 1],
      [Math.PI / 8, 0, -Math.PI / 8],
      Extrapolation.CLAMP
    );
  });

  // GRAVITY sensor for X-axis (z)
  const rotationGravity = useAnimatedSensor(SensorType.GRAVITY, {
    interval: 20,
  });

  const rotateX = useDerivedValue(() => {
    const { z } = rotationGravity.sensor.value;
    return interpolate(
      z,
      [-9, -6, -1], // gravity z-values
      [-Math.PI / 8, 0, Math.PI / 8],
      Extrapolation.CLAMP
    );
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 200 },
        { rotateY: `${rotateY.value}rad` },
        { rotateX: `${rotateX.value}rad` },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, rStyle]} />
    </View>
  );
};

export default Tilted3DBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#ff9800',
    borderRadius: 16,
  },
});
