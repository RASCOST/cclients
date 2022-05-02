import React, { useState } from 'react'
import { Text, View } from 'react-native'
import RNFS from 'react-native-fs'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { allClients } from '../model/model'

const OptionsLayout = () => {

  const createCSV = async (clientsArray, path) => {
    try {
      let content = 'id_client,name,phone\n'

      for (let idx=0; idx < clientsArray.rows.length; idx++) {
        content += `${clientsArray.rows.item(idx).id_client},${clientsArray.rows.item(idx).name},${clientsArray.rows.item(idx).phone}\n`
      }

      await RNFS.writeFile(path, content, 'utf8')

    } catch (error) {
      console.log(error);
    }
  }

  const exportDB = async () => {
    const filePath = RNFS.DownloadDirectoryPath + '/clients.csv'
    const all = []

    const result = await allClients()

    createCSV(result, filePath)
  }

  return (
    <View>
        <Pressable onPress={exportDB}>
          <Text>Exporter les données</Text>
        </Pressable>
    </View>
  )
}

export default OptionsLayout