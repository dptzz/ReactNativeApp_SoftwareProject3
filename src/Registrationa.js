import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../FirebaseConfig'


const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    //Role 0 = HocSinh, 1 = GV , 2 = Admin
    const [role, setRole] = useState(0);
    const [selectedRole, setSelectedRole] = useState(0);

    registerUser = async (email, password, firstName, lastName, role) => {
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
                                role,
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
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 23 }}>
                Create Account
            </Text>
            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.textInput}
                    placeholder='First Name'
                    onChangeText={(firstname) => setFirstName(firstname)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Last Name'
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='password'
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <View>
                    <TouchableOpacity></TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName, role)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold',fontSize:22}}>Register</Text>
                
            </TouchableOpacity>
        </View>
    )
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    textInput: {
        paddingTop: 20,
        padding: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
})