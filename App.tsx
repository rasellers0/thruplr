import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/mainScreen';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    // <WorkoutContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    //</WorkoutContextProvider>
  );
}

export default App;