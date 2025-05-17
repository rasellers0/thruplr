import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import NavButton from '../components/NavButton';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, SafeAreaView, ScrollView } from 'react-native';
import { FAB, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser, setUserEmail, setUserFirstName, setUserLastName } from '../store/userSlice'
import { store } from '../store/store'; 
import PhotoSelectionGrid from '@/components/PhotoSelectionGrid';
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function EditProfile(){
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigation:any = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.page}>
                <NavButton style={styles.backButton} title="Edit Profile Photos" 
                    press={() => navigation.navigate('Edit Photos')}></NavButton>
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
                    <Text>About Me</Text>
                    <TextInput multiline={true} autoCorrect={true} style={styles.textarea} value={user.AboutMe}/>
                    <Text>Who We're Looking For</Text>
                    <TextInput multiline={true} autoCorrect={true} style={styles.textarea} value={user.LookingFor}/>

                </View>
            
                <View style={{flex: 6, flexDirection:'row', justifyContent: 'space-evenly', marginRight:10, marginTop:20}}>
                    <NavButton style={styles.backButton} title="Back" press={() => navigation.navigate('Tab Display')}></NavButton>
                    <NavButton style={styles.button} title="Continue" press= {() => updateProfileInfo()}></NavButton>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

function updateProfileInfo() {

}

const styles = StyleSheet.create({
    button: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray", marginTop:15,
        textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center', width:150},
    backButton: {borderRadius: 20, overflow: 'hidden', backgroundColor : "lightpink", marginTop:15, 
                    textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center', width:150},
    inputView : {gap:15, width: "100%", paddingHorizontal: 40, marginBottom:5},
    input : {height: 50, paddingHorizontal: 20, borderColor: "red", borderWidth: 1, borderRadius: 7, backgroundColor:"#f0eded"},
    page: {color: '#5f9ea0', alignItems: 'center', marginTop:30},
    textarea: {height: 120, paddingHorizontal: 20, borderColor: "red", borderWidth: 1, borderRadius: 7,
verticalAlign:"top", backgroundColor:"#f0eded"}
  });

export default EditProfile