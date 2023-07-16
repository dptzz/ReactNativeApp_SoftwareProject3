import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './FirebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'
import QuizApp from './src/QuizApp';
import Playground from './src/Playground';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import TeacherDashboard from './src/TeacherDashboard';
import AdminDashboard from './src/AdminDashboard';
import Loading from './src/Loading';
import UsersTab from './src/UsersTab';
import Welcome from './src/Welcome';



import Header from './component/Header';

//Manage classes
import ManageClass from './src/mngclass/ManageClass';
import AddClass1 from './src/mngclass/add/AddClass1';
import AddClass2 from './src/mngclass/add/AddClass2';
import AddClass3 from './src/mngclass/add/AddClass3';
import EditClass1 from './src/mngclass/edit/EditClass1';
import EditClass2 from './src/mngclass/edit/EditClass2';
import EditClass3 from './src/mngclass/edit/EditClass3';
//Manage subjects
import ManageSubjects from './src/mngsubject/ManageSubjects';
import AddSubject from './src/mngsubject/add/AddSubject';
import EditSubject from './src/mngsubject/edit/EditSubject';
//Manage chapters
import ManageChapter from './src/mngchapter/ManageChapter';
import AddChapter from './src/mngchapter/add/AddChapter';
import EditChapter from './src/mngchapter/edit/EditChapter';
//Manage questions
import ManageQuestion from './src/mngquestion/ManageQuestion';
import AddQuestion from './src/mngquestion/add/AddQuestion';
import EditQuestion from './src/mngquestion/edit/EditQuestion';
//Manage Students
import ManageStudents from './src/mngstudent/ManageStudents';
import EditStudent from './src/mngstudent/edit/EditStudent';
//Manage Teachers
import ManageTeachers from './src/mngteacher/ManageTeachers';
import EditTeacher from './src/mngteacher/edit/EditTeacher';
//Manage roles
import ManageRole from './src/mngrole/ManageRole';
import SetRole from './src/mngrole/setRole';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const AdminHome = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { height: 60 }, tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' } }} >
      <Tab.Screen name="AdminDashboard" component={AdminDashboard}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) =>
            <Icon name="home" color={color} size={size} />

          ,

        }}

      />
      <Tab.Screen name="ManageClass" component={ManageClass}
        options={{
          title: 'Classes',
          tabBarIcon: ({ color, size }) =>
            <Icon name="users" color={color} size={size} />

          ,

        }}
      />
      <Tab.Screen name="ManageSubjects" component={ManageSubjects}
        options={{
          title: 'Subjects',

          tabBarIcon: ({ color, size }) =>
            <Icon name="book" color={color} size={size} />

          ,

        }} />
      <Tab.Screen name="UsersTab" component={UsersTab}
        options={{
          title: 'Users',

          tabBarIcon: ({ color, size }) =>
            <Icon name="user-edit" color={color} size={size} />

          ,

        }} />
    </Tab.Navigator>
  )

}

const App = () => {
  const [initializing, setInitializing] = useState();
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  // Handle login state change
  function onAuthStateChanged(user) {
    setIsLoaded(true)
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUserRole(snapshot.data())
            console.log(userRole);
            setIsLoaded(false)
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Stack.Navigator>
            <Stack.Screen
              name='Welcome'
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                headerTitle: '',
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name='Registration'
              component={Registration}
              options={{
                headerTitle: '',
                headerTransparent: true,
              }}
            />
          </Stack.Navigator>
        </TouchableWithoutFeedback>
      </NavigationContainer>

    )
  }
  else {


    return (

      <NavigationContainer>
        {isLoaded && (<View style={styles.loading}><ActivityIndicator size={100}/></View>)}
        {
          userRole.role === 0 ?
            (

              <Stack.Navigator>
                <Stack.Screen name='QuizApp' component={QuizApp} />
                <Stack.Screen name='Playground' component={Playground} />
              </Stack.Navigator>

            ) : userRole.role === 1 ? (

              <Stack.Navigator>
                <Stack.Screen name='TeacherDashboard' component={TeacherDashboard} />
                <Stack.Screen name='Playground' component={Playground} />
              </Stack.Navigator>

            ) : (

              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Stack.Navigator >
                  <Stack.Screen name='AdminHome' component={AdminHome} options={{ headerShown: false }} />

                  {/* Manage classes */}
                  <Stack.Group>
                    {/* <Stack.Screen name='ManageClass' component={ManageClass} /> */}
                    <Stack.Screen name='AddClass1' component={AddClass1} />
                    <Stack.Screen name='AddClass2' component={AddClass2} />
                    <Stack.Screen name='AddClass3' component={AddClass3} />
                    <Stack.Screen name='EditClass1' component={EditClass1} />
                    <Stack.Screen name='EditClass2' component={EditClass2} />
                    <Stack.Screen name='EditClass3' component={EditClass3} />
                  </Stack.Group>

                  {/* Manage subjects */}

                  <Stack.Group>
                    {/* <Stack.Screen name='ManageSubjects' component={ManageSubjects} /> */}
                    <Stack.Screen name='AddSubject' component={AddSubject} />
                    <Stack.Screen name='EditSubject' component={EditSubject} />

                    {/* Manage chapter */}
                    <Stack.Screen name='ManageChapter' component={ManageChapter} />
                    <Stack.Screen name='AddChapter' component={AddChapter} />
                    <Stack.Screen name='EditChapter' component={EditChapter} />

                    {/* Manage questions */}
                    <Stack.Screen name='ManageQuestion' component={ManageQuestion} />
                    <Stack.Screen name='AddQuestion' component={AddQuestion} />

                    <Stack.Screen name='EditQuestion' component={EditQuestion} />

                  </Stack.Group>

                  {/* Manage teachers */}
                  <Stack.Group>
                    <Stack.Screen name='ManageTeachers' component={ManageTeachers} />
                    <Stack.Screen name='EditTeacher' component={EditTeacher} />
                  </Stack.Group>

                  {/* Manage students */}
                  <Stack.Group>
                    <Stack.Screen name='ManageStudents' component={ManageStudents} />
                    <Stack.Screen name='EditStudent' component={EditStudent} />
                  </Stack.Group>

                  {/* Manage Role */}
                  <Stack.Group>
                    <Stack.Screen name='ManageRole' component={ManageRole} />
                    <Stack.Screen name='SetRole' component={SetRole} />

                  </Stack.Group>






                </Stack.Navigator>
              </TouchableWithoutFeedback>

            )
        }
      </NavigationContainer>
    )
  }
}

export default App

const styles = StyleSheet.create({
  loading: {
    //position: 'relative',
    backgroundColor: 'white',
    top: 0, left: 0, right: 0, bottom: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
})

