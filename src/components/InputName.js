import React, { forwardRef } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const InputName = forwardRef(({ value, placeholder, onchangetext, editable = true }, ref) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name='user' />
      <TextInput
        style={styles.text}
        autoCapitalize='words'
        ref={ref}
        editable={editable}
        defaultValue={value}
        placeholder={placeholder}
        onChangeText={text => onchangetext(text)}
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
    color: '#7A3BB8',
    textAlign: 'center'
  },
  text: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    fontSize: 20,
    marginLeft: 10,
    color: 'black'
  }
})
export default InputName