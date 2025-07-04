import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 24;
const HEADER_HEIGHT = 60;
const SEARCH_BAR_HEIGHT = 60;
const SCREEN_WIDTH = Dimensions.get("window").width;
const Tab = createMaterialTopTabNavigator();
const DATA = Array.from({ length: 30 }).map((_, index) => ({
  id: String(index),
  title: `Item ${index + 1}`,
}));
const StickyHeader = ({ scrollY }) => {
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={[styles.header, { transform: [{ translateY: headerTranslateY }], opacity: headerOpacity }]}
    >
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Search Page</Text>
    </Animated.View>
  );
};
const SearchBar = ({ scrollY, search, setSearch }) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  const searchBarWidth = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [SCREEN_WIDTH * 0.95, SCREEN_WIDTH * 0.85],
    extrapolate: "clamp",
  });
  const filterOpacity = scrollY.interpolate({
    inputRange: [30, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={[styles.searchContainer, { transform: [{ translateY }] }]}
    >
      <Animated.View style={[styles.searchBox, { width: searchBarWidth }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
        <Animated.View style={[styles.filterButton, { opacity: filterOpacity }]}>
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color="#6200ea" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};
const TabScreen = ({ scrollY }) => {
  const tabBarMarginTop = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [STATUS_BAR_HEIGHT + HEADER_HEIGHT + SEARCH_BAR_HEIGHT, STATUS_BAR_HEIGHT + HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingTop: STATUS_BAR_HEIGHT + HEADER_HEIGHT + SEARCH_BAR_HEIGHT }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    />
  );
};
export default function CustomStickyHeader() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState("");
  const tabBarMarginTop = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [STATUS_BAR_HEIGHT + HEADER_HEIGHT + SEARCH_BAR_HEIGHT, STATUS_BAR_HEIGHT + HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6200ea" />
        <StickyHeader scrollY={scrollY} />
        <SearchBar scrollY={scrollY} search={search} setSearch={setSearch} />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#fff",
              transform: [{ translateY: tabBarMarginTop }],
            },
            tabBarIndicatorStyle: { backgroundColor: "#6200ea" },
            tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          }}
        >
          <Tab.Screen name="Tab 1">{() => <TabScreen scrollY={scrollY} />}</Tab.Screen>
          <Tab.Screen name="Tab 2">{() => <TabScreen scrollY={scrollY} />}</Tab.Screen>
          <Tab.Screen name="Tab 3">{() => <TabScreen scrollY={scrollY} />}</Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: "#6200ea",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 1000,
  },
  backButton: { marginRight: 15 },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center" },
  searchContainer: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT + HEADER_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 999,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, fontSize: 16, padding: 10 },
  filterButton: { marginLeft: 10 },
  item: {
    height: 80,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  itemText: { fontSize: 18 },
})








