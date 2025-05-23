import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {Alert, Switch, Pressable, SafeAreaView, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Card, TextInput } from 'react-native-paper';
import NavButton from '../components/NavButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../store/userSlice'
import { store } from '../store/store'; 

const logo = require("../assets/thruplr_no_bg.png")
const facebook = require("../assets/facebook.png")
const reddit = require("../assets/reddit.png")
const insta = require("../assets/insta.png")

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

let invalidLogin = false;

function Login({ navigation }: any): JSX.Element {
    const [rememberMe, setRememberMe] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    // const [invalidLogin, setInvalidLogin] = useState(false);
    const nav:any = useNavigation();

    const user = useSelector(selectUser);

    // function rememberUser(){
    //     setRememberMe(rememberMe === false ? true : false)
    // }
    
    async function rememberUser(value:any) {
        console.log(value)
        try {
            let userData = {'username': username, 'password': password}
            const jsonData = JSON.stringify(userData);
            await AsyncStorage.setItem('userLogin', jsonData);
            setRememberMe(value);
            // setRememberMe(value === false ? true : false)
        } catch (e) {
          console.log(e)
        }
      };

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Login</Text>
            {invalidLogin && 
                <Text style={styles.errorMsg}>
                    Username and/or password is incorrect, please try again
                </Text>
            }
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='USERNAME' value={username} 
                    onChangeText={setUsername} autoCorrect={false} autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry 
                    value={password} onChangeText={setPassword} autoCorrect={false}
                    autoCapitalize='none'/>
            </View>

            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch value={rememberMe} onValueChange={rememberUser} trackColor={{true : "green" , false : "gray"}} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => Alert.alert("Forget Password!")}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View>
                <NavButton color="white" title="LOGIN" style={styles.button}
                    press={() => doLogin(username, password, rememberMe, nav)}></NavButton>
                <Text style={styles.optionsText}>OR LOGIN WITH</Text>
            </View>

            <View style={styles.mediaIcons}>
                <Image source={facebook} style={styles.icons}   />
                <Image source={reddit} style={styles.icons}  />
                <Image source={insta} style={styles.icons}  />
            </View>

            <View>
              <NavButton style={styles.button} color="white" title="Don't Have Account? Sign Up Here" 
                press={() => navigation.navigate('Registration')}>
            </NavButton>
            </View>
            
        </View>
    );
}

async function doLogin(username:string, pass:string, rememberMe:any, navigation:any){
        let rtnVal:any;
        let jsonData = JSON.stringify({ 'username': username, 'password': pass })
        let fetchParams = {method: "POST", body: jsonData,}
        
        invalidLogin = false;
        try {
            if (username === "" || pass === "") {
                invalidLogin = true;
                console.log(JSON.stringify(selectUser))
                store.dispatch(setUser({}));
                return;
            } else if(rememberMe){
                const getData = async () => {
                    try {
                        const userLogin = await AsyncStorage.getItem('userLogin');
                        jsonData = userLogin != null ? JSON.stringify(JSON.parse(userLogin)) : jsonData
                        return jsonData;
                    } catch (e) {
                        invalidLogin = true;
                        store.dispatch(setUser(selectUser));
                      // error reading value
                    }
                };
            }  
            // inet 192.168.0.120 netmask 0xffffff00 broadcast 192.168.0.255
            const ENDPOINT_URL = 'http://192.168.0.120:1323/login'
            // const ENDPOINT_URL = 'http://192.168.0.111:1323/login';
            // const ENDPOINT_URL = 'http://192.168.1.151:1323/login';
            const response = await fetch(ENDPOINT_URL, fetchParams);
            rtnVal = await response.json();
            let jsonResp = JSON.parse(rtnVal);
            console.log(jsonResp);
            if(response.status === 200 && jsonResp.value !== 'failure') {
                store.dispatch(setUser(jsonResp));
                navigation.navigate('Tab Display', {});
            } else {
                invalidLogin = true;
                store.dispatch(setUser({}));
            }

        } catch (error) {
            invalidLogin = true;
            store.dispatch(setUser({}));
        } finally {

        }

}


const styles = StyleSheet.create({
    container : {alignItems : "center", paddingTop: 5,},
    image : {height : 150, width : 300, marginTop:20 },
    title : {fontSize:30, fontWeight : "bold", textTransform : "uppercase", textAlign: "center",
     paddingVertical:20, color : "red"},
    inputView : {gap : 15, width : "100%", paddingHorizontal:30, marginBottom  :5},
    input : {height : 50, paddingHorizontal : 20, borderColor : "red", borderWidth : 1, borderRadius: 7},
    rememberView : {width : "100%", paddingHorizontal : 50, justifyContent: "space-between",
      alignItems : "center", flexDirection : "row", marginBottom : 8},
    switch :{ flexDirection : "row", gap : 1, justifyContent : "center", alignItems : "center"},
    rememberText : {fontSize: 13},
    forgetText: {fontSize : 11, color : "red"},
    button: {backgroundColor: "red", height: 55, borderColor: "gray", borderWidth: 1,  borderRadius: 5,
      alignItems : "center", justifyContent : "center",  width:SCREEN_WIDTH/2},
    buttonText : {color : "white", fontSize: 18, fontWeight : "bold"}, 
    buttonView :{width :"100%", paddingHorizontal : 50},
    optionsText : {textAlign : "center", paddingVertical : 10, color : "gray", fontSize : 13, marginBottom : 6},
    mediaIcons : {flexDirection : "row", gap : 15, alignItems: "center", justifyContent : "center", marginBottom : 18},
    icons : {width : 30, height: 30,},
    footerText : {textAlign: "center", color : "gray",},
    signup : {color : "red", fontSize : 13},
    errorMsg: {backgroundColor: '#c7cfd6', borderRadius:20, fontSize:20, padding:10,
        marginBottom:25, paddingHorizontal:30}
  })

  export default Login;