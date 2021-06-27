import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const Title = () => {
  return (
    <View style={styles.title}>
      <Image 
        source={ require('../assets/book.png') }
      />
      <Text style={styles.titleText}>Contact Clients</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    //height: 98,
    backgroundColor: '#0BC4FF'
  },
  titleText: {
    fontSize: 34,
    fontFamily: 'CroissantOne-Regular',
    marginLeft: 5
  }
})

export default Title