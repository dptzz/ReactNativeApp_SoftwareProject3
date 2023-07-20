import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'

import { firebase } from '../../../FirebaseConfig'

const EditTeacher = ({ navigation, route }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [selecetedOptions, setSelecetOptions] = useState()
    const [sclass, setSClass] = useState('')
    const [cClass, setCClass] = useState('')
    const [listClass, setListClass] = useState([])


    const { email } = route.params

    // Go Back to manage screen
    const popAction = StackActions.pop(1);
    
    const handleOptionSelect = (index, name) => {
        setSelecetOptions(index)
        setSClass(name)
    }

    const handleSubmit = (firstName, lastName) => {
        const db = firebase.firestore()
        const studentRef = db.collection('users')
        let docID = studentRef.where('email', '==', email).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    docID = doc.id
                    db.collection('users').doc(docID).update({
                        firstName: firstName,
                        lastName: lastName,
                    }).catch((error) => { console.log(error.message) })
                });

            }).catch((err) => { console.log(err.message) })
        console.log('done')

    }

    const getClass = async () => {
        const db = firebase.firestore()
        const classRef = db.collection('class');
        const snapshot = await classRef.get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const allClass = snapshot.docs.map(doc => doc.data());
        setListClass(allClass)
    }
    const getThisStudent = async () => {
        const db = firebase.firestore()
        const studentRef = db.collection('users');
        const snapshot = await studentRef.where('email', '==', email).get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const thisStudent = snapshot.docs.map(doc => doc.data());
        setFirstName(thisStudent[0].firstName)
        setLastName(thisStudent[0].lastName)
        setSClass(thisStudent[0].class)
        //setCClass(thisStudent[0].class)
        //console.log(firstName + ' ' + lastName + ' ', sclass)
    }
    const checkNameExists = async (className) => {
        const db = firebase.firestore()
        const questionsRef = db.collection('class');
        const snapshot = await questionsRef.where('name', '==', className).get();
        if (snapshot.empty) {
            setIsClassExists(true);
            return;
        }
        setIsClassExists(false)


    }
    useEffect(() => {
        getClass();
        getThisStudent();
    }, [])

    useEffect(() => {
        //checkNameExists(className);


    })
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                {/* <Text>{className},{teacher}</Text> */}
                <Text style={styles.text}>First Name</Text>
                <TextInput
                    placeholder='First name'
                    style={styles.textInput}
                    onChangeText={setFirstName}
                    value={firstName}
                />
                <Text style={styles.text}>Last Name</Text>
                <TextInput
                    placeholder='Last name'
                    style={styles.textInput}
                    onChangeText={setLastName}
                    value={lastName}
                />
                
                
                {/* <View style={{ flex: 1, borderWidth: 1 }}>
                    <FlatList
                        data={listClass}
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.item,
                                    sclass === item.name && styles.selectedOptions
                                ]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (sclass === item.name) {
                                            handleOptionSelect(null, "")
                                        }
                                        else {
                                            handleOptionSelect(index, item.name)
                                        }
                                    }}
                                >
                                    <Text style={styles.itemname}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View> */}

            </View>
            <View style={{flex: 1,justifyContent: 'flex-end'}}>
                <TouchableOpacity
                    disabled={
                        !firstName || !lastName
                    }
                    style={[
                        styles.nextbutton,
                        (!firstName || !lastName) && styles.nextbuttonDisabled
                    ]}
                    onPress={() => {
                        handleSubmit(firstName, lastName)
                        alert('User: '+email+' has been updated successfully!');
                        navigation.dispatch(popAction)
                    }}
                >
                    <Text style={styles.nextbuttontext}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}


export default EditTeacher

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput: {
        borderWidth: 1,
        marginTop: 5,
        flexGrow: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    view1: {
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 10,
        paddingVertical: 30,
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 5
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
        fontSize: 24,
    },
    nextbuttonDisabled: {
        padding: 10,
        borderWidth: 0,
        alignItems: 'center',
        backgroundColor: 'rgb(255,51,51)'
    }

})