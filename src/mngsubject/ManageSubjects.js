import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'
const pushAction = (subjectName) => StackActions.push('EditClass1',
 {name: subjectName})
 

const ManageSubject = ({ navigation }) => {
  const [listSubjects, setListSubjects] = useState([])


  // Get Subjects from firebase
  const getSubjects = async () => {
    const db = firebase.firestore()
    const subjectsRef = db.collection('subjects');
    const snapshot = await subjectsRef.get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allSubject = snapshot.docs.map(doc => doc.data());
    
    setListSubjects(allSubject)
  }

  // Delete Subjects
  const deleteClass = (subjectName) => {
    const db = firebase.firestore()
    let docID = db.collection('subjects').where('name', '==', subjectName).get()
      .then((snapshot) => {
        snapshot.forEach((doc) =>{
          docID = doc.id
          db.collection("subjects").doc(docID).delete().then(() => {
            console.log("Document successfully deleted!"+docID);
            alert("Subject successfully deleted: "+subjectName);
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        })
      }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
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
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.item,
                ]}>
                <Text style={styles.itemname}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.itemTouchableOpacicty}
                  onPress={() => navigation.dispatch(pushAction(item.name))}
                  >
                  <Image source={require('../../assets/icon/edit.png')}
                    style={styles.itemTouchableOpacictyIcon} />

                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemTouchableOpacicty}
                  onPress={() => deleteClass(item.name)}
                >
                  <Image source={require('../../assets/icon/bin.png')}
                    style={styles.itemTouchableOpacictyIcon} />

                </TouchableOpacity>
              </View>
            )}
          />
        </View>

      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddClass1')}
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

export default ManageSubject

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