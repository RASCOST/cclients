import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Pressable, Modal, StyleSheet } from 'react-native'

import { searchPhone } from '../model/model'

import Icon from 'react-native-vector-icons/FontAwesome'
import InputName from './InputName'
import InputPhone from './InputPhone'

const Search = () => {
  const [name, setName] = useState('')
  const [client, setClient] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Text input reference in the DOM
  const inputRef = useRef()

  /**
   * Function who uses the text input reference to set the placeholder's text in the search
   */
  const clearInput = () => {
    inputRef.current.setNativeProps({ placeholder: 'Chercher Client' })
  }

  /**
   * Function that searches in the database the client with his name.
   */
  const searchClient = async () => {
    let result = await searchPhone(name)

    if(result.rows.length > 0) {
      setClient({ name, phone: result.rows.item(0).phone})
    }
  }

  return (
    <View style={styles.searchView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centerModal}>
          <View style={styles.viewModal}>
            {/* Verify if the client exists in the list */}
            {!client ?
              <Text style={styles.text}>N'existe pas!</Text> :
              <>
                <InputName value={client.name} editable={false}/>
                <InputPhone value={client.phone} editable={false}/>
              </>
            }
            <Pressable
              style={styles.buttonModal}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setName('')
                  setClient(null)
                  clearInput()
                }}
            >
              <Text style={styles.textButton}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.inputSearch}
        autoCapitalize='words'
        placeholder='Chercher Client'
        onChangeText={(text) => setName(text)}
        ref={inputRef}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true)
          searchClient(name)
        }}>
        <Icon name='search' size={24}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21E8E8',
  },
  inputSearch: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginLeft: 5,
    marginRight: 8,
    borderRadius: 5
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  viewModal: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#0BC4FF',
    borderRadius: 10
  },
  buttonModal: {    
    backgroundColor: '#FF0C0C',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '50%',
    alignSelf: 'center'
  },
  textButton: {
    fontFamily: 'CutiveMono-Regular',
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    fontFamily: 'CutiveMono-Regular',
    color: '#FFFFFF',
    fontSize: 40,
    textAlign: 'center',
    margin: 10
  }
})
export default Search