import React from 'react';
import {StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native';
import Animated, {SharedValue, useAnimatedProps} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({text: true});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = (props) => {
  const {text, style} = props;
  const animatedProps = useAnimatedProps(() => ({
    text: text.value,
  }));

  return (
    //@ts-ignore
    <AnimatedTextInput
      pointerEvents={props.pointerEvents}
      underlineColorAndroid="transparent"
      editable={false}
      style={[styles.baseStyle, style]}
      {...{animatedProps}}
    />
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    color: 'black',
  },
});

export default ReText;
