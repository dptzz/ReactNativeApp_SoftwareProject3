import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import data from '../data.json'
import { firebase } from '../FirebaseConfig'

const EditClass1 = ({ navigation, route }) => {
  const [className, setClassName] = useState('')
  const [selecetedOptions, setSelecetOptions] = useState()
  const [teacher, setTeacher] = useState('')
  const [listTeacher, setListTeacher] = useState([])
  const [listClass, setlistClass] = useState([])

  const [isClassExists, setIsClassExists] = useState()
  const { name } = route.params

  const handleOptionSelect = (index, name) => {
    setSelecetOptions(index)
    setTeacher(name)
  }


  const getTeacher = async () => {
    const db = firebase.firestore()
    const questionsRef = db.collection('users');
    const snapshot = await questionsRef.where('role', '==', 1).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const allteacher = snapshot.docs.map(doc => doc.data());
    setListTeacher(allteacher)
  }
  const getClass = async () => {
    const db = firebase.firestore()
    const questionsRef = db.collection('class');
    const snapshot = await questionsRef.where('name', '==', name).get();
    if (snapshot.empty) {
      console.log('No matching documents...');
      return;
    }
    const thisClass = snapshot.docs.map(doc => doc.data());
    setClassName(thisClass[0].name)
    setTeacher(thisClass[0].teacher)
    setSelecetOptions(listTeacher.findIndex(obj => {
      return obj.email === thisClass[0].teacher
    }))
    
    // listTeacher.forEach(teacher => {
      
    //   if(teacher.email === thisClass[0].teacher) {
    //     //setSelecetOptions(teacher)
    //     console.log(listTeacher)
    //     console.log(thisClass[0].teacher)
    //     
    //   }
    // });
  }
  const checkNameExists = async (className) => {
    const db = firebase.firestore()
    const questionsRef = db.collection('class');
    const snapshot = await questionsRef.where('name', '==', className).get();
    if (snapshot.empty) {
      setIsClassExists(true);
      return;
    }
    setIsClassExists(false)
    
    
  }
  useEffect(() => {
    getTeacher();
    getClass();
    
  }, [])

  useEffect(() => {
    //checkNameExists(className);
    
    
  })
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, margin: 10 }}>
        {/* <Text>{className},{teacher}</Text> */}
        <TextInput
          placeholder='Class Name'
          style={{ borderWidth: 1, padding: 10, fontSize: 24}}
          onChangeText={setClassName}
          value={className}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Teacher</Text>
        <View style={{ flex: 1, borderWidth: 1 }}>
          <FlatList
            data={listTeacher}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.item,
                  teacher === item.email && styles.selectedOptions
                ]}>
                <TouchableOpacity
                  onPress={() => handleOptionSelect(index, item.email)}
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
          disabled={
            !className || !teacher
          }
          style={[
            styles.nextbutton,
            (!className || !teacher) && styles.nextbuttonDisabled
          ]}
          onPress={() => {
            // checkNameExists(className);
            // if(isClassExists) {
              navigation.navigate('EditClass2', { cclassName: `${name}`,uclassName: `${className}`, teacherName: `${teacher}` })
            // }else {
            //   alert(`There is already a class named ${className}`)
            // }
            
          }}
        >
          <Text style={styles.nextbuttontext}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}


export default EditClass1

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
    fontSize: 24,
  },
  nextbuttonDisabled: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: 'red',
    alignItems: 'center',

  }

})