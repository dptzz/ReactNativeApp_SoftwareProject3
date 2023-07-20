import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import { firebase } from '../../../FirebaseConfig'


const AddChapter = ({ navigation, route }) => {
    const [chapterName, setChapterName] = useState('')
    const [selecetedOptions, setSelecetOptions] = useState()
    const [listSubject, setListSubject] = useState([])

    const [isChapterExists, setIsChapterExists] = useState()
    const [csubject, csetSubject] = useState('')
    const { subject } = route.params
    // Go Back to manage screen
    const popAction = StackActions.pop(1);
    //Handle selection
    const handleOptionSelect = (index, name) => {
        setSelecetOptions(index)
        csetSubject(name)
    }
    //Handle Submit button
    const handleSubmit = async (name, subject) => {
        await firebase.firestore().collection('chapters')
            .doc()
            .set({
                name,
                subject,
            })
            .catch((err) => { alert(err.message) })
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
        console.log(subject)
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
        console.log(allSubject)
        setIsChapterExists(!allSubject.some(chapter => {
            if (chapter.name === chapterName) {
                return true
            }
            return false
        }))
        console.log(isChapterExists)
    }

    useEffect(() => {
        getSubject();


    }, [])

    useEffect(() => {
        checkNameExists(chapterName, subject);

    })
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, margin: 10 }}>
                <Text style={{ color: 'black', margin: 5, fontSize: 25, fontWeight: 'bold' }}>Chapter title</Text>
                <TextInput
                    placeholder='Chapter Name'
                    style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 24, borderRadius: 15 }}
                    onChangeText={setChapterName}
                />
                <Text style={{ color: 'black', margin: 5, fontSize: 25, fontWeight: 'bold' }}>Subjects</Text>
                <View style={{ flex: 1 }}>
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
                        if (isChapterExists) {
                            handleSubmit(chapterName, subject)
                            navigation.dispatch(popAction)
                            alert('Chapter ' + chapterName + ' of ' + subject + ' has been added to database')
                        } else {

                            alert(`There is already a chapter named ${chapterName} in ${subject}`)

                        }
                    }}
                >
                    <Text style={styles.nextbuttontext}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}


export default AddChapter

const styles = StyleSheet.create({
    item: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
    },
    itemname: {
        fontSize: 24,
        color: 'black'
    },
    selectedOptions: {
        backgroundColor: '#949494',
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