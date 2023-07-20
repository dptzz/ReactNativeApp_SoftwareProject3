import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import { firebase } from '../../FirebaseConfig'



const SetRole = ({ navigation, route }) => {


  const [role, setRole] = useState(0)
  const [subjects, setSubjects] = useState()
  const [selectSubject, setSelectSubject] = useState()
  const [selecetedOptions, setSelecetOptions] = useState(0)
  const { email } = route.params

  const handleOptionSelect = (index, name) => {
    setSelecetOptions(index)
    setSelectSubject(name)
  }


  // Go Back to manage screen
  const popAction = StackActions.pop(1);

  //Handle Submit button
  const handleSubmit = (questionTitle, subject, chapter, option1, option2, option3, option4, correctOption, difficulty) => {
    const db = firebase.firestore()
    const questionRef = db.collection('users')
    let docId = questionRef.where('email', '==', email).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          docId = doc.id;
          db.collection('users').doc(docId).update({
            role: role,
          })
            .catch((error) => { console.log(error.message) })
          if (role === 1) {
            db.collection('users').doc(docId).update({
              subject: selectSubject,
            })
          }
        })
      })
      .catch((err) => { console.log(err.message) })
    console.log('done')
  }
  //Get Detail question
  const getThisUser = async () => {
    const db = firebase.firestore()
    const userRef = db.collection('users');
    const snapshot = await userRef.where('email', '==', email).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const thisUser = snapshot.docs.map(doc => doc.data());

    setRole(thisUser[0].role)

  }
  const getSubject = async () => {
    const db = firebase.firestore()
    const subjectRef = db.collection('subjects');
    const snapshot = await subjectRef.get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const subjectsList = snapshot.docs.map(doc => doc.data());

    setSubjects(subjectsList);

  }
  useEffect(() => {
    getThisUser();
    getSubject();
  }, [])

  return (
    <View style={styles.container}>

      <View style={{flex:1}}>
        {/* Title section */}
        <View style={[styles.view1,{}]}>
          <Text style={styles.text}>User Email</Text>
          <TextInput
            placeholder='Email'
            style={styles.textInput}

            value={email}
            keyboardType="default"
            returnKeyType="done"



          />
        </View>
        {/* Difficulty section */}
        <View style={styles.view2}>

          <Text style={[styles.text, { marginBottom: 10 }]}>Role</Text>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setRole(0)}>
                  <Image source={role !== 0 ? require('../../assets/icon/radio-button.png') : require('../../assets/icon/radio-button-checked.png')}
                    style={styles.radioTouchableOpacictyIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 15 }}>Student</Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setRole(1)}>
                  <Image source={role !== 1 ? require('../../assets/icon/radio-button.png') : require('../../assets/icon/radio-button-checked.png')}
                    style={styles.radioTouchableOpacictyIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 15 }}>Teacher</Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setRole(2)}>
                  <Image source={role !== 2 ? require('../../assets/icon/radio-button.png') : require('../../assets/icon/radio-button-checked.png')}
                    style={styles.radioTouchableOpacictyIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 15 }}>Admin</Text>
              </View>

            </View>
          </View>
        </View>

        {role === 1 && (
          <View style={[styles.view2, {flex:1}]}>

            <Text style={[styles.text, { marginBottom: 10 }]}>Subjects</Text>
            <View style={{flex:1}}>
              <FlatList

                data={subjects}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.item,
                      selecetedOptions === index && styles.selectedOptions
                    ]}>
                    <TouchableOpacity

                      onPress={() => handleOptionSelect(index, item.name)}
                    >
                      <Text style={styles.itemname}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        )}

      </View>
      <View>
        <TouchableOpacity

          style={[
            styles.nextbutton,

          ]}
          onPress={() => {
            handleSubmit(role);
            navigation.dispatch(popAction)
            alert('User: ' + email + "'s role has been updated to: " + role === 0 ? 'Student' : role === 1 ? 'Teacher' : 'Admin')
          }}
        >
          <Text style={styles.nextbuttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}


export default SetRole

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white'
  },
  itemname:{
    fontSize: 24,
    color: 'black'
  },
  selectedOptions: {
    backgroundColor: '#949494',
  },
  textInput: {
    borderWidth: 1,
    marginTop: 5,
    flexGrow: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  view1: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    paddingTop: 30,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 5
  },
  view2: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 5
  },
  radioTouchableOpacicty: {
    flexShrink: 0,
    alignContent: 'flex-start',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  radioTouchableOpacictyIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  selectedOptions: {
    backgroundColor: '#949494',
  },
  nextbutton: {
    backgroundColor: 'rgb(0,255,153)',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 5
  },
  nextbuttontext: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24
  },
  nextbuttonDisabled: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: 'rgb(255,51,51)',
    alignItems: 'center',
  }

})