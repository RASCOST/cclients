import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, ImageBackground,  StyleSheet } from 'react-native'

import Client from '../components/Client'

import { listUsers } from '../model/model';

const ListLayout = ({ onpress, letter }) => {
  const[list, setList] = useState([])

  useEffect(() => {
    listUsers(setList, letter)
  }, [])

  const renderItem = ({ item }) => (
    <Client
      name={item.name}
      phone={item.phone}
    />
  )

  const headerComponent = () => {
    return (
      <View  style={styles.headerContainer}>
        <Text style={styles.text}>{letter}</Text>
      </View>
    )
  }

  const footerComponent = () => {
    return (
      <View>
        <Button
          title='Retour'
          onPress={onpress}
        />
      </View>
    )
  }

  const separatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <ImageBackground style={styles.image} source={require('../assets/contact.jpg')}>
      <View>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => String(item.id_client)}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={footerComponent}
          ItemSeparatorComponent={separatorComponent}
        />
      </View>
    </ImageBackground>  
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white'
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
  }
})

export default ListLayout