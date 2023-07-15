import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'


const AddClass3 = ({ navigation, route }) => {
    const [selecetedOptions, setSelecetOptions] = useState({})
    const [listSubject, setlistSubject] = useState([])
    const [selectedStudents, setselectedStudents] = useState([])

    const { className, teacherName, students } = route.params

    const popAction = StackActions.pop(3);
      

    const handleMultiSelect = (index, name) => {
        if (selecetedOptions[index] === name) {
            setSelecetOptions({
                ...selecetedOptions,
                ...delete selecetedOptions[index]
            })



        }
        else {
            setSelecetOptions({
                ...selecetedOptions,
                [index]: name,
            })
        }
    }

    const handleSubmit = async (name, students, subjects, teacher) => {
        

        await firebase.firestore().collection('class')
            .doc()
            .set({
                name,
                students,
                subjects,
                teacher,
            })
            .catch((err) => {alert(err.message)})
        const db = firebase.firestore()
        const studentRef = db.collection('users')
        
        for (let i = 0; i < students.length; i++) {
            let docID = studentRef.where('email', '==', students[i]).get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        docID = doc.id
                        db.collection('users').doc(docID).update({
                            
                            class: name,
                        })
                    })
                })
        }
         
        console.log('done')
    }

    const getSubjects = async () => {
        const db = firebase.firestore()
        const subjectsRef = db.collection('subjects');
        const snapshot = await subjectsRef.get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const allSubject = snapshot.docs.map(doc => doc.data());
        setlistSubject(allSubject)
    }
    useEffect(() => {
        getSubjects();
        console.log(className, teacherName, students)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 10 }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Subjects</Text>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    <FlatList
                        data={listSubject}
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.item,
                                    selecetedOptions[index] === item.name && styles.selectedOptions
                                ]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleMultiSelect(index, item.name)
                                    }}
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
                    disabled={!(Object.keys(selecetedOptions).length > 0)}
                style={[
                    styles.nextbutton,
                    !(Object.keys(selecetedOptions).length > 0) && styles.nextbuttonDisabled
                ]
                }
                onPress={() => {
                    handleSubmit(className, students, Object.values(selecetedOptions), teacherName)
                    navigation.dispatch(popAction)
                    alert('Class ' + className+' has been added to database')
                }
                }
                >
                    <Text style={styles.nextbuttontext}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default AddClass3

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1
    },
    itemname:{
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