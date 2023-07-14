import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const UsersTab = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ borderTopWidth: 1, fontSize: 0 }} />
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('ManageTeachers') }>
                <Text style={styles.itemname}>Manager Teachers</Text>

            </TouchableOpacity>
            <Text style={{ borderTopWidth: 1, fontSize: 0 }} />
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('ManageStudents') }>
                <Text style={styles.itemname}>Manager Students</Text>

            </TouchableOpacity>
            <Text style={{ borderTopWidth: 1, fontSize: 0 }} />
            <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('ManageTeachers') }>
                <Text style={styles.itemname}>Set Role</Text>

            </TouchableOpacity>
            <Text style={{ borderTopWidth: 1, fontSize: 0 }} />
        </View>
    )
}

export default UsersTab

const styles = StyleSheet.create({
    item: {
        padding: 10,
        // borderBottomWidth: 1
    },
    itemname: {
        fontSize: 24,
    },
})