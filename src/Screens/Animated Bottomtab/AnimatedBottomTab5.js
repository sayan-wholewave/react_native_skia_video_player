import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window'); // Screen width

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Profile Screen</Text>
    </View>
  );
}

function CameraScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Camera Screen</Text>
    </View>
  );
}

function BottomTabNavigator({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ProfileScreen />

      {/* Custom Bottom Tab */}
      <View style={styles.tabContainer}>
        {/* Hill-like Curved Background */}
        <Svg
          width={width}
          height={120}
          viewBox={`0 0 ${width} 120`}
          style={styles.svgBackground}
        >
          <Path
            d={`
              M0,100
              C${width * 0.25},100 ${width * 0.3},20 ${width / 2},20
              C${width * 0.7},20 ${width * 0.75},100 ${width},100
              V120 H0 Z
            `}
            fill="#1a1a40"
          />
        </Svg>

        {/* Tab Buttons */}
        <View style={styles.tabButtonContainer}>
          {/* Left Button */}
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Profile')}>
            <Icon name="user" size={24} color="white" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>

          {/* Center Floating Camera Button */}
          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => navigation.navigate('Camera')}
          >
            <Icon name="camera" size={30} color="white" />
          </TouchableOpacity>

          {/* Right Button */}
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={24} color="white" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 24,
    color: '#333',
  },
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  svgBackground: {
    position: 'absolute',
    bottom: 0,
  },
  tabButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 5,
    fontSize: 12,
    color: 'white',
  },
  centerButton: {
    position: 'absolute',
    top: -40, // Align with the hill peak
    left: width / 2 - 35, // Horizontally center (half button width = 35)
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#24246f',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
