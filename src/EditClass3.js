import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../FirebaseConfig'
import { StackActions } from '@react-navigation/native'


const EditClass3 = ({ navigation, route }) => {
  const [selecetedOptions, setSelecetOptions] = useState([])
  const [listSubject, setlistSubject] = useState([])
  const [selectedSubjects, setselectedSubjects] = useState([])

  const { uclassName, cclassName, teacherName, students } = route.params
  const [ classID, setClassID] = useState()
  const popAction = StackActions.pop(3);


  // const handleMultiSelect = (index, name) => {
  //     if (selecetedOptions[index] === name) {
  //         setSelecetOptions({
  //             ...selecetedOptions,
  //             ...delete selecetedOptions[index]
  //         })



  //     }
  //     else {
  //         setSelecetOptions({
  //             ...selecetedOptions,
  //             [index]: name,
  //         })
  //     }
  // }
  const getSelectedSubject = async () => {
    const db = firebase.firestore()
    const questionsRef = db.collection('class');
    const snapshot = await questionsRef.where('name', '==', cclassName).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const thisSubject = snapshot.docs.map(doc => doc.data());
    //setClassID(thisSubject[0].id)
    setselectedSubjects(thisSubject[0].subjects);

  }

  const handleSubmit = (name, students, subjects, teacher) => {
    const db = firebase.firestore()
    let docId = db.collection('class').where('name', '==', cclassName).get()
      .then((snapshot) => {
        snapshot.forEach((doc) =>{
          docId = doc.id;
          db.collection('class').doc(docId).set({
            name: name,
            students: students,
            subjects: subjects,
            teacher: teacher,
          })
          .catch((error) => {console.log(error.message)})
        })
      })
      .catch((err) => { console.log(err.message) })
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
    getSelectedSubject()
    getSubjects();
    
  }, [])
  useEffect(() => {
    setSelecetOptions(selectedSubjects);
    console.log(uclassName, cclassName, teacherName, students, selectedSubjects, classID)
  }, [selectedSubjects.length]);
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
                  selecetedOptions.includes(item.name) && styles.selectedOptions
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (selecetedOptions.includes(item.name)) {
                      setSelecetOptions(selecetedOptions.filter(value => value !== item.name))
                    } else {
                      setSelecetOptions([...new Set([...selecetedOptions, item.name])])
                    }
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
          disabled={!(selecetedOptions.length > 0)}
          style={[
            styles.nextbutton,
            !(selecetedOptions.length > 0) && styles.nextbuttonDisabled
          ]
          }
          onPress={() => {
            handleSubmit(uclassName, students, selecetedOptions, teacherName, cclassName)
            navigation.dispatch(popAction)
            alert('Class has been updated to database')
          }
          }
        >
          <Text style={styles.nextbuttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default EditClass3

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1
  },
  itemname: {
    fontSize: 24
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