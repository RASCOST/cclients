import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import RNFS from 'react-native-fs'

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'

import { allClients, countClients } from '../model/model'

import Title from '../components/Title'
import { showToastSuccess, showToastError } from '../components/Toast'

const OptionsLayout = () => {
  const [count, setCountClients] = useState('')

  useEffect(async () => {
    let result = await countClients()
    let test = result.rows

    setCountClients(result.rows.item(0)['count(*)'])
  }, [])

  const createCSV = async (clientsArray, path) => {
    try {
      let content = 'id_client,name,phone\n'

      for (let idx=0; idx < clientsArray.rows.length; idx++) {
        content += `${clientsArray.rows.item(idx).id_client},${clientsArray.rows.item(idx).name},${clientsArray.rows.item(idx).phone}\n`
      }

      await RNFS.writeFile(path, content, 'utf8')

      showToastSuccess('Donées Exportés')

    } catch (error) {
      showToastError(error)
    }
  }

  const exportDB = async () => {
    const filePath = RNFS.DownloadDirectoryPath + '/clients.csv'

    const result = await allClients()

    createCSV(result, filePath)
  }

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.subTitle}>
        <IconAntDesign name='setting' size={30} color={'rgb(205, 205, 205)'}/>
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
      <View style={styles.count}>
        <View style={styles.countTextView}>
          <IconMaterial name="counter" size={20}/>
          <Text style={styles.countText}>Nombre d'enregistrements:</Text>
        </View>
        <Text style={styles.countNumber}>{`${count}`} </Text>
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
    height: '8%',
    backgroundColor: 'rgb(155, 155, 155)',
    paddingLeft: 10
  },
  textSubTitle: {
    fontFamily: 'Cuprum-Regular',
    fontSize: 30,
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
  },
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  countTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  countText: {
    marginLeft: 10,
    fontSize: 15
  },
  countNumber: {
    width: 82,
    textAlign: 'center',
    backgroundColor: '#2196F3',
    marginRight: 10,
    color: 'white',
    fontWeight: 'bold',
    padding: 2,
    borderRadius: 2
  }

})
export default OptionsLayout