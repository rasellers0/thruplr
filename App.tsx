import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Registration from './screens/registration';
import ProfileCreation from './screens/ProfileCreation';



const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    // <WorkoutContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Profile creation" component={ProfileCreation} />
        </Stack.Navigator>
      </NavigationContainer>
    //</WorkoutContextProvider>
  );
}

export default App;