/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SplashScreen from 'react-native-splash-screen'

import indexLayout from './src/layouts/indexLayout'
import AddLayout from './src/layouts/AddLayout'
import SearchLayout from './src/layouts/SeachLayout'
import EditLayout from './src/layouts/EditLayout'

import IconFontawesome from 'react-native-vector-icons/FontAwesome'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

const App = () => {

  useEffect( () => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'Liste') {
              icon = <IconFontawesome name='list-alt' color={color} size={size} />
            } else if (route.name === 'Ajouter') {
              icon = <IconAntDesign name='adduser' color={color} size={size} />
            } else if(route.name === 'Chercher') {
              icon = <IconMaterial name='account-search-outline' color={color} size={size} />
            } else if(route.name === 'Editer') {
              icon = <IconMaterial name='account-edit-outline' color={color} size={size} />
            }

            // You can return any component that you like here!
            return icon //<Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'black'
        }}
      >
        <Tab.Screen name="Liste" component={ indexLayout } />
        <Tab.Screen name="Ajouter" component={ AddLayout } />
        <Tab.Screen name="Chercher" component={ SearchLayout } />
        <Tab.Screen name="Editer" component={ EditLayout } />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
