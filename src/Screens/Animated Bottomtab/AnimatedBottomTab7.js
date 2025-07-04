import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTab from '../../Assets/svg/BottomTab';
import HomeIcon from '../../Assets/svg/Home';
import ProfileIcon from '../../Assets/svg/Profile';
import QrIcon from '../../Assets/svg/QrScan';

const Tab = createBottomTabNavigator();
const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => <View style={styles.screen} />;
const ProfileScreen = () => <View style={styles.screen} />;
const QrScreen = () => <View style={styles.screen} />;

const CustomBottomSVG = () => {
  return (
    <View style={styles.svgContainer} pointerEvents="none">
      <BottomTab width={windowWidth} height={200} preserveAspectRatio="none" />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            elevation: 0,
            borderTopWidth: 0,
            height: 80,
          },
          tabBarIcon: ({focused}) => {
            const iconSize = 40;
            const strokeColor = focused ? '#fff' : '#999';
            if (route.name === 'Home') {
              return (
                <HomeIcon
                  width={iconSize}
                  height={iconSize}
                  stroke={strokeColor}
                  strokeWidth={1}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <ProfileIcon
                  width={iconSize}
                  height={iconSize}
                  stroke={strokeColor}
                  strokeWidth={1}
                />
              );
            } else if (route.name === 'QrScan') {
              return <QrIcon width={70} height={70} />;
            }
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#999',
          tabBarIconStyle: {
            top: route.name === 'QrScan' ? -70 : 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'Inter-Regular',
          },
          tabBarLabelPosition: 'below-icon',
          tabBarBackground:()=><CustomBottomSVG />
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="QrScan"
          component={QrScreen}
          options={{
            title: '',
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#090029',
    // backgroundColor: '#fff',
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 999,
    // backgroundColor: '#fff',
  },
});
