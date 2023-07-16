import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import { firebase } from '../../FirebaseConfig'



const SetRole = ({ navigation, route }) => {
  
  
  const [role, setRole] = useState(0)

  const { email } = route.params

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
  useEffect(() => {
    getThisUser();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      
      <ScrollView style={{ flex: 1, margin: 10 }}>
        {/* Title section */}
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>User Email</Text>
        <TextInput
          placeholder='Email'
          style={{ borderWidth: 1, padding: 10, fontSize: 24, marginBottom: 10 }}
          
          value={email}
          keyboardType="default"
          returnKeyType="done"
          
         
          
        />

        {/* Difficulty section */}
        <View style={{ flex: 1 }}>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Role</Text>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setRole(0)}>
                  <Image source={role !== 0 ? require('../../assets/icon/radio-button.png') : require('../../assets/icon/radio-button-checked.png')}
                    style={styles.radioTouchableOpacictyIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }}>Student</Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setRole(1)}>
                  <Image source={role !== 1 ? require('../../assets/icon/radio-button.png') : require('../../assets/icon/radio-button-checked.png')}
                    style={styles.radioTouchableOpacictyIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }}>Teacher</Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setRole(2)}>
                  <Image source={role !== 2 ? require('../../assets/icon/radio-button.png') : require('../../assets/icon/radio-button-checked.png')}
                    style={styles.radioTouchableOpacictyIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }}>Admin</Text>
              </View>

            </View>
          </View>
        </View>


      </ScrollView>
      <View>
        <TouchableOpacity
          
          style={[
            styles.nextbutton,
            
          ]}
          onPress={() => {
            handleSubmit(role);
            navigation.dispatch(popAction)
            alert('User: ' + email +"'s role has been updated to: "+ role === 0 ? 'Student': role === 1 ? 'Teacher' : 'Admin')
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
  item: {
    padding: 10,
    borderBottomWidth: 1
  },
  itemname: {
    fontSize: 24,
  },
  answers: {
    borderWidth: 1, padding: 10, fontSize: 24,
    marginLeft: 10,
    flexGrow: 1
  },
  radioTouchableOpacicty: {
    flexShrink: 0,
    alignContent: 'flex-start',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 10,
    borderWidth: 0,
    backgroundColor: 'lightgreen',
    alignItems: 'center',

  },
  nextbuttontext: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24
  },
  nextbuttonDisabled: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: 'red',
    alignItems: 'center',

  }

})