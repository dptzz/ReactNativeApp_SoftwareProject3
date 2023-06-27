import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import QuizApp from './src/QuizApp';
import Playground from './src/Playground';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='QuizApp' component={QuizApp} />
        <Stack.Screen name='Playground' component={Playground} />
      </Stack.Navigator>
    </NavigationContainer>   
  )
}

export default App

const styles = StyleSheet.create({})

