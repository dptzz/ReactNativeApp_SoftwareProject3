import { TouchableOpacity, StyleSheet, Text, View, FlatList, Image, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { firebase } from '../FirebaseConfig'

const QuizApp = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [subjects, setSubjects] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCurrentUser()
    getSubject()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getSubject = async () => {
    const db = firebase.firestore()

    const classRef = db.collection('class')
    if (Object.keys(currentUser).length > 0) {
      const snapshot = await classRef.where('name', 'in', [currentUser["class"], ""]).get()
      if (snapshot.empty) {
        console.log('No matching documents...');
        setSubjects([])
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
    <ScrollView style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.containerV1}>
        <View style={styles.viewV1}>
          <View style={{
            paddingHorizontal: 15, paddingVertical: 5, borderWidth: 0, padding: 5, borderRadius: 15, shadowColor: '#000000',
            shadowRadius: 5,
            elevation: 5, justifyContent: 'center', backgroundColor: 'rgb(101,220,65)'
          }}>
            <Text style={styles.textV1}>Name: {currentUser.firstName}</Text>
            <Text style={styles.textV1}>Class: {currentUser.class}</Text>
          </View>
          <View style={{ padding: 5, borderRadius: 10, justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                shadowColor: '#000000',
                shadowRadius: 5,
                elevation: 5,
              }}
              onPress={() => firebase.auth().signOut()}>
              <Icon name="sign-out-alt" size={28} />
            </TouchableOpacity>

            {/* <Image source={require('../assets/icon/bookIcon.png')} style={{ height: 48, width: 48 }}></Image> */}
          </View>
        </View>

      </View>

      <View style={styles.containerV2}>

        <FlatList

          data={subjects}
          numColumns={2}
          alignItems={'center'}
          renderItem={({ item, index }) => (
            <View style={styles.subjectsView}>
              <View style={{ backgroundColor: 'white', borderWidth: 1, margin: 10, borderRadius: 30, width: '95%' }}>
                <TouchableOpacity
                  style={styles.subject}
                  onPress={() => navigation.navigate('Playground', { subject: item, userName: currentUser.firstName, userClass: currentUser.class })}>
                  <Text style={styles.textV2}>{item}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />


      </View>
      {/* <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => firebase.auth().signOut()}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View> */}

    </ScrollView>
  )
}

export default QuizApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerV1: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  containerV2: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  subjectsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
    width: '50%'
  },
  subject: {
    marginTop: 3,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgb(39,170,255)',
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
  },
  pic: {
    height: 40,
    width: 40
  },
  textV1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  textV2: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -3
  },
  viewV1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
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