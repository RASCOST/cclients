import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

const Name = ({ name }) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name='user' />
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 26,
    marginLeft: '25%'
  },
  icon: {
    color: '#7A3BB8',
    fontSize: 24,
    marginLeft: 5
  }
})

export default Name