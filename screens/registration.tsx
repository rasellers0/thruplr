import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import NavButton from '../components/NavButton';
import { useNavigation } from '@react-navigation/native';

export default function Registration({ navigation }: any): JSX.Element {
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    //navigation.goBack(), for example

    let userObj = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    }


    return (
        <SafeAreaView>
            <View style={styles.page}>
                <View style={styles.inputView}>
                    <Text>Email Address</Text>
                    <TextInput style={styles.input} placeholder='EMAIL' value={email}
                            onChangeText={setEmail} autoCorrect={false} autoCapitalize='none' />
                    <Text>First Name</Text>
                    <TextInput style={styles.input} placeholder="First Name" value={firstName}
                    autoCorrect={false} autoCapitalize='none' onChangeText={setFirstName} />
                    <Text>Last Name</Text>
                    <TextInput style={styles.input} placeholder="Last Name" value={lastName}
                    autoCorrect={false} autoCapitalize='none' onChangeText={setLastName}/>

                    <Text>Password</Text>
                    <TextInput style={styles.input} placeholder="Password" value={password}
                    autoCorrect={false} autoCapitalize='none' onChangeText={setPassword}
                    secureTextEntry={true}/>
                    <Text>Confirm Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true}
                    placeholder="Confirm Password" autoCorrect={false} autoCapitalize='none' />
                </View>
            
                <View>
                    <NavButton style={styles.button}
                    title="Continue" 
                    press= {() => createAccount(navigation, userObj)}
                    // press={() => navigation.navigate('Profile creation', {userID: 1, userObj: userObj})}
                    ></NavButton>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

function createAccount(navigation:any, userObj:any) {
    // navigation.goBack();
    // 'http://192.168.0.196:1323/createAccount'
    // 'http://127.0.0.1:1323/createAccount',
    //'localhost:1323/createAccount'
    //10.0.2.2:1323/createAccount
    
    fetch('http://10.0.2.2:1323/createAccount',
    {
        method: 'POST',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(userObj),
    }
    )
    .then(function(response){
        console.log("response: " + Object.keys(response));
        console.log("response status: " + response.status)
        console.log("response ok: " + response.ok)
    })

    .catch(error => {
        console.log("it's doing it, but it's failing.")
        console.error(error);
      });
}

const styles = StyleSheet.create({
    button: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray", marginTop:15,
                     textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center'},
                     inputView : {gap : 15, width : "100%", paddingHorizontal : 40, marginBottom  :5},
    input : {height : 50, paddingHorizontal : 20, borderColor : "red", borderWidth : 1, borderRadius: 7},
    page: {color: '#5f9ea0', alignItems: 'center'},
  });