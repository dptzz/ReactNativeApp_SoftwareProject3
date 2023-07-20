import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../FirebaseConfig'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const AdminDashboard = () => {
  const [name, setName] = useState('')
  const navigation = useNavigation()

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

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Welcome back {name.firstName}!</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => firebase.auth().signOut()}><Icon name="sign-out-alt" size={28} /></TouchableOpacity>
        </View>

      </View>


      <View style={styles.viewV}>
        <View style={[styles.viewPic, { backgroundColor: '#FF5E69' }]}>
          <Image style={styles.pic} source={require('../assets/icon/student.png')}></Image>
          <Text style={styles.text}>Current Student: 30</Text>
        </View>
        <View style={[styles.viewPic, { backgroundColor: '#96D2C5' }]}>
          <Image style={styles.pic} source={require('../assets/icon/class.png')}></Image>
          <Text style={styles.text}>Current Class: 5</Text>
        </View>
      </View>

      <View style={styles.viewV}>
        <View style={[styles.viewPic, { backgroundColor: '#5DC0FF' }]}>
          <Image style={styles.pic} source={require('../assets/icon/teacher.png')}></Image>
          <Text style={styles.text}>Current Teacher: 7</Text>
        </View>
        <View style={[styles.viewPic, { backgroundColor: '#8892E3' }]}>
          <Image style={styles.pic} source={require('../assets/icon/subject.png')}></Image>
          <Text style={styles.text}>Current Class: 5</Text>
        </View>
      </View>



    </View>
  )
}

export default AdminDashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
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
    backgroundColor: 'white'
  },
  viewV: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})