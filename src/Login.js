import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../FirebaseConfig'


const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    }
    catch (error) {
      alert(error.message)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>

          <Text style={{ marginTop: 40, marginBottom: 40, color: 'black', fontSize: 30, fontWeight: '900' }}>Login your account</Text>

          <TextInput
            style={styles.textInput}
            placeholder='Email Address'
            onChangeText={(email) => setEmail(email)}
            autoCapitalize='none'
            autoCorrect={false}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(password) => setPassword(password)}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.getStarted}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', padding: 12 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Registration')}
            style={[styles.getStarted, { backgroundColor: 'white' }]}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', padding: 12 }}>Not have an account?</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default Login

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