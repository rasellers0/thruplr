import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StatusBar } from 'react-native';
import Login from './screens/Login';
import Registration from './screens/registration';
import ProfileCreation from './screens/ProfileCreation';
import PhotoManagement from './screens/PhotoManagement';
import ProfileDetail from './screens/ProfileDetail';
import CardView from './screens/CardView';
import TabbedDisplay from './screens/TabbedDisplay';
import { store } from "./store/store";
import { Provider } from "react-redux";



const Stack = createNativeStackNavigator();

function App(): JSX.Element {
let stackOptions = {headerShown: false}
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={stackOptions}/>
            <Stack.Screen name="Registration" component={Registration} options={stackOptions}/>
            <Stack.Screen name="Profile creation" options={stackOptions} component={ProfileCreation} />
            <Stack.Screen name="Photo management" component={PhotoManagement} options={stackOptions}/>
            <Stack.Screen name="Profile Detail" component={ProfileDetail} options={stackOptions}/>
            <Stack.Screen name="Tab Display" component={TabbedDisplay} options={stackOptions}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

export default App;