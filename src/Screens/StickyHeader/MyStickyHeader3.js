import React, {useState} from 'react';
import {View, TextInput, StatusBar, StyleSheet, Text} from 'react-native';
import {TabbedHeaderList} from 'react-native-sticky-parallax-header';

const colors = {
  coralPink: '#FF6F61',
  activeOrange: '#FF4500',
  white: '#FFFFFF',
};

// Dummy Data for Tabs and Sections
const TABBED_SECTIONS = [
  {
    title: 'Fruits',
    tabTestID: 'tab-fruits',
    data: [
      {title: '🍎 Apple'},
      {title: '🍌 Banana'},
      {title: '🍉 Watermelon'},
      {title: '🍇 Grapes'},
    ],
  },
  {
    title: 'Vegetables',
    tabTestID: 'tab-vegetables',
    data: [
      {title: '🥕 Carrot'},
      {title: '🥔 Potato'},
      {title: '🌽 Corn'},
      {title: '🍆 Eggplant'},
    ],
  },
  {
    title: 'Dairy',
    tabTestID: 'tab-dairy',
    data: [
      {title: '🥛 Milk'},
      {title: '🧀 Cheese'},
      {title: '🍦 Ice Cream'},
      {title: '🥚 Eggs'},
    ],
  },
];

// Search Bar Component
const SearchBar = ({searchQuery, setSearchQuery}) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      placeholderTextColor="#aaa"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  </View>
);

// Section Header
const TabbedSectionHeader = ({title}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

// Section Item
const TabbedSectionItem = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{title}</Text>
  </View>
);

export const TabbedHeaderListExample = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Data Based on Search Query
  const filteredSections = TABBED_SECTIONS.map(section => ({
    ...section,
    data: section.data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter(section => section.data.length > 0);

  return (
    <>
      <TabbedHeaderList
        contentContainerStyle={{backgroundColor: colors.coralPink}}
        backgroundColor={colors.coralPink}
        containerStyle={styles.container}
        title="Grocery Store"
        titleStyle={styles.title}
        foregroundImage={require('../../Assets/images/pizza.png')}
        parallaxHeight={100}
        tabs={TABBED_SECTIONS.map(({title}) => ({title}))}
        tabTextStyle={styles.tabText}
        sections={filteredSections}
        tabTextContainerActiveStyle={{backgroundColor: colors.activeOrange}}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({item}) => <TabbedSectionItem {...item} />}
        renderSectionHeader={({section}) => (
          <TabbedSectionHeader title={section.title} />
        )}
        renderHeader={() => (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        getItemLayout={(_, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
        updateCellsBatchingPeriod={100}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.coralPink}
        translucent
      />
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  tabText: {
    color: colors.white,
  },
});

export default TabbedHeaderListExample;
