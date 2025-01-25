import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {Alert, Switch, Pressable, SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Card, TextInput } from 'react-native-paper';
import NavButton from '../components/NavButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../store/userSlice'
import { store } from '../store/store'; 
const logo = require("../assets/logo.png")
const facebook = require("../assets/facebook.png")
const reddit = require("../assets/reddit.png")
const insta = require("../assets/insta.png")

function Login({ navigation }: any): JSX.Element {
    const [click,setClick] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const nav:any = useNavigation();

    const user = useSelector(selectUser);
    
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='EMAIL' value={username} 
                    onChangeText={setUsername} autoCorrect={false} autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry 
                    value={password} onChangeText={setPassword} autoCorrect={false}
                    autoCapitalize='none'/>
            </View>

            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => Alert.alert("Forget Password!")}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => doLogin(username, password, nav)}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                <Text style={styles.optionsText}>OR LOGIN WITH</Text>
            </View>

            <View style={styles.mediaIcons}>
                <Image source={facebook} style={styles.icons}   />
                <Image source={reddit} style={styles.icons}  />
                <Image source={insta} style={styles.icons}  />
            </View>

            <View>
              <NavButton style={styles.button}
              title="Don't Have Account? Sign Up Here" press={() => navigation.navigate('Registration')}></NavButton>
            </View>
            

            {/* <Text style={styles.footerText}>Don't Have Account?<Text style={styles.signup}>  Sign Up</Text></Text> */}

        </View>
    );
}

async function doLogin(username:string, pass:string, navigation:any){
        let rtnVal:any;
        let jsonData = JSON.stringify({ 'username': username, 'password': pass })
        let fetchParams = {method: "POST", body: jsonData,}
        
        try {
            // const response = await fetch('http://192.168.0.175:1323/login', fetchParams);
            const response = await fetch('http://192.168.1.156:1323/login', fetchParams);
            rtnVal = await response.json();
            let jsonResp = JSON.parse(rtnVal);
            console.log(jsonResp);
            if(response.status === 200) {
                store.dispatch(setUser(jsonResp))
                navigation.navigate('Tab Display', {});
            }
        } catch (error) {
            console.error(error);
        } finally {
        }

}


const styles = StyleSheet.create({
    container : {alignItems : "center", paddingTop: 70,},
    image : {height : 150, width : 160 },
    title : {fontSize : 30, fontWeight : "bold", textTransform : "uppercase", textAlign: "center",
     paddingVertical : 40, color : "red"},
    inputView : {gap : 15, width : "100%", paddingHorizontal : 40, marginBottom  :5},
    input : {height : 50, paddingHorizontal : 20, borderColor : "red", borderWidth : 1, borderRadius: 7},
    rememberView : {width : "100%", paddingHorizontal : 50, justifyContent: "space-between",
      alignItems : "center", flexDirection : "row", marginBottom : 8},
    switch :{ flexDirection : "row", gap : 1, justifyContent : "center", alignItems : "center"},
    rememberText : {fontSize: 13},
    forgetText : {fontSize : 11, color : "red"},
    button : {backgroundColor : "red", height : 55, borderColor : "gray", borderWidth  : 1,  borderRadius : 5,
      alignItems : "center", justifyContent : "center"},
    buttonText : {color : "white", fontSize: 18, fontWeight : "bold"}, 
    buttonView :{width :"100%", paddingHorizontal : 50},
    optionsText : {textAlign : "center", paddingVertical : 10, color : "gray", fontSize : 13, marginBottom : 6},
    mediaIcons : {flexDirection : "row", gap : 15, alignItems: "center", justifyContent : "center", marginBottom : 18},
    icons : {width : 30, height: 30,},
    footerText : {textAlign: "center", color : "gray",},
    signup : {color : "red", fontSize : 13}
  })

  export default Login;