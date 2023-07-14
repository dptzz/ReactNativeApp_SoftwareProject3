import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'

const EditSubject = ({ navigation, route }) => {
    const [isClassExists, setIsClassExists] = useState()
    const [isCodeExists, setIsCodeExists] = useState()
    const [subjectName, setSubjectName] = useState('')
    const [csubjectName, setcSubjectName] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [csubjectCode, setcSubjectCode] = useState('')
    
    const { name } = route.params
    // Go Back to manage screen
    const popAction = StackActions.pop(1);
    // Handle submit: Add data to firebase
    const handleSubmit = (subjectName, subjectCode) => {
        const db = firebase.firestore()
        let docId = db.collection('subjects').where('name', '==', name).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    docId = doc.id;
                    db.collection('subjects').doc(docId).set({
                        code: subjectCode,
                        name: subjectName,
                    })
                        .catch((error) => { console.log(error.message) })
                })
            })
            .catch((err) => { console.log(err.message) })
        console.log('done')
    }

    const getSubject = async () => {
        const db = firebase.firestore()
        const subjectRef = db.collection('subjects');
        const snapshot = await subjectRef.where('name', '==', name).get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const thisSubject = snapshot.docs.map(doc => doc.data());
        setSubjectName(thisSubject[0].name)
        setcSubjectName(thisSubject[0].name)
        setcSubjectCode(thisSubject[0].code)
        setSubjectCode(thisSubject[0].code)
    }
    //Check if SubjectCode is exist
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


    useEffect(() => {
        getSubject();

    }, [])
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
                    value={subjectName}
                />
                <TextInput
                    placeholder='Subject Code'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24, marginBottom: 10 }}
                    onChangeText={setSubjectCode}
                    value={subjectCode}
                />

            </View>
            <View>
                <TouchableOpacity
                    disabled={
                        !subjectName
                    }
                    style={[
                        styles.nextbutton,
                        (!subjectName) && styles.nextbuttonDisabled
                    ]}
                    onPress={() => {
                        checkNameExists(subjectName);
                        checkCodeExists(subjectCode);
                        if ((isClassExists || csubjectName === subjectName) && (isCodeExists || csubjectCode === subjectCode)) {
                            handleSubmit(subjectName, subjectCode)
                            navigation.dispatch(popAction)
                            alert('Subject ' + subjectName + ' has been updated to database')
                        } else {
                            if ((!isClassExists && csubjectName !== subjectName) && (!isCodeExists && csubjectCode !== subjectCode ) ) {
                                alert(`There is already a subject named ${subjectName} and coded ${subjectCode}`)
                            } else {
                                if (!isClassExists && csubjectName !== subjectName) {
                                    alert(`There is already a subject named ${subjectName}`)
                                }
                                if (!isCodeExists && csubjectCode !== subjectCode) {
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

export default EditSubject

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