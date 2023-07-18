import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'

const form1 = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.view1}>
                    <Text style={styles.text}>Question Title</Text>
                    <TextInput style={styles.textbox}></TextInput>
                </View>


                <View style={styles.view2}>
                    <Text style={styles.text}>Answer</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity><Image style={styles.icon} source={require('../assets/icon/check.png')}></Image></TouchableOpacity>
                        <TextInput placeholder='Option 1' style={styles.textbox}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity><Image style={styles.icon} source={require('../assets/icon/uncheck.png')}></Image></TouchableOpacity>
                        <TextInput placeholder='Option 1' style={styles.textbox}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity><Image style={styles.icon} source={require('../assets/icon/uncheck.png')}></Image></TouchableOpacity>
                        <TextInput placeholder='Option 1' style={styles.textbox}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity><Image style={styles.icon} source={require('../assets/icon/uncheck.png')}></Image></TouchableOpacity>
                        <TextInput placeholder='Option 1' style={styles.textbox}></TextInput>
                    </View>
                </View>


                <View style={styles.view3}>
                    <Text style={styles.text}>Difficulty</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity><Image style={styles.icon} source={require('../assets/icon/check.png')}></Image></TouchableOpacity>
                            <Text style={[styles.text, { fontSize: 15 }]}>Easy</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity><Image style={styles.icon} source={require('../assets/icon/uncheck.png')}></Image></TouchableOpacity>
                            <Text style={[styles.text, { fontSize: 15 }]}>Normal</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity><Image style={styles.icon} source={require('../assets/icon/uncheck.png')}></Image></TouchableOpacity>
                            <Text style={[styles.text, { fontSize: 15 }]}>Hard</Text>
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.view4}><Text style={styles.text}>Submit</Text></TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

export default form1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textbox: {
        borderWidth: 1,
        marginTop: 5,
        flexGrow: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 10
    },
    view1: {
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 10,
        paddingTop: 30,
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    view2: {
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10
    },
    view3: {
        backgroundColor: 'white',
        margin: 0,
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    view4: {
        backgroundColor: 'rgb(255,220,0)',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10
    }
})