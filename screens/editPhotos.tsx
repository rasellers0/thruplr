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

const photoUris: any = [
    '../assets/images/test_images/food1.png', '../assets/images/test_images/food2.png',
    '../assets/images/test_images/food3.png', '../assets/images/test_images/food4.png',
    '../assets/images/test_images/food5.png'
];

function EditPhotos(){
    const navigation:any = useNavigation();
    return (
        <View style={styles.gridView}>
            <PhotoSelectionGrid images={[]} ></PhotoSelectionGrid>
            <View style={{flex: 6, flexDirection:'row', justifyContent: 'space-evenly', marginRight:10, marginTop:20}}>
                <NavButton style={styles.backButton} title="Back" press={() => navigation.navigate('Edit Profile')}></NavButton>
                <NavButton style={styles.button} title="Continue" press= {() => updatePhotos()}></NavButton>
            </View>
        </View>       
    )
}

function updatePhotos(){
    return;
}
const styles = StyleSheet.create({
    gridView: {paddingTop:50},
    button: {borderRadius: 20, overflow: 'hidden', backgroundColor : "gray", marginTop:15,
        textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center', width:150},
    backButton: {borderRadius: 20, overflow: 'hidden', backgroundColor : "lightpink", marginTop:15, 
                    textAlign: 'center', flexDirection:'row', alignItems:'center', justifyContent:'center', width:150},
  });
export default EditPhotos;