import React from 'react'
import { Text, View } from 'react-native'
import RNFS from 'react-native-fs'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {} from '../model/model';

const OptionsLayout = () => {
  const exportDB = () => {
    const filePath = RNFS.DocumentDirectoryPath + '/clients.cvs'
  }

  return (
    <View>
      <TouchableOpacity>
        <Text>
          Exporter BD
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default OptionsLayout