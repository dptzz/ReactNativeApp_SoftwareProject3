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
import TeacherDashboard from './src/TeacherDashboard';
import AdminDashboard from './src/AdminDashboard';
import Loading from './src/Loading';
import ManageClass from './src/ManageClass';
import ManageStudents from './src/ManageStudents';
import ManageSubjects from './src/ManageSubjects';
import ManageTeachers from './src/ManageTeachers';
import AddClass2 from './src/AddClass2';
import AddClass3 from './src/AddClass3';
import EditClass1 from './src/EditClass1';
import EditClass2 from './src/EditClass2';
import EditClass3 from './src/EditClass3';
import Header from './component/Header';
import AddClass1 from './src/AddClass1';

const Stack = createStackNavigator()

const App = () => {
  const [initializing, setInitializing] = useState();
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState(0);
  // Handle login state change
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserRole(snapshot.data())
        }
        else {
          console.log('User not found')
        }
      })
    }
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
  if (userRole.role === 0){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='QuizApp' component={QuizApp} />
          <Stack.Screen name='Playground' component={Playground} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  if (userRole.role === 1){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='TeacherDashboard' component={TeacherDashboard} />
          <Stack.Screen name='Playground' component={Playground} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  if (userRole.role === 2){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='AdminDashboard' component={AdminDashboard} />
          <Stack.Screen name='ManageClass' component={ManageClass} />
          <Stack.Screen name='AddClass1' component={AddClass1} />
          <Stack.Screen name='AddClass2' component={AddClass2} />
          <Stack.Screen name='AddClass3' component={AddClass3} />
          <Stack.Screen name='EditClass1' component={EditClass1} />
          <Stack.Screen name='EditClass2' component={EditClass2} />
          <Stack.Screen name='EditClass3' component={EditClass3} />
          <Stack.Screen name='ManageStudents' component={ManageStudents} />
          <Stack.Screen name='ManageTeachers' component={ManageTeachers} />
          <Stack.Screen name='ManageSubjects' component={ManageSubjects} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Loading' component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})

