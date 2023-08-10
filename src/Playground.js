import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList, ScrollView , Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions } from '@react-navigation/native'
import { firebase } from '../FirebaseConfig'
import CountDown from 'react-native-countdown-fixed'



const Playground = ({ navigation, route }) => {
    const [questions, setQuestions] = useState([]);
    const [selecetedOptions, setSelecetOptions] = useState({});
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const { subject, userName, userClass } = route.params
    // Go Back to manage screen
    const popAction = StackActions.pop(1);
    useEffect(() => {
        getQuestions()
    }, [])
    const getQuestions = async () => {
        setSelecetOptions({});
        setShowResults(false);
        const db = firebase.firestore()
        const questionsRef = db.collection('questions');
        const snapshot = await questionsRef.where('subject', '==', subject).get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const allQuestions = snapshot.docs.map(doc => doc.data());
        const shuffleQuestions = allQuestions.sort(() => 0.5 - Math.random())
        setQuestions(shuffleQuestions.slice(0, 15));
    };

    const handleOptionSelect = (questionIndex, option) => {
        setSelecetOptions({
            ...selecetedOptions,
            [questionIndex]: option,
        });
    }
    const handleSubmit = () => {
        let correctAnswer = 0;
        questions.forEach((questions, index) => {
            if (selecetedOptions[index] === questions.correctOption) {
                correctAnswer++;
            }
        });
        setScore(correctAnswer);
        setShowResults(true);
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {showResults && alert("Your score: "+score+"/"+questions.length)}
            <View style={styles.containerV1}>
                <View style={styles.viewV1}>
                    <View style={{ borderWidth: 0, padding: 5, borderRadius: 10, justifyContent: 'center', }}>
                        <Text style={styles.textV1}>Name: {userName}</Text>
                        <Text style={styles.textV1}>Class: {userClass}</Text>
                    </View>
                    <View style={{
                        borderWidth: 0, padding: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#65dc41', shadowColor: 'black',
                        shadowRadius: 5,
                        elevation: 5
                    }}>
                        <CountDown
                            until={150}
                            onFinish={() => {
                                handleSubmit()

                            }}
                            digitStyle={{ backgroundColor: '#65dc41', margin: -5 }}
                            digitTxtStyle={{ color: 'white' }}
                            separatorStyle={{ color: 'white' }}
                            timeToShow={['M', 'S']}
                            timeLabels={{ m: null, s: null }}
                            showSeparator
                            running={!showResults}
                        />
                    </View>
                </View>
                <View>
                    <View style={{ justifyContent: 'center', borderWidth: 0, marginTop: 10, borderRadius: 10, padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View>
                            <Text style={styles.textV1}>Time: 30 minutes</Text>
                            <Text style={styles.textV1}>Subject: {subject} </Text>
                        </View>

                        {!showResults ? (
                            <TouchableOpacity
                                onPress={() => {

                                    handleSubmit()
                                }}
                                style={{
                                    borderWidth: 0, shadowColor: 'black',
                                    shadowRadius: 5,
                                    elevation: 5, borderRadius: 10, padding: 10, width: '40%', alignItems: 'center', backgroundColor: '#27aaff'
                                }}>
                                <Text style={[styles.textV1, { color: 'white' }]}>FINISH</Text>
                            </TouchableOpacity>
                        ) : (<TouchableOpacity
                            onPress={() => navigation.dispatch(popAction)}
                            style={{
                                borderWidth: 0, borderRadius: 10, padding: 10, width: '40%', alignItems: 'center', backgroundColor: '#27aaff', shadowColor: 'black',
                                shadowRadius: 5,
                                elevation: 5,
                            }}>
                            <Text style={[styles.textV1, { color: 'white' }]}>DONE</Text>
                        </TouchableOpacity>)}


                    </View>
                </View>
            </View>


            <FlatList
                style={[styles.containerV2]}
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{
                        marginHorizontal: 10, padding: 10, borderRadius: 10, marginVertical: 5, borderBottomWidth: 0, shadowColor: 'black',
                        shadowRadius: 5,
                        elevation: 5, backgroundColor: 'white'
                    }}>
                        <View>
                            <Text style={styles.textV2}>{index + 1}. {item.question}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[styles.answer,
                                selecetedOptions[index] === 1 && styles.answerSelected,
                                showResults && selecetedOptions[index] === 1 && selecetedOptions !== item.correctOption && styles.answerWrong,
                                showResults && item.correctOption === 1 && styles.answerCorrect,]}
                                onPress={() => handleOptionSelect(index, 1)}
                                disabled={showResults}
                            >
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>A: </Text>
                                <Text style={styles.textAnswer}>{item.option1}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.answer,
                                selecetedOptions[index] === 2 && styles.answerSelected,
                                showResults && selecetedOptions[index] === 2 && selecetedOptions !== item.correctOption && styles.answerWrong,
                                showResults && item.correctOption === 2 && styles.answerCorrect,]}
                                onPress={() => handleOptionSelect(index, 2)}
                                disabled={showResults}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>B: </Text>
                                <Text style={styles.textAnswer}>{item.option2}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.answer,
                                selecetedOptions[index] === 3 && styles.answerSelected,
                                showResults && selecetedOptions[index] === 3 && selecetedOptions !== item.correctOption && styles.answerWrong,
                                showResults && item.correctOption === 3 && styles.answerCorrect,]}
                                onPress={() => handleOptionSelect(index, 3)}
                                disabled={showResults}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>C: </Text>
                                <Text style={styles.textAnswer}>{item.option3}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.answer, { marginBottom: 14 },
                                selecetedOptions[index] === 4 && styles.answerSelected,
                                showResults && selecetedOptions[index] === 4 && selecetedOptions !== item.correctOption && styles.answerWrong,
                                showResults && item.correctOption === 4 && styles.answerCorrect,]}
                                onPress={() => handleOptionSelect(index, 4)}
                                disabled={showResults}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>D: </Text>
                                <Text style={styles.textAnswer}>{item.option4}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    )
}

export default Playground

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    containerV1: {
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 5
    },
    containerV2: {
        backgroundColor: 'white',
        marginTop: 5,
        marginHorizontal: 10,
        marginBottom: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    textV1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    textV2: {
        color: 'black',
        fontSize: 17
    },
    viewV1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    answer: {
        borderWidth: 0,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
        , shadowColor: 'black',
        shadowRadius: 5,
        elevation: 1.5, backgroundColor: 'white',
        shadowOpacity: 0.3,
    },
    answerCorrect: {
        backgroundColor: '#65dc41',
        borderWidth: 0,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    answerWrong: {
        backgroundColor: 'rgb(255,51,51)',
        borderWidth: 0,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    answerSelected: {
        backgroundColor: 'lightgrey',
        borderWidth: 0,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    textAnswer: {
        paddingRight: 10,
        color: 'black',
        fontSize: 15,
        marginRight: 10
    }
})