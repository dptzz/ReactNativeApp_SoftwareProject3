import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../FirebaseConfig'
import { StackActions } from '@react-navigation/native'
const pushAction = (chapterName, subjectName) => StackActions.push('EditChapter',
    { name: chapterName, subject: subjectName })


const ManageChapter = ({ navigation, route }) => {
    const [listChapters, setListChapters] = useState([])

    const { subject } = route.params

    // Get Chapters from firebase
    const getChapter = async () => {
        const db = firebase.firestore()
        const subjectsRef = db.collection('chapters');

        const snapshot = await subjectsRef.where('subject', '==', subject).get();
        if (snapshot.empty) {
            console.log('No matching documents...');
            return;
        }
        const allChapter = snapshot.docs.map(doc => doc.data());
        //console.log(allChapter.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
        // Sort by name
        setListChapters(allChapter.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
    }

    // Delete Chapters
    const deleteChapter = (chapterName, subjectName) => {
        const db = firebase.firestore()
        let docID = db.collection('chapters').where('name', '==', chapterName).where('subject', '==', subjectName).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    docID = doc.id
                    db.collection("chapters").doc(docID).delete().then(() => {
                        console.log("Document successfully deleted!" + docID);
                        alert("Chapter successfully deleted: " + chapterName);
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                })
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        let questionID = db.collection('questions').where('subject', '==', subjectName).where('chapter','==',chapterName).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    questionID = doc.id
                    db.collection("questions").doc(questionID).delete().then(() => {
                        console.log("Document successfully deleted!" + questionID);

                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                })
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    useEffect(() => {
        getChapter();
    }, [])
    useEffect(() => {
        const db = firebase.firestore()
        const chapterRef = db.collection('chapters').where('subject', '==', subject);
        const unsubscribe = chapterRef.onSnapshot((snapshot) => {
            setListChapters(snapshot.docs.map(doc => doc.data()));
        })
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <View style={{ flex: 1 ,backgroundColor: 'white',}}>
            <View style={{ flex: 1, margin: 10, marginTop: 40 }}>
                <Text style={{margin: 5, color: 'black', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Chapters</Text>
                <View style={{ flex: 1}}>
                    <FlatList
                        data={listChapters}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ManageQuestion', { subject: subject, chapter: item.name })}
                                style={[
                                    styles.item,
                                ]}>
                                <Text style={styles.itemname}>{item.name}</Text>
                                <TouchableOpacity
                                    style={styles.itemTouchableOpacicty}
                                    onPress={() => navigation.dispatch(pushAction(item.name, subject))}
                                >
                                    <Image source={require('../../assets/icon/edit.png')}
                                        style={styles.itemTouchableOpacictyIcon} />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.itemTouchableOpacicty}
                                    onPress={() => deleteChapter(item.name, subject)}
                                >
                                    <Image source={require('../../assets/icon/bin.png')}
                                        style={styles.itemTouchableOpacictyIcon} />

                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('AddChapter', { subject: subject })}
                style={styles.touchableOpacityStyle}>
                <Image
                    //We are making FAB using TouchableOpacity with an image
                    //We are using online image here
                    source={
                        require('../../assets/icon/add.png')
                      }
                    //You can use you project image Example below
                    //source={require('./images/float-add-icon.png')}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>
        </View>

    )
}

export default ManageChapter

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
        margin: 5,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    itemname: {
        flexGrow: 1,
        fontSize: 24,
        color: 'black'
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