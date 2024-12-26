import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Registration from './screens/registration';
import ProfileCreation from './screens/ProfileCreation';
import PhotoManagement from './screens/PhotoManagement';
import ProfileDetail from './screens/ProfileDetail';
import CardView from './screens/CardView';



const Stack = createNativeStackNavigator();

function App(): JSX.Element {
let stackOptions = {headerShown: false}
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Profile creation" options={stackOptions} component={ProfileCreation} />
          <Stack.Screen name="Photo management" component={PhotoManagement} />
          <Stack.Screen name="Profile Detail" component={ProfileDetail} />
          <Stack.Screen name="User Bio" component={CardView} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;