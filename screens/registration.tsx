import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {Alert, Switch, Pressable, SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Card, TextInput } from 'react-native-paper';
import NavButton from '../components/NavButton';

export default function Registration({ navigation }: any): JSX.Element {
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');

    let userObj = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    }

    // useEffect(() => {
    //     userObj.email = email;
    //     userObj.firstName = firstName;
    //     userObj.lastName = lastName;
    //     userObj.password = password;
    //   });

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
                    title="Continue" press={() => navigation.navigate('Profile creation', {userID: 1, userObj: userObj})}></NavButton>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray", marginTop:15,
                     textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center'},
                     inputView : {gap : 15, width : "100%", paddingHorizontal : 40, marginBottom  :5},
    input : {height : 50, paddingHorizontal : 20, borderColor : "red", borderWidth : 1, borderRadius: 7},
    page: {color: '#5f9ea0', alignItems: 'center'},
  });