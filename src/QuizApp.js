import { TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../FirebaseConfig'

const QuizApp = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [subjects, setSubjects] = useState([])


  const getSubject = async () => {
    const db = firebase.firestore()

    const classRef = db.collection('class')
    if (Object.keys(currentUser).length > 0) {
      const snapshot = await classRef.where('name', 'in', [currentUser["class"],""]).get()
      if (snapshot.empty) {
        console.log('No matching documents...');
        return;
      }
      const thisUserClass = snapshot.docs.map(doc => doc.data())
      setSubjects(thisUserClass[0].subjects);
      console.log(subjects)
    }
  }
  const getCurrentUser = async () => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data())
          console.log(currentUser)
        }
        else {
          console.log('User not found')
        }
      })
  }
  useEffect(() => {
    getCurrentUser();

  }, [])
  useEffect(() => {
    getSubject();

  }, [currentUser])

  // useEffect(() => {
  //   const db = firebase.firestore()
  //   const classRef = db.collection('class').where('name', '==', currentUser.class)
  //   const unsubscribe = classRef.onSnapshot((snapshot) => {
  //     const thisUserClass = snapshot.docs.map(doc => doc.data())
  //     setSubjects(thisUserClass[0].subjects);
  //     console.log(subjects)
  //   })
  //   return () => {
  //     unsubscribe();
  //   }
  // }, [])

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Welcome back {currentUser.firstName}!</Text>

      <View style={styles.categoriesContainer}>

        <FlatList
          data={subjects}
          numColumns={2}
          alignItems={'center'}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.category}
              onPress={() => navigation.navigate('Playground', { subject: item, userName: currentUser.firstName, userClass: currentUser.class })}>
              <Text style={styles.categoryTitle}>{item}</Text>
            </TouchableOpacity>

          )}
        />


      </View>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => firebase.auth().signOut()}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default QuizApp

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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
  signOutButton: {
    width: 100,
    height: 50,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  }
})