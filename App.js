import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './FirebaseConfig';

import QuizApp from './src/QuizApp';
import Playground from './src/Playground';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';

import Header from './component/Header';

const Stack = createStackNavigator()

const App = () => {
  const [initializing, setInitializing] = useState();
  const [user, setUser] = useState();
  // Handle login state change
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerTitle: () => <Header name="Login" />,
              headerStyle: {
                height: 125,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: '#00E4D0',
                shadowColor: '#000',
                elevation: 25
              }
            }}
          />
          <Stack.Screen
            name='Registration'
            component={Registration}
            options={{
              headerTitle: () => <Header name="Registration" />,
              headerStyle: {
                height: 125,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: '#00E4D0',
                shadowColor: '#000',
                elevation: 25
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }
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

