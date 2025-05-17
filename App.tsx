import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StatusBar, BackHandler, Alert } from 'react-native';
import Login from './screens/Login';
import Registration from './screens/registration';
import ProfileCreation from './screens/ProfileCreation';
import PhotoManagement from './screens/PhotoManagement';
import ProfileDetail from './screens/ProfileDetail';
import CardView from './screens/ViewProfile';
import TabbedDisplay from './screens/TabbedDisplay';
import { store } from "./store/store";
import { Provider } from "react-redux";
import EditProfile from './screens/EditProfile';
import EditPhotos from './screens/editPhotos';



const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction,);

    return () => backHandler.remove();
  }, []);
let stackOptions = {headerShown: false}
  return (
    <Provider store={store}>
        <AppBody></AppBody>
    </Provider>
  );
}

function AppBody(){
  let stackOptions = {headerShown: false}
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={stackOptions}/>
        <Stack.Screen name="Registration" component={Registration} options={stackOptions}/>
        <Stack.Screen name="Profile creation" options={stackOptions} component={ProfileCreation} />
        <Stack.Screen name="Photo management" component={PhotoManagement} options={stackOptions}/>
        <Stack.Screen name="Profile Detail" component={ProfileDetail} options={stackOptions}/>
        <Stack.Screen name="Edit Profile" component={EditProfile} options={stackOptions} />
        <Stack.Screen name="Tab Display" component={TabbedDisplay} options={stackOptions}/>
        <Stack.Screen name="Edit Photos" component={EditPhotos} options={stackOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;