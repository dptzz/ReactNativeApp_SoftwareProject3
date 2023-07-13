import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import { firebase } from '../../../FirebaseConfig'



const AddQuestion = ({ navigation, route }) => {
    const [questionTitle, setQuestionTitle] = useState('')
    const [correctOption, setCorrectOption] = useState(1)
    const [difficulty, setDifficulty] = useState('easy')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [isChapterExists, setIsChapterExists] = useState()
    const [csubject, csetSubject] = useState('')
    const { subject, chapter } = route.params
    // Go Back to manage screen
    const popAction = StackActions.pop(1);

    //Handle Submit button
    const handleSubmit = async (question, subject, chapter, option1, option2, option3, option4, correctOption, difficulty) => {
        await firebase.firestore().collection('questions')
            .doc()
            .set({
                question, subject, chapter, option1, option2, option3, option4, correctOption, difficulty,
            })
            .catch((err) => { alert(err.message) })
        console.log('done')
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 10 }}>
                {/* Title section */}
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Question title</Text>
                <TextInput
                    placeholder='Question title'
                    style={{ borderWidth: 1, padding: 10, fontSize: 24, marginBottom: 10 }}
                    onChangeText={setQuestionTitle}
                />

                {/* Answers section */}
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Answers</Text>
                <View style={{ flexShrink: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setCorrectOption(1)}>


                            <Image source={1 !== correctOption ? require('../../../assets/icon/radio-button.png') : require('../../../assets/icon/radio-button-checked.png')}
                                style={[
                                    styles.radioTouchableOpacictyIcon

                                ]} />

                        </TouchableOpacity>
                        <TextInput
                            placeholder='Option 1'
                            style={styles.answers}
                            onChangeText={setOption1}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setCorrectOption(2)}>


                            <Image source={2 !== correctOption ? require('../../../assets/icon/radio-button.png') : require('../../../assets/icon/radio-button-checked.png')}
                                style={[
                                    styles.radioTouchableOpacictyIcon

                                ]} />

                        </TouchableOpacity>
                        <TextInput
                            placeholder='Option 2'
                            style={styles.answers}
                            onChangeText={setOption2}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setCorrectOption(3)}>


                            <Image source={3 !== correctOption ? require('../../../assets/icon/radio-button.png') : require('../../../assets/icon/radio-button-checked.png')}
                                style={[
                                    styles.radioTouchableOpacictyIcon

                                ]} />

                        </TouchableOpacity>
                        <TextInput
                            placeholder='Option 3'
                            style={styles.answers}
                            onChangeText={setOption3}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setCorrectOption(4)}>


                            <Image source={4 !== correctOption ? require('../../../assets/icon/radio-button.png') : require('../../../assets/icon/radio-button-checked.png')}
                                style={[
                                    styles.radioTouchableOpacictyIcon

                                ]} />

                        </TouchableOpacity>
                        <TextInput
                            placeholder='Option 4'
                            style={styles.answers}
                            onChangeText={setOption4}
                        />
                    </View>


                </View>


                {/* Difficulty section */}
                <View style={{ flex: 1 }}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Difficulty</Text>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setDifficulty('easy')}>
                                    <Image source={difficulty !== 'easy' ? require('../../../assets/icon/radio-button.png') : require('../../../assets/icon/radio-button-checked.png')}
                                        style={styles.radioTouchableOpacictyIcon} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18 }}>Easy</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setDifficulty('normal')}>
                                    <Image source={difficulty !== 'normal' ? require('../../../assets/icon/radio-button.png') : require('../../../assets/icon/radio-button-checked.png')}
                                        style={styles.radioTouchableOpacictyIcon} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18 }}>Normal</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={styles.radioTouchableOpacicty} onPress={() => setDifficulty('hard')}>
                                    <Image source={difficulty !== 'hard' ? require('../../../assets/icon/radio-button.png') : require('../../../assets/icon/radio-button-checked.png')}
                                        style={styles.radioTouchableOpacictyIcon} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18 }}>Hard</Text>
                            </View>

                        </View>
                    </View>
                </View>


            </View>
            <View>
                <TouchableOpacity
                    disabled={
                        !questionTitle || !option1 || !option2 || !option3 || !option4 || !difficulty || !correctOption
                    }
                    style={[
                        styles.nextbutton,
                        (!questionTitle || !option1 || !option2 || !option3 || !option4 || !difficulty || !correctOption) && styles.nextbuttonDisabled
                    ]}
                    onPress={() => {
                        handleSubmit(questionTitle, subject, chapter, option1, option2, option3, option4, correctOption, difficulty);
                        navigation.dispatch(popAction)
                        alert('Question ' + questionTitle + ' of ' + chapter + ' in ' + subject + ' has been added to database')
                    }}
                >
                    <Text style={styles.nextbuttontext}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}


export default AddQuestion

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1
    },
    itemname: {
        fontSize: 24,
    },
    answers: {
        borderWidth: 1, padding: 10, fontSize: 24,
        marginLeft: 10,
        flexGrow: 1
    },
    radioTouchableOpacicty: {
        flexShrink: 0,
        alignContent: 'flex-start',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioTouchableOpacictyIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
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