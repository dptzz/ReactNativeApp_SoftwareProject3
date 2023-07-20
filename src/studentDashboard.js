import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../FirebaseConfig'
import data from '../subjectData.json'

const dotestUI = () => {


    return (
        <View style={styles.container}>

            <View style={styles.containerV1}>
                <View style={styles.viewV1}>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, padding: 5, borderRadius: 15, justifyContent: 'center', backgroundColor: 'rgb(101,220,65)' }}>
                        <Text style={styles.textV1}>Name: Gia Bao</Text>
                        <Text style={styles.textV1}>Class: Lop Diu</Text>
                    </View>
                    <View style={{ padding: 5, borderRadius: 10, justifyContent: 'center' }}>
                        <Image source={require('../assets/icon/bookIcon.png')} style={{ height: 48, width: 48 }}></Image>
                    </View>
                </View>

            </View>

            <View style={[styles.containerV2]}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <View style={styles.subjectsView}>
                            <View style={{ flex: 1, backgroundColor: 'white', borderWidth: 1, margin: 10, borderRadius: 30 }}>
                                <TouchableOpacity style={styles.subject}><Text style={styles.textV2}>GDCD 12</Text></TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'white', borderWidth: 1, margin: 10, borderRadius: 30 }}>
                                <TouchableOpacity style={styles.subject}><Text style={styles.textV2}>Văn Học 12</Text></TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>

        </View>
    )
}

export default dotestUI

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerV1: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingBottom: 20
    },
    containerV2: {
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: 10,
        marginBottom: 20,
        borderRadius: 20,
    },
    subjectsView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subject: {
        marginTop: 3,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(39,170,255)'
    },
    pic: {
        height: 40,
        width: 40
    },
    textV1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    textV2: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: -3
    },
    viewV1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    view4: {
        backgroundColor: 'rgb(255,220,0)',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})