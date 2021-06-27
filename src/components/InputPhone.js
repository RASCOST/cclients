import React, { forwardRef } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

const InputPhone = forwardRef(({ value, placeholder, onchangetext, editable = true }, ref) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name='old-phone' />
      <TextInput
        keyboardType='numeric'
        ref={ref}
        style={styles.text}
        editable={editable}
        defaultValue={value}
        placeholder={placeholder}
        onChangeText={(text) => onchangetext(text)}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  icon: {
    fontSize: 30,
    color: '#7A3BB8'
  },
  text: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    fontSize: 20,
    marginLeft: 10,
    color: 'black'
  }
})

export default InputPhone