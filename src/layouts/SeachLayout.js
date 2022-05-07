import React, { useState, useRef } from 'react'
import { Keyboard, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'

import Title from "../components/Title"
import InputPhone from '../components/InputPhone'
import InputName from '../components/InputName'
import { showToastError } from '../components/Toast';

import { searchName } from '../model/model'

const SearchLayout = ({ navigation }) => {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  // Text input references in the DOM
  const inputNameRef = useRef()
  const inputPhoneRef = useRef()

  /**
   * Function who uses the text input reference to set the placeholder's text in the name
   */
  const clearInputName = () => {
    inputNameRef.current.setNativeProps({ placeholder: 'Nom' })
  }
  
  /**
   * Function who uses the text input reference to set the placeholder's text in the name
   */
  const clearInputPhone = () => {
    inputPhoneRef.current.setNativeProps({ placeholder: 'Téléphone' })
  }

  /**
   * Function who verifies if the phone has an owner
   * @param {*} phone - the number to be verified
   * @returns 
   */
  const nameExists = async (phone) => {
    if(!phone) {
      showToastError('Insérer un numéro valable!')
      return
    }

    let result = await searchName(phone)

    if(result.rows.length === 0) { // if there's no name in the database
      setName(undefined)
    } else {
      setName(result.rows.item(0).name)
    }
  }

  /**
   * Function who renders the the component with the name if exists, or returns null if it doesn't exists
   * @returns - component
   */
  const renderName = () => {
    
    let component = null

    if(name === undefined) {
      component =  <Text style={styles.textNoExists}>Ce numéro n'existe pas!</Text>
      Keyboard.dismiss()
    } else if (name){
      Keyboard.dismiss()
      component =  <InputName ref={inputNameRef} value={name} editable={false}/>
    }

    return component
  }

  /**
   * Functions that resets the state and the inputs, and dismisses the keyboard and navigates to home.
   */
  const reset = () => {
    clearInputPhone()
    setPhone('')
    setName('')

    if(inputNameRef.current) { // if the input name was created then clear it
      clearInputName()
    }

    Keyboard.dismiss()
    navigation.navigate('Liste')
  }

  return(
    <ImageBackground style={styles.image} source={require('../assets/contact.jpg')}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title />
        </View>
        <View style={{flex: 8.5, justifyContent: 'center'}}>
          <View style={styles.searchView}>
            <Text style={styles.textTitle}>Chercher un client</Text>
            <InputPhone
              ref={inputPhoneRef}
              placeholder={'Insérer téléphone à chercher'}
              onchangetext={(phone) => setPhone(phone)}
            />
            {
              renderName()
            }
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => {
                  nameExists(phone)
                }}
              >
                <Text style={styles.buttonAdd}>Chercher</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={reset}
              >
                <Text style={styles.buttonCancel}>Retour</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  titleContainer:
  {
    flex: 1.5
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: '#0BC4FF',
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%'
  },
  buttonAdd: {
    fontFamily: 'CutiveMono-Regular',
    color: '#FFFFFF',
    backgroundColor: '#1B23ED',
    fontSize: 24,
    borderRadius: 10,
    padding: 10
  },
  buttonCancel: {
    fontFamily: 'CutiveMono-Regular',
    color: '#FFFFFF',
    backgroundColor: '#FF0C0C',
    fontSize: 24,
    borderRadius: 10,
    padding: 10
  },
  textTitle: {
    textAlign: 'center',
    fontFamily: 'Cuprum-Regular',
    fontSize: 36,
    color: '#E5E5E5'
  },
  textNoExists: {
    textAlign: 'center',
    fontFamily: 'CutiveMono-Regular',
    fontSize: 36,
    color: '#FF0C0C'
  }
})

export default SearchLayout