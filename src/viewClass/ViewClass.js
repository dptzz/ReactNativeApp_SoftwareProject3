import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'
const pushAction = (className) => StackActions.push('EditClass1',
  { name: className })


const ViewClass = ({ navigation, route }) => {
  const [listClass, setlistClass] = useState([])
  const [thisStudents, setthisStudents] = useState([])
  const { subject } = route.params

  const getClasses = async () => {
    const db = firebase.firestore()
    const classref = db.collection('class');
    const snapshot = await classref.where('subjects','array-contains',subject).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allClass = snapshot.docs.map(doc => doc.data());
    setlistClass(allClass)
  }


  const deleteClass = async (className) => {
    const db = firebase.firestore()
    const classref = db.collection('class');
    let snapshot = await classref.where('name', '==', className).get()
    if (snapshot.empty) {
      return;
    }
    const thisClass = snapshot.docs.map(doc => doc.data());
    let thisStudents = thisClass[0].students
    //Remove Students References
    for (let i = 0; i < thisStudents.length; i++) {
      let studentId = db.collection('users').where('role', '==', 0).where('email', '==', thisStudents[i]).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            studentId = doc.id;
            db.collection('users').doc(studentId).update({
              class: "",
            });
          })
        })
    }
    //Remove Class
    let docID = db.collection('class').where('name', '==', className).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          docID = doc.id
          db.collection("class").doc(docID).delete().then(() => {
            console.log("Document successfully deleted!" + docID);
            alert("Class successfully deleted: " + className);
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        })
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
    //console.log(thisStudents)




  }
  useEffect(() => {
    getClasses();
  }, [])
  useEffect(() => {
    const db = firebase.firestore()
    const classRef = db.collection('class').where('subjects','array-contains',subject);
    const unsubscribe = classRef.onSnapshot((snapshot) => {
      setlistClass(snapshot.docs.map(doc => doc.data()));
    })
    return () => {
      unsubscribe();
    }
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: 'white'}}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{margin: 5, fontSize: 30, fontWeight: 'bold',color: 'black'}}>Classes</Text>
        <View style={{ flex: 1}}>
          <FlatList
            data={listClass}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.item,
                ]}>
                <Text style={styles.itemname}>{item.name}</Text>
              </View>
            )}
          />
        </View>

      </View>
      
    </View>

  )
}

export default ViewClass

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
    borderRadius: 50,
    shadowColor: '#000000',
    shadowRadius: 10,
    elevation: 5,
    
    backgroundColor: 'white'
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    
    //backgroundColor:'black'
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white'
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