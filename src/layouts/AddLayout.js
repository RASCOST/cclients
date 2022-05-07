import React, { useState, useRef } from 'react'
import { Keyboard,  View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'

import { addUser, searchNameExists, searchPhoneExists } from '../model/model'

import Title from "../components/Title"
import InputName from '../components/InputName'
import InputPhone from '../components/InputPhone'
import { showToastSuccess, showToastError } from '../components/Toast'

const AddLayout = ({navigation}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  
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
   * Function who saves the client in the database
   * @returns 
   */
  const save = async () => {
    // verify if the input name is empty
    if(!name) {
      showToastError('Inserer le nom!')
      return
    }

    // verify if the input phone is empty
    if(!phone) {
      showToastError('Inserer le numèro de téléphone!')
      return
    }

    // regexp valid number
    if (phone.search(/(^\+?\d+$)/)) {
      showToastError('Inserer um numèro valide!')
      return
    }

    // verify if the client already exists in th DB
    let existsName = await searchNameExists(name)
    let existsPhone = await searchPhoneExists(phone)

    if(existsName.length > 0)
    {
      showToastError('Ce nom de client existe déjà!')
      return
    } else if(existsPhone.length > 0) {
      showToastError('Ce numéro de client existe déjà!')
      return
    }

    // save in the DB the new client
    let rowsAffected = addUser(name, phone)

    if(rowsAffected) {
      showToastSuccess('Enregistré.')
    } else {
      showToastError('Erreur d\'enregistrement.')
    }

    // clear the inputs and navigate to home
    reset()
  }

  /**
   * Function who clears the input texts, dismiss the keyboard and navigate to home
   */
  const reset = () => {
    Keyboard.dismiss()
    clearInputPhone()
    clearInputName()
    navigation.navigate('Liste')
  }

  return(
    <ImageBackground style={styles.image} source={require('../assets/contact.jpg')}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title />
        </View>
        <View style={{flex: 8.5, justifyContent: 'center'}}>
          <View style={styles.addView}>
            <Text style={styles.text}>Ajouter un client</Text>
            <InputName  ref={inputNameRef} placeholder={'Nom'} onchangetext={name => setName(name)}/>
            <InputPhone ref={inputPhoneRef} placeholder={'Téléphone'} onchangetext={phone => setPhone(phone.replaceAll(/\s/g,'')) }/>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={save}
              >
                <Text style={styles.buttonAdd}>Ajouter</Text>
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
  addView: {
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
  text: {
    textAlign: 'center',
    fontFamily: 'Cuprum-Regular',
    fontSize: 36,
    color: '#E5E5E5'
  }
})

export default AddLayout