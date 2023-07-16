import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../FirebaseConfig'

const Welcome = ({navigation}) => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
      <View style={styles.container}>

        <Image source={require('../assets/icon/bookIcon.png')} style={{height: 200, width: 200}}></Image>

        <Text style={{marginTop: 40,color: 'black', fontSize: 30, fontWeight: '900' }}>Hey! Welcome</Text>

        <Text style={{textAlign: 'center', marginTop: 20, marginBottom: 20,fontSize: 20}}>We are here with the test for you.</Text>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Registration')}
        style={styles.getStarted}
        >
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', padding: 12}}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={[styles.getStarted,{backgroundColor: 'rgb(245,245,245)'}]}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', padding: 12}}>I already have an account</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    getStarted: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgb(255,220,0)',
        borderRadius: 10,
        marginBottom: 20
    }
})