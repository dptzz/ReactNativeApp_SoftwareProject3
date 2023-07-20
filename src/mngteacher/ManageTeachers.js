import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'

const pushAction = (email) => StackActions.push('EditTeacher',
  { email: email })


const ManageTeachers = ({ navigation }) => {
  const [listStudents, setListTeachers] = useState([])

  const getTeacher = async () => {
    const db = firebase.firestore()
    const teacherRef = db.collection('users');
    const snapshot = await teacherRef.where('role', '==', 1).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allTeacher = snapshot.docs.map(doc => doc.data());

    setListTeachers(allTeacher)
  }



  useEffect(() => {
    getTeacher();
  }, [])
  useEffect(() => {
    const db = firebase.firestore()
    const teacherRef = db.collection('users').where('role', '==', 1);
    const unsubscribe = teacherRef.onSnapshot((snapshot) => {
      setListTeachers(snapshot.docs.map(doc => doc.data()));
    })
    return () => {
      unsubscribe();
    }
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ color: 'black', margin: 5, fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Teachers</Text>
        <View style={{ flex: 1 }}>
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
                {/* <TouchableOpacity
                  style={styles.itemTouchableOpacicty}
                  onPress={() => deleteStudent(item.email)}
                >
                  <Image source={require('../../assets/icon/bin.png')}
                    style={styles.itemTouchableOpacictyIcon} />

                </TouchableOpacity> */}
              </View>
            )}
          />
        </View>

      </View>

    </View>

  )
}

export default ManageTeachers

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