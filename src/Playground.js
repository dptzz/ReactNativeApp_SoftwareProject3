import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions } from '@react-navigation/native'
import { firebase } from '../FirebaseConfig'



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
        <View style={{ flex: 1, backgroundColor: 'lightgrey' }}>

            <View style={styles.containerV1}>
                <View style={styles.viewV1}>
                    <View style={{ borderWidth: 1, padding: 5, borderRadius: 10, justifyContent: 'center' }}>
                        <Text style={styles.textV1}>Name: {userName}</Text>
                        <Text style={styles.textV1}>Class: {userClass}</Text>
                    </View>
                    <View style={{ borderWidth: 1, padding: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.textV1}>Subject:</Text>
                        <Text style={styles.textV1}>{subject}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ justifyContent: 'center', borderWidth: 1, marginTop: 10, borderRadius: 10, padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View>
                            <Text style={styles.textV1}>Time: 30 minutes</Text>
                            <Text style={styles.textV1}>Remaining: 15:25</Text>
                        </View>

                        {!showResults ? (
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                style={{ borderWidth: 1, borderRadius: 10, padding: 10, width: '40%', alignItems: 'center', backgroundColor: 'rgb(0,255,153)' }}>
                                <Text style={styles.textV1}>FINISH</Text>
                            </TouchableOpacity>
                        ) : (<TouchableOpacity
                            onPress={() => navigation.dispatch(popAction)}
                            style={{ borderWidth: 1, borderRadius: 10, padding: 10, width: '40%', alignItems: 'center', backgroundColor: 'rgb(0,255,153)' }}>
                            <Text style={styles.textV1}>DONE</Text>
                        </TouchableOpacity>)}


                    </View>
                </View>
            </View>


            <FlatList
                style={[styles.containerV2]}
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{ marginHorizontal: 20, marginVertical: 5, borderBottomWidth: 2 }}>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
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
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    answerCorrect: {
        backgroundColor: 'rgb(0,255,153)',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    answerWrong: {
        backgroundColor: 'rgb(255,51,51)',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    answerSelected: {
        backgroundColor: 'lightgrey',
        borderWidth: 1,
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