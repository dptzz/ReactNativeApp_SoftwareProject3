import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const UsersTab = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Text style={{margin: 15, color: 'black', fontSize: 25, fontWeight: 'bold'}}>User</Text>
            <Text style={{fontSize: 0 }} />
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('ManageTeachers') }>
                <Text style={styles.itemname}>Manager Teachers</Text>

            </TouchableOpacity>
            <Text style={{ fontSize: 0 }} />
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('ManageStudents') }>
                <Text style={styles.itemname}>Manager Students</Text>

            </TouchableOpacity>
            <Text style={{fontSize: 0 }} />
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('ManageRole') }>
                <Text style={styles.itemname}>Set Role</Text>

            </TouchableOpacity>
            <Text style={{fontSize: 0 }} />
        </View>
    )
}

export default UsersTab

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        marginTop: 5,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
    },
    itemname: {
        fontSize: 24,
        color: 'black'
    },
})