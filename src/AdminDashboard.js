import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../FirebaseConfig'
import { useNavigation } from '@react-navigation/native'

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
      <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Welcome back {name.firstName}!</Text>
      {/* <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('ManageClass')}>
          <Text style={styles.categoryTitle}>Manage Class</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('ManageStudents')}>
          <Text style={styles.categoryTitle}>Manage Students</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('ManageTeachers')}>
          <Text style={styles.categoryTitle}>Manage Teachers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('ManageSubjects')}>
          <Text style={styles.categoryTitle}>Manage Subjects</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

export default AdminDashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  category: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
})