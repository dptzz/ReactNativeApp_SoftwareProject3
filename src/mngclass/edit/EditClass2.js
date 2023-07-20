import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../../FirebaseConfig'



const EditClass2 = ({ navigation, route }) => {
  const [selecetedOptions, setSelecetOptions] = useState([])
  const [listStudent, setlistStudent] = useState([])
  const [selectedStudents, setselectedStudents] = useState([])
  const { cclassName, uclassName, teacherName } = route.params

  const handleMultiSelect = (email) => {
    if (selecetedOptions.findIndex() === email) {
      setSelecetOptions(selecetedOptions.pop(email))



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
    const snapshot = await questionsRef.where('class','in' ,['',cclassName]).where('role', '==', 0).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allStudent = snapshot.docs.map(doc => doc.data());
    setlistStudent(allStudent)
  }
  const getClass = async () => {
    const db = firebase.firestore()
    const questionsRef = db.collection('class');
    const snapshot = await questionsRef.where('name', '==', cclassName).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const thisStudents = snapshot.docs.map(doc => doc.data());

    setselectedStudents(thisStudents[0].students);

  }


  
  useEffect(() => {
    // getStudents();
    // console.log(selectedStudents)
    getClass();
    getStudents();


  }, [])
  useEffect(() => {
    setSelecetOptions(selectedStudents);
  }, [selectedStudents.length]); //
  useEffect(() => {

    //
    // console.log(selectedStudents);
    //console.log(selecetedOptions);

    // console.log(Object.values(listStudent)) //10
    // console.log(selectedStudents) //2
  })
  return (
    <View style={{ flex: 1,backgroundColor: 'white' }}>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{margin: 5, color: 'black', fontSize: 25, fontWeight: 'bold' }}>Students</Text>
        <View style={{ flex: 1}}>
          <FlatList

            data={listStudent}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.item,
                  selecetedOptions.includes(item.email) && styles.selectedOptions
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (selecetedOptions.includes(item.email)) {
                      setSelecetOptions(selecetedOptions.filter(value => value !== item.email))
                    } else {
                      setSelecetOptions([...new Set([...selecetedOptions, item.email])])
                    }
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
            !(selecetedOptions.length > 0) && styles.nextbuttonDisabled
          ]}
          disabled={!(selecetedOptions.length > 0)}
          onPress={() => {

            navigation.navigate('EditClass3', { cclassName: `${cclassName}`, uclassName: `${uclassName}`, teacherName: `${teacherName}`, students: selecetedOptions })
            // console.log(selecetedOptions);
          }}
        >
          <Text style={styles.nextbuttontext}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default EditClass2

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
    fontSize: 24,
  },
  nextbuttonDisabled: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: 'red',
    alignItems: 'center',

  }

})