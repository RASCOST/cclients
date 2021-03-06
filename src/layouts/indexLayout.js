import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'

import Title from '../components/Title'
import Search from '../components/Search'
import Letter from '../components/Letter'

import ListLayout from './ListLayout'

const indexLayout = () => {
  const [showList, setShowList] = useState(false)
  const [letterPressed, setLetterpressed] = useState('')

    /**
     * Handle the event of click in one of the letters in the letter's list.
     * @param {*} letter string with the who has been pressed.
     */
    const onPressLetter = (letter) => {
      setLetterpressed(letter)
      setShowList(true)
    }

    /**
     * Handle the event of click in the button int he footer flatlist.
     */
    const onPressBack = () => {
      setShowList(false)
    }

    /**
     * Function who renders all the letters.
     * @returns JSX component.
     */
    const renderLetterList = () => {
      const letterCode = 97
      const alphabet = []
      let letter = ''

      // Create an array with the Letter component from "a" to "y"
      // the x letter is added in a separeted Letter component
      for(let letterInc = 0; letterInc < 25; letterInc++) {
        letter = String.fromCharCode(letterCode + letterInc)
        alphabet.push(<Letter key={letter} letter={letter} onpress={onPressLetter} />)
      }

      return (
        <>
          <View style={styles.alphabet}>
            {alphabet}
          </View>
          <View>
            <Letter letter={'z'} onpress={onPressLetter} />
          </View>
        </>
      )
    }


  /**
   * Function that calls the function renderletterList.
   * @returns JSX component.
   */
  const renderIndex = () => {
    return (
      <KeyboardAvoidingView behavior="height"
        style={{ flex: 1 }}
      >
      <ImageBackground style={styles.image} source={require('../assets/contact.jpg')}>
        <View style={styles.container}>
          <Title />
          <View style={styles.searchView}>
            <Search />
          </View>
          <View style={styles.alphabetContainer}>
            {renderLetterList()}
          </View>
        </View>
      </ImageBackground>
      </KeyboardAvoidingView>
    )
  }

  /**
   * Function that render the component with the the flatlist.
   * @returns JSX component.
   */
  const renderList = () => {
    return (
      <ListLayout
        letter={letterPressed}
        onpress={onPressBack}
      />
    )
  }

  return(
    <View style={{ flex: 1 }}>
      {!showList ? renderIndex() : renderList(letterPressed)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  alphabetContainer: {
    flex: 1,
    height: '100%',
    marginTop: 20
  },
  searchView: {
    height: 65
  },
  alphabet: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    flex: 1,
  }
})
export default indexLayout