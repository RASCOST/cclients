import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const Letter = ({ letter, onpress }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onpress(letter)}
      >
        <Text style={styles.letter}>{letter}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexBasis: '20%',
    //justifyContent: 'center',
    //alignContent: 'center',
    //width: '20%',
    //height: '16.7%'
  },
  letter: {
    alignSelf: 'center',
    //padding: 2,
    //paddingBottom: 25,
    fontSize: 65,
    lineHeight: 72,
    fontFamily: 'CroissantOne-Regular',
    
  }
})
export default Letter