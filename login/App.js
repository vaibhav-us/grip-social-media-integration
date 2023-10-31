import { StyleSheet,} from 'react-native';
import Login from './src/login';
import Home from './src/home';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'


export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login'>{(props)=> <Login {...props}/> }</Stack.Screen>
            <Stack.Screen name="home">{(props)=> <Home {...props}/> }</Stack.Screen>
        </Stack.Navigator>    
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
