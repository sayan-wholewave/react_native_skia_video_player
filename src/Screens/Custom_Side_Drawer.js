

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/** ---------------- HOME STACK ---------------- */
const Home1Screen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Home Screen 1</Text>
  </View>
);
const Home2Screen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Home Screen 2</Text>
  </View>
);
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home1" component={Home1Screen} />
      <Stack.Screen name="Home2" component={Home2Screen} />
    </Stack.Navigator>
  );
};

/** ---------------- SETTINGS STACK ---------------- */
const Settings1Screen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Settings Screen 1</Text>
  </View>
);
const Settings2Screen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Settings Screen 2</Text>
  </View>
);
const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings1" component={Settings1Screen} />
      <Stack.Screen name="Settings2" component={Settings2Screen} />
    </Stack.Navigator>
  );
};

/** ---------------- CAMERA SCREEN (Middle Tab) ---------------- */
const CameraScreen = ({closeModal}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const permission = await requestPermission();
      if (!permission) {
        Alert.alert(
          'Camera Permission',
          'Please allow camera access in settings.',
        );
        closeModal();
      }
    })();
  }, []);

  return (
    <View style={styles.cameraContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>✖</Text>
      </TouchableOpacity>
      {device && hasPermission ? (
        <Camera style={styles.camera} device={device} isActive />
      ) : (
        <Text style={styles.warningText}>Camera permission required.</Text>
      )}
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

/** ---------------- SIDE DRAWER SCREEN ---------------- */
const SideDrawerScreen = ({navigation}) => {
  const handleGesture = ({nativeEvent}) => {
    if (nativeEvent.translationX > 50) {
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <PanGestureHandler
          onGestureEvent={handleGesture}
          activeOffsetX={[-10, 10]}>
          <View style={styles.drawerContainer}>
            <Text style={styles.drawerText}>Side Drawer Content</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </PanGestureHandler>
      </View>
    </TouchableWithoutFeedback>
  );
};
const CameraPlaceholder = () => <View />;

/** ---------------- BOTTOM TAB NAVIGATION ---------------- */
const BottomTabs = () => {
  const navigation = useNavigation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <View style={{flex: 1}}>
      {/* Drawer Button (Top Right) */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('SideDrawer')}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* Camera Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isCameraOpen}
        onRequestClose={() => setIsCameraOpen(false)}>
        <CameraScreen closeModal={() => setIsCameraOpen(false)} />
      </Modal>

      {/* Bottom Tabs */}
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        screenListeners={{
          tabPress: e => {
            if (e.target?.includes('CameraTab')) {
              e.preventDefault(); // Prevent normal tab switch
              setIsCameraOpen(true); // Open Camera Modal Instead
            }
          },
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen
          name="CameraTab"
          component={CameraPlaceholder} // ✅ No inline function
          options={{title: 'Camera'}}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault(); // Prevent navigation
              setIsCameraOpen(true); // Open Camera Modal Instead
            },
          })}
        />

        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </View>
  );
};

/** ---------------- STACK NAVIGATOR ---------------- */
const CustomStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      presentation: 'transparentModal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen name="BottomTabs" component={BottomTabs} />
    <Stack.Screen name="SideDrawer" component={SideDrawerScreen} />
  </Stack.Navigator>
);

/** ---------------- MAIN APP ---------------- */
export default function Custom_Side_Drawer() {
  return <CustomStackScreen />;
}

/** ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f3f3f3',
    padding: 4,
    borderRadius: 5,
    elevation: 3,
    zIndex: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  warningText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  drawerContainer: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    elevation: 5,
  },
  drawerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
