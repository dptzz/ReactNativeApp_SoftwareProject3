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

        let chapterID = db.collection('chapters').where('subject', '==', name).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    chapterID = doc.id;
                    db.collection('chapters').doc(chapterID).update({
                        subject: subjectName,
                    })
                        .catch((error) => { console.log(error.message) })
                })
            })
            .catch((err) => { console.log(err.message) })

        let questionID = db.collection('questions').where('subject', '==', name).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    questionID = doc.id;
                    db.collection('questions').doc(questionID).update({
                        subject: subjectName,
                    })
                        .catch((error) => { console.log(error.message) })
                })
            })
            .catch((err) => { console.log(err.message) })
        let classID = db.collection('class').where('subjects', 'array-contains', name).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    classID = doc.id;
                    db.collection('class').doc(classID).update({
                        subjects: firebase.firestore.FieldValue.arrayUnion(subjectName)
                    })
                        .catch((error) => { console.log(error.message) })
                    db.collection('class').doc(classID).update({
                        subjects: firebase.firestore.FieldValue.arrayRemove(name)
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
        <View style={styles.container}>
            <View style={styles.view1}>
                {/* <Text>{className},{teacher}</Text> */}
                <Text style={styles.text}>Subject Name</Text>
                <TextInput
                    placeholder='Subject Name'
                    style={styles.textInput}
                    onChangeText={setSubjectName}
                    value={subjectName}
                />
                <Text style={styles.text}>Subject Code</Text>
                <TextInput
                    placeholder='Subject Code'
                    style={styles.textInput}
                    onChangeText={setSubjectCode}
                    value={subjectCode}
                />

            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
                            if ((!isClassExists && csubjectName !== subjectName) && (!isCodeExists && csubjectCode !== subjectCode)) {
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
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        shadowColor: '#000000',
        shadowRadius: 5,
        elevation: 5,
    },
    nextbutton: {
        backgroundColor: 'rgb(0,255,153)',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 5,
        elevation: 5,
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