import React from 'react'
import { Text, View } from 'react-native'
import RNFS from 'react-native-fs'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OptionsLayout = () => {

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