import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
    ViroARScene,
    ViroText,
    ViroTrackingStateConstants,
    ViroARSceneNavigator,
    Viro3DObject,
    ViroAmbientLight,
    Viro360Image,
    ViroARTrackingTargets,
    ViroARImageMarker,
  } from '@reactvision/react-viro';

const HelloWorldSceneAR = () => {
    return (
      <ViroARScene>
        <ViroText
          text={'Hello AR'}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
    );
  
  };
  
  export default function ViroAr(){
    return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={styles.f1}
      />
    );
  };


  const styles=StyleSheet.create({
    f1:{flex:1},

  })