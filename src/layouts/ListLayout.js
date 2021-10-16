import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, ImageBackground,  StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import Client from '../components/Client'

import { listUsers } from '../model/model';

const ListLayout = ({ onpress, letter }) => {
  const[list, setList] = useState([])

  /**
   * Load from the database the clients which name begins with the letter, used as parameter.
   */
  useEffect(async () => {
    const users = []
    let result = await listUsers(letter)

    for(let user = 0; user < result.rows.length; user++) {
      users.push(result.rows.item(user))
    }

    setList(users)
  }, [])

  /**
   * Function who returns a JSX component Client (name, phone) to be rendered in the flatlist.
   * @param {*} item object with name and phone.
   * @returns JSX component Client.
   */
  const renderItem = ({ item }) => (
    <Client
      name={item.name}
      phone={item.phone}
    />
  )

  /**
   * Fonction who returns the component header of the flatlist.
   * @returns JSX component header.
   */
  const headerComponent = () => {
    return (
      <View  style={styles.headerContainer}>
        <Text style={styles.text}>{letter}</Text>
      </View>
    )
  }

  /**
   * Fonction who returns the component footer of the flatlist.
   * This function will be commented for illustrative purposes.
   * @returns JSX component footer.
   */
  /* const footerComponent = () => {
    return (
      <View>
        <Button
          title='Retour'
          onPress={onpress}
        />
      </View>
    )
  } */

  /**
   * Fonction who returns the component separator in the flatlist.
   * @returns JSX component separator.
   */
  const separatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <ImageBackground style={styles.image} source={require('../assets/contact.jpg')}>
      <View style={styles.listContainer}>

        <View style={styles.pressableContainer}>
          <Pressable onPress={onpress}>
            <Text style={styles.pressableText}><Icon style={styles.icon} name='arrow-back'/>index</Text>
          </Pressable>
        </View>

        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => String(item.id_client)}
          ListHeaderComponent={headerComponent}
          //ListFooterComponent={footerComponent}
          ItemSeparatorComponent={separatorComponent}
        />

      </View>
    </ImageBackground>  
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: 'white',
    opacity: 0.9
  },
  separatorLine: {
    height: 2,
    backgroundColor: 'white',
    paddingTop: 2,
  },
  text: {
    fontSize: 72,
    fontFamily: 'CroissantOne-Regular'
  },
  image: {
    flex:1
  },
  pressableContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#7A3BB8',
    opacity: 0.9
  },
  pressableText: {
    fontSize: 18,
    color: 'white',
  },
  icon: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5
  },
})

export default ListLayout