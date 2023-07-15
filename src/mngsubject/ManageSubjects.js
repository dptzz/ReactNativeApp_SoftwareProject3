import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'
const pushAction = (subjectName) => StackActions.push('EditSubject',
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
  const deleteSubject = (subjectName) => {
    const db = firebase.firestore()
    let subjectID = db.collection('subjects').where('name', '==', subjectName).get()
      .then((snapshot) => {
        snapshot.forEach((doc) =>{
          subjectID = doc.id
          db.collection("subjects").doc(subjectID).delete().then(() => {
            console.log("Document successfully deleted!"+subjectID);
            alert("Subject successfully deleted: "+subjectName);
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        })
      }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
    let chapterID = db.collection('chapters').where('subject', '==', subjectName).get()
      .then((snapshot) => {
        snapshot.forEach((doc) =>{
          chapterID = doc.id
          db.collection("chapters").doc(chapterID).delete().then(() => {
            console.log("Document successfully deleted!"+chapterID);
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        })
      }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
    let questionID = db.collection('questions').where('subject', '==', subjectName).get()
      .then((snapshot) => {
        snapshot.forEach((doc) =>{
          questionID = doc.id
          db.collection("questions").doc(questionID).delete().then(() => {
            console.log("Document successfully deleted!"+questionID);
            
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
              <TouchableOpacity
                style={[
                  styles.item,
                ]}
                onPress={() =>navigation.navigate('ManageChapter', {subject: item.name}) }
                >
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
                  onPress={() => deleteSubject(item.name)}
                >
                  <Image source={require('../../assets/icon/bin.png')}
                    style={styles.itemTouchableOpacictyIcon} />

                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>

      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddSubject')}
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