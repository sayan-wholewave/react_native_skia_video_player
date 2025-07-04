import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import QRScanScreen from './QRScanScreen';

// Regular Screens
const ScreenA = ({navigation}) => (
  <View style={{...styles.screen, backgroundColor: 'yellow'}}>
    <Text>Screen A</Text>
    <Button title="Go to B" onPress={() => navigation.navigate('ScreenB')} />
  </View>
);

const ScreenB = ({navigation}) => (
  <View style={{...styles.screen, backgroundColor: 'green'}}>
    <Text>Screen B</Text>
    <Button title="Go to C" onPress={() => navigation.navigate('ScreenC')} />
  </View>
);

const ScreenC = ({navigation}) => (
  <View style={{...styles.screen, backgroundColor: 'gray'}}>
    <Text>Screen C</Text>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
  </View>
);

const ModalScreen2 = ({navigation}) => (
  <View
    style={[
      styles.screen,
      {backgroundColor: 'yellow', justifyContent: 'space-evenly'},
    ]}>
    <Text style={{fontSize: 18}}>Modal Screen 2</Text>
    <Button
      title="Go to Modal Screen 3"
      onPress={() => navigation.navigate('ModalScreen3')}
    />
    <Button title="Go Back" onPress={() => navigation.goBack()} />
  </View>
);

const ModalScreen3 = ({navigation}) => (
  <View style={[styles.screen, {backgroundColor: 'lightgreen',justifyContent: 'space-evenly'}]}>
    <Text style={{fontSize: 18}}>Modal Screen 3</Text>
    <Button
      title="Go To Home Stack Specific Screen"
      onPress={() => navigation.navigate('Home', {screen: 'ScreenA'})}
    />
    <Button
      title="Close Modal"
      onPress={() => {
        navigation.popToTop();
        navigation.goBack();
      }}
    />
  </View>
);

// Stack Navigators for Tabs
const Stack = createStackNavigator();

const Tab1Stack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ScreenA" component={ScreenA} />
    <Stack.Screen name="ScreenB" component={ScreenB} />
    <Stack.Screen name="ScreenC" component={ScreenC} />
  </Stack.Navigator>
);

const Tab2Stack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ScreenD" component={ScreenA} />
    <Stack.Screen name="ScreenE" component={ScreenB} />
    <Stack.Screen name="ScreenF" component={ScreenC} />
  </Stack.Navigator>
);

// Modal Stack (Multiple Screens Inside Modal)
const ModalStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
    }}>
    <Stack.Screen name="QRScanScreen" component={QRScanScreen} />
    <Stack.Screen name="ModalScreen2" component={ModalScreen2} />
    <Stack.Screen name="ModalScreen3" component={ModalScreen3} />
  </Stack.Navigator>
);

// Bottom Tab Navigator with Icons
const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen
      name="Home"
      component={Tab1Stack}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }}
    />

    {/* Middle Tab to Open Modal with QR Scan Icon */}
    <Tab.Screen
      name="Scan"
      component={ScreenA} // Dummy component, won't be shown
      options={{
        tabBarButton: (props) => {          
          return (
            <TouchableOpacity
              {...props}
              onPress={() =>
                navigation.navigate('Modal', {screen: 'QRScanScreen'})
              }>
              <View style={styles.modalButton}>
                <MaterialIcons name="qr-code-scanner" color={'red'} size={30} />
              </View>
            </TouchableOpacity>
          );
        },
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Tab2Stack}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialIcons name="account-circle" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Root Stack (Includes Bottom Tabs + Modal)
const RootStack = createStackNavigator();

const AppNavigator = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid, // Smooth modal animation
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {duration: 500}, // Slower opening (default ~300ms)
        },
        close: {
          animation: 'timing',
          config: {duration: 500}, // Slower closing (default ~300ms)
        },
      },
      presentation: 'transparentModal',
    }}>
    <RootStack.Screen name="Main" component={BottomTabs} />
    <RootStack.Screen
      name="Modal"
      component={ModalStack}
      options={{presentation: 'modal'}}
    />
  </RootStack.Navigator>
);

// Styles
const styles = {
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  modalButton: {
    // backgroundColor: "black",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
};

export default function Custom_Bottom_Modal() {
  return <AppNavigator />;
}
