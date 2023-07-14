import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../../FirebaseConfig'
import { BottomSheetSlideOutSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs'


const AddClass2 = ({ navigation, route }) => {
    const [selecetedOptions, setSelecetOptions] = useState({})
    const [listStudent, setlistStudent] = useState([])
    const [selectedStudents, setselectedStudents] = useState([])

    const { className, teacherName } = route.params

    const handleMultiSelect = (index, email) => {
        if (selecetedOptions[index] === email) {
            setSelecetOptions({
                ...selecetedOptions,
                ...delete selecetedOptions[index]
            })



        }
        else {
            setSelecetOptions({
                ...selecetedOptions,
                [index]: email,
            })
        }
    }

    const getStudents = async () => {
        const db = firebase.firestore()
        const questionsRef = db.collection('users');
        const snapshot = await questionsRef.where('role', '==', 0).get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const allStudent = snapshot.docs.map(doc => doc.data());
        setlistStudent(allStudent)
    }
    useEffect(() => {
        getStudents();
        console.log(selectedStudents)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 10 }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Students</Text>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    <FlatList
                        data={listStudent}
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.item,
                                    selecetedOptions[index] === item.email && styles.selectedOptions
                                ]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleMultiSelect(index, item.email)
                                    }}
                                >
                                    <Text style={styles.itemname}>{item.firstName} {item.lastName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>

            </View>
            <View>
                <TouchableOpacity 
                style={[
                    styles.nextbutton,
                    !(Object.keys(selecetedOptions).length > 0) && styles.nextbuttonDisabled
                ]}
                    disabled={!(Object.keys(selecetedOptions).length > 0)}
                    onPress={() => {
                        navigation.navigate('AddClass3', { className: `${className}`, teacherName: `${teacherName}`, students: Object.values(selecetedOptions) })
                        
                    }}
                >
                    <Text style={styles.nextbuttontext}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default AddClass2

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