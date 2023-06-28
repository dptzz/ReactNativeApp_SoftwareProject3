import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QuizApp from './QuizApp';
import Playground from './Playground';

const Stack = createStackNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack>
        <Stack.Screen name='QuizApp' component={QuizApp} />
        <Stack.Screen name='Playground' component={Playground} />

      </Stack>
    </NavigationContainer>
  )
}


