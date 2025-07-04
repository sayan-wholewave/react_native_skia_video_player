import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

const QRScanScreen = () => {
  const navigation = useNavigation();
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);

  // Request Camera Permissions
  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  // QR Code Scanner Logic
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        console.log('QR Code:', codes[0]?.value);
        alert(`Scanned: ${codes[0]?.value}`);
        navigation.goBack(); // Close the modal after scanning
      }
    },
  });

  if (!device) return <Text>No camera available</Text>;
  if (!hasPermission) return <Text>Camera permission required</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Scan QR Code</Text>
        <Button title="Close Scanner" onPress={() => navigation.goBack()} />
        <Button
            title="Go to Modal Screen 2"
            onPress={() => navigation.navigate('ModalScreen2')}
          />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#333'
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    gap:20
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default QRScanScreen;
