import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../FirebaseConfig'
import { StackActions } from '@react-navigation/native'

const pushAction = () => StackActions.push('EditSubject1')

const ManageStudents = ({ navigation }) => {
  const [listSubjects, setlistClass] = useState([])

  const getSubjects = async () => {
    const db = firebase.firestore()
    const subjectsRef = db.collection('subjects');
    const snapshot = await subjectsRef.get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allClass = snapshot.docs.map(doc => doc.data());
    
    setlistClass(allClass)
  }


  useEffect(() => {
    getSubjects();
  }, [])
  useEffect(() => {
    getSubjects();
    
  })
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Subjects</Text>
        <View style={{ flex: 1, borderWidth: 1 }}>
          <FlatList
            data={listSubjects}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.item,
                ]}>
                <Text style={styles.itemname}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.itemTouchableOpacicty}
                  onPress={() => navigation.dispatch(pushAction())}
                  >
                  <Image source={require('../assets/icon/edit.png')}
                    style={styles.itemTouchableOpacictyIcon} />

                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemTouchableOpacicty}
                  onPress={() => deleteClass(item.name)}
                >
                  <Image source={require('../assets/icon/bin.png')}
                    style={styles.itemTouchableOpacictyIcon} />

                </TouchableOpacity>
              </View>
            )}
          />
        </View>

      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddSubject1')}
        style={styles.touchableOpacityStyle}>
        <Image
          //We are making FAB using TouchableOpacity with an image
          //We are using online image here
          source={{
            uri:
              'https://freesvg.org/img/1430954247.png',
          }}
          //You can use you project image Example below
          //source={require('./images/float-add-icon.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ManageStudents

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
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',

  },
  itemname: {
    flexGrow: 1,
    fontSize: 24
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