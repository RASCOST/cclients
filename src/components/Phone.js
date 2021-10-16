import React from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'



const Phone = ({ number }) => {
  const phoneCall = (phone) => {
    Linking.openURL("tel:" + phone)
  }

  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name='old-phone' />
      <Text onLongPress={() => phoneCall(number)} style={styles.text}>{number}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 24,
    color: '#7A3BB8',
    marginLeft: 5
  },
  text: {
    fontSize: 26,
    marginLeft: '25%'
  }
})
export default Phone