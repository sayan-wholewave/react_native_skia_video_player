import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { windowWidth } from '../../utils/util';

const ScratchCardList = () => {
  const navigation = useNavigation();

  const scratchCards = Array(5).fill(null); // Array to generate 5 cards

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      numColumns={2}
      columnWrapperStyle={
        {
          // alignItems: 'center',
          // justifyContent: 'space-between',
          // margin:10
        }
      }
      data={scratchCards}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => (
        <Pressable
          onPress={
            () => {
         

            navigation.navigate('MainScratchScreen', {cardIndex: index,prizeAmount:1000})
          }
          }>
          <Animated.View
            sharedTransitionTag={`scratchCard-${index}`}
            style={styles.card}>
            <Text style={styles.cardText}>Scratch Card {index + 1}</Text>
          </Animated.View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    alignItems: 'flex-start', // Aligns items to the start of the row
    // paddingHorizontal: 40,
    // justifyContent:'center',
    paddingTop: 20,
  },
  card: {
    width: windowWidth / 2 - 20,
    height: windowWidth / 2 - 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ScratchCardList;
