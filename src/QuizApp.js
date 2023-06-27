import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const QuizApp = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'world-affairs' })}>
          <Text style={styles.categoryTitle}>World Affairs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'science' })}>
          <Text style={styles.categoryTitle}>Science</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'technology' })}>
          <Text style={styles.categoryTitle}>Technology</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'sports' })}>
          <Text style={styles.categoryTitle}>Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'literature' })}>
          <Text style={styles.categoryTitle}>Literature</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'movies' })}>
          <Text style={styles.categoryTitle}>Movies</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default QuizApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  category: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  }
})