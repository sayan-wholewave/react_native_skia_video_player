import React, {useEffect} from 'react';
import {View, Dimensions, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {windowWidth} from '../utils/util';
import Tornedo from '../Assets/svg/Tornedo_Icon_SVG';

const VortexAnimation = () => {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateY: `${rotate.value}deg`},

          // { skewY: `${rotate.value}deg` },
        //  {translateY: rotate.value},
        //   { rotate: `${rotate.value}deg` }
      ],
    };
  });

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Animated.View
        style={[
          {width: windowWidth / 2 + 80, height: windowWidth},
          animatedStyle,
        ]}>
        <Tornedo
          height={windowWidth}
          width={windowWidth / 2 + 80}
          fill={'rgba(51, 0, 255,0.4)'}
          stroke={'rgba(255,255,255,1)'}
        />
      </Animated.View>


    </View>
  );
};

export default VortexAnimation;
