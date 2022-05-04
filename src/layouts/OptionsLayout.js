import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import RNFS from 'react-native-fs'

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'

import { allClients } from '../model/model'

import Title from '../components/Title'

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
    <View style={styles.container}>
      <Title />
      <View style={styles.subTitle}>
        <IconAntDesign name='setting' size={20} color={'rgb(205, 205, 205)'}/>
        <Text style={styles.textSubTitle}>Options</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.description}>
          <IconMaterial name="database-export" size={20}/>
          <Text style={styles.descriptionText}>Exporter les données</Text>
        </View>
        <Button 
          title='Exporter'
          onPress={exportDB}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  subTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '6%',
    backgroundColor: 'rgb(155, 155, 155)',
    paddingLeft: 10
  },
  textSubTitle: {
    fontSize: 20,
    marginLeft: 10,
    color: 'rgb(205, 205, 205)'
  },
  content: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
  },
  descriptionText: {
    marginLeft: 10,
    fontSize: 15
  }

})
export default OptionsLayout