import React, { useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Custom_Bottom_Sheet from './Custom_Bottom_Sheet';

export default function CustomBottomSheet() {
  const ref = useRef(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <Custom_Bottom_Sheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: 'orange' }} />
        </Custom_Bottom_Sheet>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'white',
    opacity: 0.6,
  },
});