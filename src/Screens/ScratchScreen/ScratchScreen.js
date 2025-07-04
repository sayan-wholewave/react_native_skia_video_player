import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  FadeIn,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Svg, Rect, Mask, Path, Text as SvgText} from 'react-native-svg';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const CARD_SIZE = windowWidth - 100;
const TOTAL_AREA = CARD_SIZE * CARD_SIZE;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const ScratchScreen = ({route}) => {
  const {cardIndex, prizeAmount} = route.params;
  console.log(cardIndex);

  const path = useSharedValue('');
  const revealedArea = useSharedValue(0);
  const isRevealed = useSharedValue(false);

  const [svgOffset, setSvgOffset] = useState({x: 0, y: 0});

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withTiming(isRevealed.value ? 1.1 : 0, {
      duration: 700,
    });

    return {
      opacity: withTiming(isRevealed.value ? 1 : 0, {
        duration: 500, // For a slower transition
      }),
      // transform: [
      //   {scale},
      //   {translateX: -CARD_SIZE / 2 + 15},
      //   {translateY: -CARD_SIZE / 2 + 10},
      // ],
    };
  });

  const triggerReveal = () => {
    Alert.alert('You Won!');
  };
  const panGesture = Gesture.Pan()
    .onStart(event => {
      const adjustedX = Math.min(Math.max(event.x - svgOffset.x, 0), CARD_SIZE);
      const adjustedY = Math.min(Math.max(event.y - svgOffset.y, 0), CARD_SIZE);
      path.value += `M${adjustedX},${adjustedY} `;
    })
    .onUpdate(event => {
      const adjustedX = Math.min(Math.max(event.x - svgOffset.x, 0), CARD_SIZE);
      const adjustedY = Math.min(Math.max(event.y - svgOffset.y, 0), CARD_SIZE);
      path.value += `L${adjustedX},${adjustedY} `;
      revealedArea.value += 30 * 10;

      if (!isRevealed.value && revealedArea.value >= TOTAL_AREA * 0.6) {
        isRevealed.value = true;
        // runOnJS(triggerReveal)();
      }
    });

  const animatedProps = useAnimatedProps(() => ({
    d: path.value,
  }));

  return (
    <View style={styles.container}>
      <View
        style={styles.scratchSurfaceContainer}
        onLayout={event => {
          const {x, y} = event.nativeEvent.layout;
          setSvgOffset({x, y});
        }}>
        <Svg height={CARD_SIZE} width={CARD_SIZE} style={styles.scratchSurface}>
          <Rect x="0" y="0" width="100%" height="100%" fill="white" />
          <SvgText
            x="50%"
            y="40%"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            fill="green">
            You Won !
          </SvgText>
          <SvgText
            x="50%"
            y="50%"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            fill="green">
            {`Rs ${prizeAmount}`}
          </SvgText>

          <Mask id="mask">
            <Rect x="0" y="0" width="100%" height="100%" fill="white" />
            <AnimatedPath
              animatedProps={animatedProps}
              stroke="black"
              strokeWidth={40}
              strokeLinecap="round"
              fill="none"
            />
          </Mask>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="gray"
            mask="url(#mask)"
          />
        </Svg>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={StyleSheet.absoluteFill} />
      </GestureDetector>

      <Animated.View style={[styles.hiddenContent, animatedStyle]}>
        <Text style={styles.hiddenText}>You Won !</Text>
        <Text style={styles.hiddenText}>Rs {prizeAmount}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  scratchSurfaceContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  scratchSurface: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: 'transparent',
  },
  hiddenContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -CARD_SIZE / 2}, {translateY: -CARD_SIZE / 2}],
    width: CARD_SIZE,
    height: CARD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    // elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  hiddenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default ScratchScreen;
