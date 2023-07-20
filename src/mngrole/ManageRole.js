import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../FirebaseConfig'
import { onSnapshot } from 'firebase/firestore'
import { StackActions } from '@react-navigation/native'

const pushAction = (email) => StackActions.push('SetRole',
  { email: email })


const ManageRole = ({ navigation }) => {
  const [listStudents, setlistStudents] = useState([])
  const [listTeacher, setListTeacher] = useState([])
  const [listAdmin, setListAdmin] = useState([])

  const getStudents = async () => {
    const db = firebase.firestore()
    const studentRef = db.collection('users');
    const snapshot = await studentRef.where('role', '==', 0).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allStudent = snapshot.docs.map(doc => doc.data());

    setlistStudents(allStudent)
  }
  const getTeachers = async () => {
    const db = firebase.firestore()
    const teacherRef = db.collection('users');
    const snapshot = await teacherRef.where('role', '==', 1).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allTeacher = snapshot.docs.map(doc => doc.data());

    setListTeacher(allTeacher)
  }
  const getAdmins = async () => {
    const db = firebase.firestore()
    const studentRef = db.collection('users');
    const snapshot = await studentRef.where('role', '==', 2).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allAdmin = snapshot.docs.map(doc => doc.data());

    setListAdmin(allAdmin)
  }

  useEffect(() => {
    getStudents();
    getTeachers();
    getAdmins();
  }, [])
  useEffect(() => {
    const db = firebase.firestore()
    const studentRef = db.collection('users').where('role', '==', 0);
    const unsubscribe = studentRef.onSnapshot((snapshot) => {
      setlistStudents(snapshot.docs.map(doc => doc.data()));
    })
    return () => {
      unsubscribe();
    }
  }, [])
  useEffect(() => {
    const db = firebase.firestore()
    const teacherRef = db.collection('users').where('role', '==', 1);
    const unsubscribe = teacherRef.onSnapshot((snapshot) => {
      setListTeacher(snapshot.docs.map(doc => doc.data()));
    })
    return () => {
      unsubscribe();
    }
  }, [])
  useEffect(() => {
    const db = firebase.firestore()
    const adminRef = db.collection('users').where('role', '==', 2);
    const unsubscribe = adminRef.onSnapshot((snapshot) => {
      setListAdmin(snapshot.docs.map(doc => doc.data()));
    })
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ margin: 5, color: 'black', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Users</Text>
        <View style={{ flex: 1, borderWidth: 0}}>
          <View style={{ flex: 1}}>
            <Text style={styles.itemTitle}>Students</Text>
            <FlatList
              data={listStudents}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.item,
                  ]}>
                  <Text style={styles.itemname}>{item.email}</Text>
                  <TouchableOpacity
                    style={styles.itemTouchableOpacicty}
                    onPress={() => navigation.dispatch(pushAction(item.email))}
                  >
                    <Image source={require('../../assets/icon/edit.png')}
                      style={styles.itemTouchableOpacictyIcon} />

                  </TouchableOpacity>

                </View>
              )}
            />
          </View>

          <View style={{ flex: 1, borderTopWidth: 0 }}>
            <Text style={styles.itemTitle}>Teacher</Text>
            <FlatList
              data={listTeacher}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.item,
                  ]}>
                  <Text style={styles.itemname}>{item.email}</Text>
                  <TouchableOpacity
                    style={styles.itemTouchableOpacicty}
                    onPress={() => navigation.dispatch(pushAction(item.email))}
                  >
                    <Image source={require('../../assets/icon/edit.png')}
                      style={styles.itemTouchableOpacictyIcon} />

                  </TouchableOpacity>

                </View>
              )}
            />
          </View>

          <View style={{ flex: 1, borderTopWidth: 0 }}>
            <Text style={styles.itemTitle}>Admins</Text>
            <FlatList
              data={listAdmin}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.item,
                  ]}>
                  <Text style={styles.itemname}>{item.email}</Text>
                  <TouchableOpacity
                    style={styles.itemTouchableOpacicty}
                    onPress={() => navigation.dispatch(pushAction(item.email))}
                  >
                    <Image source={require('../../assets/icon/edit.png')}
                      style={styles.itemTouchableOpacictyIcon} />

                  </TouchableOpacity>

                </View>
              )}
            />
          </View>

        </View>

      </View>

    </View>

  )
}

export default ManageRole

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    padding: 10,

  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  item: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',

  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 5,
    color: 'black'
  },

  itemname: {
    flexGrow: 1,
    fontSize: 24,
    color: 'black'
  },
  itemTouchableOpacicty: {
    flexShrink: 0,
    alignContent: 'flex-end',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  itemTouchableOpacictyIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
})