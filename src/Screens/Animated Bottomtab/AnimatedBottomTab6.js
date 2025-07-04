import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import {
  TabBar,
} from '@mindinventory/react-native-tab-bar-interaction';
import LottieView from 'lottie-react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function AnimTab6() {
  const tabs = useMemo(() => tabData, []);
  const flatListRef = useRef(null);

  const onTabChange = useCallback((_item, index) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={tabs}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.slide,
                {
                  backgroundColor: item.activeTintColor,
                },
              ]}
            >
              <Text style={styles.titleText}>{item.name}</Text>
            </View>
          );
        }}
        scrollEnabled={false}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <TabBar
        tabs={tabs}
        onTabChange={onTabChange}
        containerWidth={screenWidth - 30}
        containerBottomSpace={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  box: { width: 60, height: 60, marginVertical: 20 },
  slide: { width: screenWidth, justifyContent: 'center', alignItems: 'center' },
  titleText: { color: '#fff' },
  tabStyle: { width: 40, height: 40 },
});

const lottieIconStyle = {
  width: 30,
  height: 30,
};

const activeHome = (isPlay) => {
  return (
    <View style={styles.tabStyle}>
      <LottieView
        source={require(`../../Assets/animations/bar.json`)}
        autoPlay={isPlay}
        loop={false}
        style={lottieIconStyle}
      />
    </View>
  );
};

const activeList = (isPlay) => {
  return (
    <View style={styles.tabStyle}>
      <LottieView
        source={require(`../../Assets/animations/cart.json`)}
        autoPlay={isPlay}
        loop={false}
        style={lottieIconStyle}
      />
    </View>
  );
};

const activeSearch = (isPlay) => {
  return (
    <View style={styles.tabStyle}>
      <LottieView
        source={require(`../../Assets/animations/search.json`)}
        autoPlay={isPlay}
        loop={false}
        style={lottieIconStyle}
      />
    </View>
  );
};

const activeSetting = (isPlay) => {
    return (
      <View style={styles.tabStyle}>
        <LottieView
          source={require(`../../Assets/animations/setting.json`)}
          autoPlay={isPlay}
          loop={false}
          style={lottieIconStyle}
        />
      </View>
    );
  };

  const activeUser = (isPlay) => {
    return (
      <View style={styles.tabStyle}>
        <LottieView
          source={require(`../../Assets/animations/user.json`)}
          autoPlay={isPlay}
          loop={false}
          style={lottieIconStyle}
        />
      </View>
    );
  };

const tabData= [
  {
    name: 'Home',
    activeTintColor: '#61b769',
    activeIcon: activeHome(true),
    inactiveIcon: activeHome(false),
  },
  {
    name: 'Cart',
    activeTintColor: '#bcc9d7',
    activeIcon: activeList(true),
    inactiveIcon: activeList(false),
  },
  {
    name: 'Search',
    activeTintColor: '#546b7f',
    activeIcon: activeSearch(true),
    inactiveIcon: activeSearch(false),
  },
  {
    name: 'Setting',
    activeTintColor: '#546b7f',
    activeIcon: activeSetting(true),
    inactiveIcon: activeSetting(false),
  },
//   {
//     name: 'User',
//     activeTintColor: '#546b7f',
//     activeIcon: activeUser(true),
//     inactiveIcon: activeUser(false),
//   },
];