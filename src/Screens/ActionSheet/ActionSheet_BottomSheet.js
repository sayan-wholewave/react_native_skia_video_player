import { View, Text, Button } from 'react-native'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet';

export default function ActionSheet_BottomSheet() {
  return (
    <View>
      <Button title='Press' onPress={()=>{
          SheetManager.show('hello');
      }}/>
    </View>
  )
}