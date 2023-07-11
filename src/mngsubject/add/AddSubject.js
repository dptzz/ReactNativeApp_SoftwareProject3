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
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 10 }}>
                {/* <Text>{className},{teacher}</Text> */}
                <TextInput
                    placeholder='Subject Name'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24, marginBottom: 10 }}
                    onChangeText={setSubjectName}
                />
                <TextInput
                    placeholder='Subject Code'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24, marginBottom: 10 }}
                    onChangeText={setSubjectCode}
                />
            </View>
            <View>
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