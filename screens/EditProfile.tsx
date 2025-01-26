import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';
import NavButton from '../components/NavButton';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, SafeAreaView, ScrollView } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser, setUserEmail, setUserFirstName, setUserLastName } from '../store/userSlice'
import { store } from '../store/store'; 

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function EditProfile(){
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <View style={styles.page}>
                <View style={styles.inputView}>
                    <Text>Email Address</Text>
                    <TextInput style={styles.input} placeholder='EMAIL' value={user.email}
                            onChangeText={() => dispatch(setUserEmail(user.email))} autoCorrect={false} autoCapitalize='none' />
                    <Text>First Name</Text>
                    <TextInput style={styles.input} placeholder="First Name" value={user.FirstName}
                    autoCorrect={false} autoCapitalize='none' onChangeText={() => dispatch(setUserFirstName(user.FirstName))} />
                    <Text>Last Name</Text>
                    <TextInput style={styles.input} placeholder="Last Name" value={user.LastName}
                    autoCorrect={false} autoCapitalize='none' onChangeText={() => dispatch(setUserLastName(user.LastName))}/>

                </View>
            
                <View>
                    <NavButton style={styles.button}
                    title="Continue" 
                    press= {() => updateProfileInfo()}
                    ></NavButton>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

function updateProfileInfo() {

}

const styles = StyleSheet.create({
    button: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray", marginTop:15,
                     textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center'},
                     inputView : {gap : 15, width : "100%", paddingHorizontal : 40, marginBottom  :5},
    input : {height : 50, paddingHorizontal : 20, borderColor : "red", borderWidth : 1, borderRadius: 7},
    page: {color: '#5f9ea0', alignItems: 'center'},
  });

export default EditProfile