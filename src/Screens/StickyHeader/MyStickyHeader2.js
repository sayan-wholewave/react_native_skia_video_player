import React, { useState } from "react";
import { View, TextInput, StyleSheet, StatusBar, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TabbedHeaderList } from "react-native-sticky-parallax-header";

const Tab = createMaterialTopTabNavigator();

const TABBED_SECTIONS = [
  { title: "Tab 1", data: Array.from({ length: 10 }, (_, i) => ({ text: `Item ${i + 1} in Tab 1` })) },
  { title: "Tab 2", data: Array.from({ length: 10 }, (_, i) => ({ text: `Item ${i + 1} in Tab 2` })) },
  { title: "Tab 3", data: Array.from({ length: 10 }, (_, i) => ({ text: `Item ${i + 1} in Tab 3` })) },
];

// Search Header
const Header = ({ searchQuery, setSearchQuery }) => (
  <View style={styles.header}>
    <TextInput
      style={styles.searchBar}
      placeholder="Search..."
      placeholderTextColor="#ccc"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  </View>
);

// Tab Screen Component
const TabScreen = ({ data }) => (
  <View style={styles.tabContainer}>
    {data.map((item, index) => (
      <Text key={index} style={styles.itemText}>{item.text}</Text>
    ))}
  </View>
);

// Tabs Component
const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: "#ff5722" },
      tabBarActiveTintColor: "#fff",
      tabBarIndicatorStyle: { backgroundColor: "#fff" },
    }}
  >
    {TABBED_SECTIONS.map((section) => (
      <Tab.Screen key={section.title} name={section.title}>
        {() => <TabScreen data={section.data} />}
      </Tab.Screen>
    ))}
  </Tab.Navigator>
);

// Main Component with Sticky Header & Tabs
const MyStickyHeaderFlatList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <TabbedHeaderList
        containerStyle={styles.container}
        backgroundColor="#ff5722"
        title="Food Delivery App"
        titleStyle={styles.titleStyle}
        foregroundImage={require('../../Assets/images/pizza.png')}
        parallaxHeight={120}
        renderHeader={() => <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        renderTabs={() => <Tabs />}
        sections={TABBED_SECTIONS} // ✅ Fix: Pass sections to avoid undefined error
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ item }) => <Text style={styles.itemText}>{item.text}</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      />
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
    </>
  );
};

// App Component
export default function MyStickyHeaderFlatList2() {
  return (
    <>
      <MyStickyHeaderFlatList />
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  titleStyle: { fontSize: 22, fontWeight: "bold", color: "#fff" },

  // Header Styles
  header: { height: 80, backgroundColor: "#6200ea", justifyContent: "center", paddingHorizontal: 16 },
  searchBar: { backgroundColor: "#fff", height: 40, borderRadius: 8, paddingHorizontal: 12, fontSize: 16 },

  // Tab Styles
  tabContainer: { flex: 1, alignItems: "center", paddingTop: 20 },
  itemText: { fontSize: 18, padding: 10, color: "#333" },
  sectionHeader: { fontSize: 20, fontWeight: "bold", backgroundColor: "#ddd", padding: 10 },
});
