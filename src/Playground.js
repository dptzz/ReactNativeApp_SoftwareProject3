import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../FirebaseConfig'



const Playground = ({ route }) => {
    const [questions, setQuestions] = useState([]);
    const [selecetedOptions, setSelecetOptions] = useState({});
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const { subject } = route.params

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
        <View style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>
                            {index+1}. {item.question}
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                selecetedOptions[index] === 1 && styles.selecetedOptions,
                                showResults && selecetedOptions[index] === 1 && selecetedOptions !== item.correctOption && styles.wrongOption,
                                showResults && item.correctOption === 1 && styles.correctOption,
                                
                            ]}
                            onPress={() => handleOptionSelect(index, 1)}
                            disabled={showResults}>
                            <Text>{item.option1}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.option,
                                selecetedOptions[index] === 2 && styles.selecetedOptions,
                                showResults && selecetedOptions[index] === 2 && selecetedOptions !== item.correctOption && styles.wrongOption,
                                showResults && item.correctOption === 2 && styles.correctOption,
                                
                            ]}
                            onPress={() => handleOptionSelect(index, 2)}
                            disabled={showResults}>
                            <Text>{item.option2}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.option,
                                selecetedOptions[index] === 3 && styles.selecetedOptions,
                                showResults && selecetedOptions[index] === 3 && selecetedOptions !== item.correctOption && styles.wrongOption ,
                                showResults && item.correctOption === 3 && styles.correctOption,
                                
                            ]}
                            onPress={() => handleOptionSelect(index, 3)}
                            disabled={showResults}>
                            <Text>{item.option3}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.option,
                                selecetedOptions[index] === 4 && styles.selecetedOptions,
                                showResults && selecetedOptions[index] === 4 && selecetedOptions !== item.correctOption && styles.wrongOption ,
                                showResults && item.correctOption === 4 && styles.correctOption,
                                
                            ]}
                            onPress={() => handleOptionSelect(index, 4)}
                            disabled={showResults}>
                            <Text>{item.option4}</Text>
                        </TouchableOpacity>

                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={showResults}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            {showResults && (
                <View style={styles.result}>
                    <Text style={styles.score}>
                        Scored {score} out of {questions.length}
                    </Text>
                    <TouchableOpacity
                        style={styles.tryAgainButton}
                        onPress={getQuestions}
                        disabled={showResults}>
                        <Text style={styles.tryAgainButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
                
            )}
        </View>
    )
}

export default Playground

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    option: {
        backgroundColor: '#eee',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    selecetedOptions: {
        backgroundColor: '#949494',
    },
    correctOption: {
        backgroundColor: 'green',
    },
    wrongOption: {
        backgroundColor: 'red',
    },
    submitButton: {
        backgroundColor: 'cyan',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 20,
    },
    result:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tryAgainButton: {
        backgroundColor: 'cyan',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    tryAgainButtonText: {
        color: '#FFF',
        fontSize: 20,
    }
})