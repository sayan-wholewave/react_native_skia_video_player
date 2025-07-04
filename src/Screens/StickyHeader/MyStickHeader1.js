import React, { useState } from "react";
import { 
  Platform, StatusBar, StyleSheet, TextInput, View, Text, Pressable, FlatList, 
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StickyHeaderFlatList } from "react-native-sticky-parallax-header";

const DATA = Array.from({ length: 20 }, (_, i) => `This is paragraph ${i + 1}`);
const TABS = ["Tab 1", "Tab 2", "Tab 3"];

const Header = ({ searchQuery, setSearchQuery }) => (
  <View style={{...styles.header,flexDirection:'row',flex:1,justifyContent:"space-evenly",alignItems:'center'}}>
    <Image source={
    require('../../Assets/images/pizza.png')

    }
    style={{height:30,width:30}}
    />
    <TextInput
      style={styles.searchBar}
      placeholder="Search..."
      placeholderTextColor="#ccc"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  </View>
);

const Tabs = ({ selectedTab, setSelectedTab }) => (
  <View style={styles.tabsContainer}>
    {TABS.map((tab, index) => (
      <Pressable 
        key={index} 
        style={[styles.tab, selectedTab === index && styles.activeTab]}
        onPress={() => setSelectedTab(index)}
      >
        <Text style={[styles.tabText, selectedTab === index && styles.activeTabText]}>
          {tab}
        </Text>
      </Pressable>
    ))}
  </View>
);

const Paragraph = ({ text }) => (
  <View style={styles.paragraph}>
    <Text style={styles.paragraphText}>{text}</Text>
  </View>
);

const MyStickyHeaderFlatList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 2000));
    setRefreshing(false);
  };

  const filteredData = DATA.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StickyHeaderFlatList
        containerStyle={styles.stretchContainer}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderHeader={() => <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        renderItem={({ item }) => <Paragraph text={item} />}
        renderTabs={() => 
        <><Text style={{
          color:'#000'
        }}>test</Text>
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </>}
        refreshing={refreshing}
        {...Platform.select({ native: { onRefresh } })}
        scrollEventThrottle={16}
      />
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  stretchContainer: { flex: 1 },

  // Header Styles
  header: { height: 80, backgroundColor: "#6200ea", justifyContent: "center", paddingHorizontal: 16 },
  searchBar: { 
    backgroundColor: "#fff", 
    height: 40, 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    fontSize: 16 ,flex:0.9
  },

  // Tabs Styles
  tabsContainer: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#ff5722", paddingVertical: 10 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  activeTab: { backgroundColor: "#ffccbc" },
  tabText: { fontSize: 16, color: "#fff" },
  activeTabText: { color: "#000", fontWeight: "bold" },

  // Paragraph Styles
  paragraph: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  paragraphText: { fontSize: 16, color: "#333" },
});

export default MyStickyHeaderFlatList;
