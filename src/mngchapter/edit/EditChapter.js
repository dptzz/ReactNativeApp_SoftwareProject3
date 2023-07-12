import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import { firebase } from '../../../FirebaseConfig'

const EditChapter = ({ navigation, route }) => {
    const [chapterName, setChapterName] = useState('')
    const [selecetedOptions, setSelecetOptions] = useState()
    const [listSubject, setListSubject] = useState([])

    const [isChapterExists, setIsChapterExists] = useState()
    const [csubject, csetSubject] = useState('')
    const { name, subject } = route.params
    // Go Back to manage screen
    const popAction = StackActions.pop(1);
    //Handle selection
    const handleOptionSelect = (index, name) => {
        setSelecetOptions(index)
        csetSubject(name)
    }
    //Handle Submit button
    const handleSubmit = (name, subject, cname) => {
        const db = firebase.firestore()
        let docId = db.collection('chapters').where('subject', '==', subject).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    
                    if (doc.data().name === cname) {
                        console.log(doc.data().name)
                        docId = doc.id;
                        db.collection('chapters').doc(docId).set({
                            name: name,
                            subject: subject,
                        })
                            .catch((error) => { console.log(error.message) })
                    }

                })
            })
            .catch((err) => { console.log(err.message) })
        console.log('done')
    }
    // Get subject list
    const getSubject = async () => {
        const db = firebase.firestore()
        const subjectRef = db.collection('subjects');
        const snapshot = await subjectRef.get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const allSubject = snapshot.docs.map(doc => doc.data());
        setListSubject(allSubject)
        setChapterName(name)
        setSelecetOptions(listSubject.findIndex(obj => {
            return obj.subject === subject
        }))

    }
    // Check Exists
    const checkNameExists = async (chapterName, subjectName) => {
        const db = firebase.firestore()
        const questionsRef = db.collection('chapters');
        const snapshot = await questionsRef.where('subject', '==', subjectName).get()
        const allSubject = snapshot.docs.map(doc => doc.data());
        //console.log(allSubject)
        setIsChapterExists(!allSubject.some(chapter => {
            if (chapter.name === chapterName) {
                return true
            }
            return false
        }))
        //console.log(isChapterExists)
    }

    useEffect(() => {
        getSubject();

    }, [])

    useEffect(() => {
        checkNameExists(chapterName, subject);

    })
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chapter title</Text>
                <TextInput
                    placeholder='Chapter Name'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24 }}
                    onChangeText={setChapterName}
                    value={chapterName}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Subjects</Text>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    <FlatList

                        data={listSubject}
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.item,
                                    subject === item.name && styles.selectedOptions
                                ]}>
                                <TouchableOpacity
                                    disabled={true}
                                    onPress={() => handleOptionSelect(index, item.name)}
                                >
                                    <Text style={styles.itemname}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>

            </View>
            <View>
                <TouchableOpacity
                    disabled={
                        !chapterName || !subject
                    }
                    style={[
                        styles.nextbutton,
                        (!chapterName || !subject) && styles.nextbuttonDisabled
                    ]}
                    onPress={() => {
                        checkNameExists(chapterName, subject);
                        if (isChapterExists || chapterName === name) {
                            handleSubmit(chapterName, subject, name)
                            navigation.dispatch(popAction)
                            alert('Chapter ' + name + ' of ' + subject + ' has been updated to '+chapterName+' of '+subject);
                        } else {

                            alert(`There is already a chapter named ${chapterName} in ${subject}`)

                        }
                    }}
                >
                    <Text style={styles.nextbuttontext}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}


export default EditChapter

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
        fontSize: 24
    },
    nextbuttonDisabled: {
        padding: 10,
        borderWidth: 0,
        backgroundColor: 'red',
        alignItems: 'center',

    }

})