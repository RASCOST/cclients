import React from 'react'
import { View, StyleSheet } from 'react-native'

import Name from './Name'
import Phone from './Phone'

const Client = ({ name, phone }) => {
  return (
    <View style={styles.container}>
        <Name name={name} />
        <Phone number={phone} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BDDCF2'
  }
})

export default Client