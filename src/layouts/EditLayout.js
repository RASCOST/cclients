import React, { useState, useRef } from 'react'
import { Keyboard, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'

import Title from "../components/Title"
import InputName from '../components/InputName'
import InputPhone from '../components/InputPhone'
import { showToastSuccess, showToastError } from '../components/Toast'

import { searchEdit, updateClient } from '../model/model';

const EditLayout = ({ navigation }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [client, setClient] = useState(null)
  const [nameExists, setNameExists] = useState(false)

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
   * Functions that resets the state and the inputs, and dismisses the keyboard and navigates to home.
   */
  const reset = () => {
    setNameExists(false)
    setName('')
    setPhone('')
    setClient(null)
    clearInputName()
    
    if(inputPhoneRef.current) {
      clearInputPhone()
    }

    Keyboard.dismiss()
    navigation.navigate('Liste')
  }

  const searchName = async (name) => {
    // verify if the name is empty
    if(!name) {
      showToastError('Insérer un nom!')
      return
    }

    let client = await searchEdit(name)

    // verify if the DB returns a client
    if(client.length > 0) {
      setNameExists(true)
      setClient(client.item(0))
    } else {
      showToastError("Ce client n'existe pas!")
    }
  }

  /**
   * Funtion who renders the button for searching and the button to save
   * @returns TouchableOpacity
   */
  const renderButtons = () => {
    if(!nameExists) {
      return <TouchableOpacity
                //onPress={() => searchEdit(name, setNameExists, setClient)}
                onPress={() => searchName(name)}
            >
              <Text style={styles.buttonAdd}>Chercher</Text>
            </TouchableOpacity>
    } else {
      return <TouchableOpacity
                onPress={() => {
                  let id_client = client.id_client

                  updateClient(name, phone, id_client)
                  reset()
                }}
            >
              <Text style={styles.buttonAdd}>Sauver</Text>
            </TouchableOpacity>
    }
  }

  /**
   * 
   */
  const renderPhone = () => {
    if(client){
      return <InputPhone ref={inputPhoneRef} value={client.phone} onchangetext={(phone) => setPhone(phone)}/>
    }

    return null
  }

  return(
    <ImageBackground style={styles.image} source={require('../assets/contact.jpg')}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title />
        </View>
        <View style={{flex: 8.5, justifyContent: 'center'}}>
          <View style={styles.editView}>
            <Text style={styles.text}>Éditer un client</Text>
            <InputName
              ref={inputNameRef}
              placeholder={'Nom du client'}
              onchangetext={(name) => {setName(name)}}
            />
            {
              renderPhone()
            }
            <View style={styles.buttons}>
              {renderButtons()}
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
  editView: {
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

export default EditLayout