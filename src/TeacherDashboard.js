import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../FirebaseConfig'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'


const TeacherDashboard = ({navigation}) => {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  useEffect(() => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        }
        else {
          console.log('User not found')
        }
      })
  }, [])
  return (
    <View style={styles.container}>


      <View style={[styles.container, { margin: 10 }]}>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Welcome back {name.firstName} {name.lastName}!</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => firebase.auth().signOut()}><Icon name="sign-out-alt" size={28} /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewV}>
          <TouchableOpacity style={[styles.viewPic, { backgroundColor: '#FF5E69' }]}>
            <Image style={styles.pic} source={require('../assets/icon/question.png')}></Image>
            <Text style={styles.text}>Manage Question</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.viewPic, { backgroundColor: '#96D2C5' }]}>
            <Image style={styles.pic} source={require('../assets/icon/class.png')}></Image>
            <Text style={styles.text}>Manage Class</Text>
          </TouchableOpacity>
        </View>


      </View>


    </View>


  )
}

export default TeacherDashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  pic: {
    height: 100,
    width: 100
  },
  viewPic: {
    alignItems: 'center',
    height: 150,
    width: 150,
    margin: 5,
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    width: '100%'
  },
  viewV: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})