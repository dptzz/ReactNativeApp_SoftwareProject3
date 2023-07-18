import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'

const AddSubject = ({ navigation }) => {
    const [isClassExists, setIsClassExists] = useState()
    const [isCodeExists, setIsCodeExists] = useState()
    const [subjectName, setSubjectName] = useState('')
    const [subjectCode, setSubjectCode] = useState('')

    // Go Back to manage screen
    const popAction = StackActions.pop(1);
    // Handle submit: Add data to firebase
    const handleSubmit = async (name, code) => {
        await firebase.firestore().collection('subjects')
            .doc()
            .set({
                name,
                code,
            })
            .catch((err) => { alert(err.message) })
        console.log('done')
    }


    // Check if name is exists
    const checkNameExists = async (subjectName) => {
        const db = firebase.firestore()
        const questionsRef = db.collection('subjects');
        const snapshot = await questionsRef.where('name', '==', subjectName).get();
        if (snapshot.empty) {
            setIsClassExists(true);
            return;
        }
        setIsClassExists(false)
    }
    const checkCodeExists = async (subjectCode) => {
        const db = firebase.firestore()
        const questionsRef = db.collection('subjects');
        const snapshot = await questionsRef.where('code', '==', subjectCode).get();
        if (snapshot.empty) {
            setIsCodeExists(true);
            return;
        }
        setIsCodeExists(false)
    }



    useEffect(() => {
        checkNameExists(subjectName);
        checkCodeExists(subjectCode);
    })
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                {/* <Text>{className},{teacher}</Text> */}
                <Text style={styles.text}>Subject Name</Text>
                <TextInput
                    placeholder='Subject Name'
                    style={styles.textInput}
                    onChangeText={setSubjectName}
                />
                <Text style={styles.text}>Subject Code</Text>
                <TextInput
                    placeholder='Subject Code'
                    style={styles.textInput}
                    onChangeText={setSubjectCode}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    disabled={
                        !subjectName || !subjectCode
                    }
                    style={[
                        styles.nextbutton,
                        (!subjectName || !subjectCode) && styles.nextbuttonDisabled
                    ]}
                    onPress={() => {
                        checkNameExists(subjectName);
                        checkCodeExists(subjectCode);
                        if (isClassExists && isCodeExists) {
                            handleSubmit(subjectName, subjectCode)
                            navigation.dispatch(popAction)
                            alert('Subject ' + subjectName + ' has been added to database')
                        } else {
                            if (!isClassExists && !isCodeExists) {
                                alert(`There is already a subject named ${subjectName} and coded ${subjectCode}`)
                            } else {
                                if (!isClassExists) {
                                    alert(`There is already a subject named ${subjectName}`)
                                }
                                if (!isCodeExists) {
                                    alert(`There is already a subject coded ${subjectCode}`)
                                }
                            }
                        }
                    }}
                >
                    <Text style={styles.nextbuttontext}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddSubject

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
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
        paddingVertical: 30,
        padding: 10,
        borderRadius: 10,
    },
    nextbutton: {
        backgroundColor: 'rgb(0,255,153)',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10

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