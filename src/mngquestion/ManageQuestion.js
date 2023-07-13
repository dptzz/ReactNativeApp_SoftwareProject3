import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'
const pushAction = (question, chapterName, subjectName) => StackActions.push('EditQuestion',
    {question: question, chapter: chapterName, subject: subjectName })


const ManageQuestion = ({ navigation, route }) => {
    const [listQuestions, setListQuestions] = useState([])

    const { subject, chapter } = route.params

    // Get Chapters from firebase
    const getQuestion = async () => {
        const db = firebase.firestore()
        const subjectsRef = db.collection('questions');

        const snapshot = await subjectsRef.where('subject', '==', subject).where('chapter', '==', chapter).get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const allQuestion = snapshot.docs.map(doc => doc.data());
        //console.log(allChapter.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
        // Sort by name
        setListQuestions(allQuestion)
    }

    // Delete Question
    const deleteQuestion = (question, chapterName, subjectName) => {
        const db = firebase.firestore()
        let docID = db.collection('questions').where('subject', '==', subjectName).where('chapter', '==', chapterName).where('question', '==', question).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    docID = doc.id
                    console.log(docID)
                    db.collection("questions").doc(docID).delete().then(() => {
                        console.log("Document successfully deleted!" + docID);
                        alert("Question successfully deleted: " + question);
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                })
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    useEffect(() => {
        getQuestion();
    }, [])
    useEffect(() => {
        getQuestion();

    },[listQuestions]);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Questions</Text>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    <FlatList
                        data={listQuestions}
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.item,
                                ]}>
                                <Text style={styles.itemname} numberOfLines={1} ellipsizeMode='tail'>{item.question}</Text>
                                <TouchableOpacity
                                    style={styles.itemTouchableOpacicty}
                                    onPress={() => navigation.dispatch(pushAction(item.question, chapter, subject))}
                                >
                                    <Image source={require('../../assets/icon/edit.png')}
                                        style={styles.itemTouchableOpacictyIcon} />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.itemTouchableOpacicty}
                                    onPress={() => deleteQuestion(item.question, chapter, subject)}
                                >
                                    <Image source={require('../../assets/icon/bin.png')}
                                        style={styles.itemTouchableOpacictyIcon} />

                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>

            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('AddQuestion1', { subject: subject, chapter: chapter })}
                style={styles.touchableOpacityStyle}>
                <Image
                    //We are making FAB using TouchableOpacity with an image
                    //We are using online image here
                    source={{
                        uri:
                            'https://freesvg.org/img/1430954247.png',
                    }}
                    //You can use you project image Example below
                    //source={require('./images/float-add-icon.png')}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>
        </View>

    )
}

export default ManageQuestion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white',
        padding: 10,
    },
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        
    },
    itemname: {
        flexGrow: 1,
        fontSize: 24,
        flex: 1
    },
    itemTouchableOpacicty: {
        flexShrink: 0,
        alignContent: 'flex-end',
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    itemTouchableOpacictyIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    }
})