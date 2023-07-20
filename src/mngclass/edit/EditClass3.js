import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'


const EditClass3 = ({ navigation, route }) => {
  const [selecetedOptions, setSelecetOptions] = useState([])
  const [listSubject, setlistSubject] = useState([])
  const [selectedSubjects, setselectedSubjects] = useState([])
  const [thisStudents, setThisStudents] = useState([])
  const { uclassName, cclassName, teacherName, students } = route.params
  const [classID, setClassID] = useState()
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

  const getThisClass = async () => {
    const db = firebase.firestore()
    const classRef = db.collection('class')
    const getClass = await classRef.where('name', '==', cclassName).get()
    if (getClass.empty) {
      console.log('No matching documents...');
      return;
    }
    const thisClass = getClass.docs.map(doc => doc.data());
    setThisStudents(thisClass[0].students)
  }

  const handleSubmit = (name, nstudents, subjects, teacher) => {
    const db = firebase.firestore()
    let docId = db.collection('class').where('name', '==', cclassName).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          docId = doc.id;
          db.collection('class').doc(docId).set({
            name: name,
            students: nstudents,
            subjects: subjects,
            teacher: teacher,
          })
            .catch((error) => { console.log(error.message) })
        })
      })
      .catch((err) => { console.log(err.message) })

    // for (let i = 0; i < nstudents.length; i++) {
    //   
    // }
    // UPDATE STUDENT CLASS: CLASS_NAME
    const studentRef = db.collection('users')
    let add = []

    for (let i = 0; i < nstudents.length; i++) {
      if (!thisStudents.includes(nstudents[i])) {
        add.push(nstudents[i])
      }
    }

    for (let i = 0; i < add.length; i++) {
      let docID = studentRef.where('email', '==', add[i]).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            docID = doc.id
            db.collection('users').doc(docID).update({

              class: name,
            })
          })
        })
    }

    let remove = []

    for (let i = 0; i < thisStudents.length; i++) {
      if (!nstudents.includes(thisStudents[i])) {
        remove.push(thisStudents[i])
      }
    }
   
    for (let i = 0; i < remove.length; i++) {
      let docID = studentRef.where('email', '==', remove[i]).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            docID = doc.id
            db.collection('users').doc(docID).update({

              class: "",
            })
          })
        })
    }
    console.log('ADD: '+add)
    console.log('Remove: '+remove)

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
    getThisClass()
  }, [])
  useEffect(() => {
    setSelecetOptions(selectedSubjects);
    console.log(uclassName, cclassName, teacherName, students, selectedSubjects, classID)
  }, [selectedSubjects.length]);
  return (
    <View style={{ flex: 1,backgroundColor: 'white' }}>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{margin: 5, color: 'black', fontSize: 25, fontWeight: 'bold' }}>Subjects</Text>
        <View style={{ flex: 1}}>
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
    margin: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white'
  },
  itemname: {
    fontSize: 24
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