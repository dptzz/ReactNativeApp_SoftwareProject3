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
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 10 }}>
                {/* <Text>{className},{teacher}</Text> */}
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>First Name</Text>
                <TextInput
                    placeholder='First name'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24 }}
                    onChangeText={setFirstName}
                    value={firstName}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Last Name</Text>
                <TextInput
                    placeholder='Last name'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24 }}
                    onChangeText={setLastName}
                    value={lastName}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Class</Text>
                <Text
                    placeholder='Last name'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24, backgroundColor: '#BFBFBF' }}
                    onChangeText={setFirstName}
                // disabled= {true}

                >{sclass}</Text>
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
            <View>
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
    item: {
        padding: 10,
        borderBottomWidth: 1
    },
    itemname: {
        fontSize: 24,
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
        fontSize: 24,
    },
    nextbuttonDisabled: {
        padding: 10,
        borderWidth: 0,
        backgroundColor: 'red',
        alignItems: 'center',

    }

})