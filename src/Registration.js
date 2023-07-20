import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { firebase } from '../FirebaseConfig'


const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://rn-app-cb4cb.firebaseapp.com',
        })
          .then(() => {
            alert('Verification email sent successfully')
          }).catch((error) => {
            alert(error.message)
          })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                class: "",
                role: 0,
              })
              .catch((error) => {
                alert(error.message)
              })
          })
          .catch((error) => {
            alert(error.message)
          })
      })
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>

          <Text style={{ marginTop: 40, marginBottom: 40, color: 'black', fontSize: 30, fontWeight: '900' }}>Create your account</Text>

          <TextInput
            style={styles.textInput}
            placeholder='Email Address'
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType="email-address">

          </TextInput>

          <TextInput
            style={styles.textInput}
            placeholder='First Name'
            onChangeText={(firstname) => setFirstName(firstname)}
            autoCorrect={false}>
          </TextInput>

          <TextInput
            style={styles.textInput}
            placeholder='Last Name'
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}>

          </TextInput>

          <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(password) => setPassword(password)}
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry={true}>

          </TextInput>

          <TouchableOpacity
            onPress={() => registerUser(email, password, firstName, lastName)}
            style={styles.getStarted}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', padding: 12 }}>
              Create
            </Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  getStarted: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgb(255,220,0)',
    borderRadius: 10,
    marginTop: 20
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginTop: 20,
  }
})