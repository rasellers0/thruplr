import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../store/userSlice'
import { store } from '../store/store'; 
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const photoUris: any = [
    '../assets/images/test_images/food1.png', '../assets/images/test_images/food2.png',
    '../assets/images/test_images/food3.png', '../assets/images/test_images/food4.png',
    '../assets/images/test_images/food5.png'
]

// const UserData:any = {
//     userID: 0,
//     userName: 'rasellers0',
//     firstName: 'Ryan',
//     middleName: 'Alexander',
//     lastName: 'Sellers',
//     accountType: 'single',
//     age: 38,
//     location: 'Montgomery, Al',
//     gender: 'he/him',
//     sexuality: 'straight'
// }


function PicFrame() {
    const [currentPhoto, setCurrentPhoto] = useState({id:1, uri:require('../assets/images/test_images/food1.png')});

    function getNextPic(dir:string) {
        let photoCount = photoUris.length;
        let nextPicIndex:any = 1;
        if(dir === 'forward'){
            nextPicIndex = (currentPhoto.id == photoCount) ? 1 : currentPhoto.id + 1;
        }
        else if(dir === 'back') {
            nextPicIndex = (currentPhoto.id == 1) ? photoCount : currentPhoto.id - 1;
        }
        switch(nextPicIndex) {
            case 1:
                setCurrentPhoto({ id: 1, uri: require('../assets/images/test_images/food1.png') })
                break;
            case 2 :
                setCurrentPhoto({ id: 2, uri: require('../assets/images/test_images/food2.png') })
                break;
            case 3:
                setCurrentPhoto({ id: 3, uri: require('../assets/images/test_images/food3.png') })
                break;
            case 4:
                setCurrentPhoto({ id: 4, uri: require('../assets/images/test_images/food4.png') })
                break;
            case 5: 
                setCurrentPhoto({ id: 5, uri: require('../assets/images/test_images/food5.png') })
                break;
            default:
                setCurrentPhoto({ id: 1, uri: require('../assets/images/test_images/food1.png') })
        }
        console.log(JSON.stringify(currentPhoto))
    }

    return (
        <View style={styles.photoViewer}>
            <FAB icon="arrow-left-bold" style={[styles.floatingButton, styles.backButton]} 
                onPress={() => getNextPic('back')}/>
                <Image source={currentPhoto.uri} style={styles.bigImage}  />
            <FAB icon="arrow-right-bold" style={[styles.floatingButton, styles.nextButton]} 
                onPress={() => getNextPic('forward')}/>
        </View>
      );
}

function InfoField(props:any) {

    const UserData = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <ScrollView horizontal={true}>
                    <Text style={styles.demoDetails}>
                        {UserData.FirstName + ' ' + UserData.LastName}&nbsp;
                        | {UserData.DOB}&nbsp;
                        | {UserData.Location}&nbsp;
                        | {UserData.AccountType}&nbsp;
                        | {UserData.gender}&nbsp;
                        | {UserData.Orientation}
                    </Text>
                </ScrollView>
    )
}

function BioDetails({navigation}:any) {
    const UserData = useSelector(selectUser);
    const nav:any = useNavigation();
    return (
        <View style={styles.bioSection}>
            <ScrollView>
                <Text style={styles.sectionTitle}>
                    { UserData.accountType == 'single' ? 'About Me' : 'About Us' }
                    <View style={styles.editButtonContainer}>
                    <FAB style={styles.editButton} color="black" icon="account-edit" size="small" 
                    onPress={() => nav.navigate("Edit Profile")}/>
                    </View>
                    
                </Text>
                <View style={{marginStart:5, marginEnd:10}}>
                    <InfoField />
                </View>
                
                
                
                <Text style={styles.sectionContent}></Text>

                <Text style={styles.sectionTitle}>{UserData.accountType == 'single' ? "Who I'm looking for" : "Who we're looking for"}</Text>
                <Text style={styles.sectionContent}></Text>

                <Text style={styles.sectionTitle}>{UserData.accountType == 'single' ? "My favorite movies, books, etc" : "Our favorite books, movies, etc"}</Text>
                <Text style={styles.sectionContent}></Text>

            </ScrollView>
        </View>
    )
}

function CardView(navigation:any) {
    useEffect(() => {
        
    }, [])

    return (
        <View >
            <PicFrame></PicFrame>
            <BioDetails></BioDetails>
        </View>
        
    )
}

const styles = StyleSheet.create({
    photoViewer: {},
    demoDetails: {alignSelf:"flex-start", marginLeft:10, marginRight:10},
    bioSection: {width:SCREEN_WIDTH, height: SCREEN_HEIGHT/2, position:"absolute", top: SCREEN_HEIGHT/2,
        alignItems:"center", alignContent:"center", },
    sectionTitle: {fontSize: 24, fontWeight: '600', marginLeft:5},
    sectionContent: {width:SCREEN_WIDTH - 20, height: SCREEN_HEIGHT/4, borderWidth: 1, 
        borderColor: 'mediumvioletred', borderRadius: 10, marginLeft:5 },
    bigImage: {width: SCREEN_WIDTH, height: SCREEN_HEIGHT/2, position: "absolute", top: 0, left: 0 },
    floatingButton: {width: 60, height: 60, zIndex:99, elevation:99, position: 'absolute',
    top: SCREEN_WIDTH/3},
    backButton: { position: 'absolute', left: 10, },
    nextButton: { position: 'absolute', right: 10},
    editButton: { width: 25, height: 25, borderRadius: 20, backgroundColor:'lightcoral', justifyContent:"center",
     alignItems:"center", top:4, left:7},
    editButtonContainer: {alignItems: "flex-end", justifyContent:"center", position:"absolute"}
  })

  export default CardView;