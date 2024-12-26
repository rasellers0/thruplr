import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, SafeAreaView } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const photoUris: any = [
    '../assets/images/test_images/food1.png', '../assets/images/test_images/food2.png',
    '../assets/images/test_images/food3.png', '../assets/images/test_images/food4.png',
    '../assets/images/test_images/food5.png'
]

const ProfilePhotos:any = [
  { id: "1", uri: require('../assets/images/test_images/food1.png') },
  { id: "2", uri: require('../assets/images/test_images/food2.png') },
  { id: "3", uri: require('../assets/images/test_images/food2.png') },
  { id: "4", uri: require('../assets/images/test_images/food4.png') },
  { id: "5", uri: require('../assets/images/test_images/food5.png') },
]

const UserData:any = {
    userID: 0,
    userName: 'rasellers0',
    firstName: 'Ryan',
    middleName: 'Alexander',
    lastName: 'Sellers',
    accountType: 'single',
    age: 38,
    homeTown: 'Montgomerty, Al'
}


function PicFrame() {
    const [currentPhoto, setCurrentPhoto] = useState({id:1, uri:require('../assets/images/test_images/food1.png')});

    function getNextPic(dir:string) {
        let photoCount = ProfilePhotos.length;
        let nextPicIndex:any = 1;
        if(dir === 'forward'){
            nextPicIndex = (currentPhoto.id == photoCount) ? 1 : currentPhoto.id + 1;
        }
        else if(dir === 'back') {
            nextPicIndex = (currentPhoto.id == 1) ? photoCount : currentPhoto.id - 1;
        }
        console.log(nextPicIndex);
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

function BioDetails() {
    return (
        <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>{ UserData.accountType == 'single' ? 'About Me' : 'About Us' }</Text>
            <Text>{UserData.firstName + ' ' + UserData.lastName}</Text>
            <Text style={styles.sectionContent}></Text>
        </View>
    )
}

function CardView() {
    useEffect(() => {
        
    }, [])

    return (
        <SafeAreaView >
            <PicFrame></PicFrame>
            <BioDetails></BioDetails>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    photoViewer: {},
    bioSection: {width:SCREEN_WIDTH, height: SCREEN_HEIGHT/2, position:"absolute", top: SCREEN_HEIGHT/2,
        alignItems:"center", alignContent:"center", },
    sectionTitle: {fontSize: 24, fontWeight: '600'},
    sectionContent: {width:SCREEN_WIDTH - 20, height: SCREEN_HEIGHT/4, borderWidth: 1, 
        borderColor: 'mediumvioletred', borderRadius: 10, },
    bigImage: {width: SCREEN_WIDTH, height: SCREEN_HEIGHT/2, position: "absolute", top: 0, left: 0 },
    floatingButton: {width: 60, height: 60, zIndex:99, elevation:99, position: 'absolute',
    top: SCREEN_WIDTH/3},
    backButton: { position: 'absolute', left: 10, },
    nextButton: { position: 'absolute', right: 10}
  })

  export default CardView;