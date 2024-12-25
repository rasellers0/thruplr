import React from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, SafeAreaView } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

let currentPhotoIndex = 0;

const Users = [
  { id: "1", uri: require('./assets/images/test_images/food1.png') },
  { id: "2", uri: require('./assets/images/test_images/food2.png') },
  { id: "3", uri: require('./assets/images/test_images/food3.png') },
  { id: "4", uri: require('./assets/images/test_images/food4.png') },
  { id: "5", uri: require('./assets/images/test_images/food5.png') },
]


function CardStage() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mediaIcons}>
                <FAB icon="navigate-before" style={styles.backButton} onPress={() => console.log('Pressed')}/>
                    <Image source={Users[currentPhotoIndex]} style={styles.bigImage}  />
                <FAB icon="navigate-next" style={styles.nextButton} onPress={() => console.log('Pressed')}/>
            </View>
        </SafeAreaView>
  
      );
}

const styles = StyleSheet.create({
    container : {alignItems : "center", paddingTop: 70,},
    mediaIcons : {width : "100%", paddingHorizontal : 50, justifyContent: "center",
        alignItems: "flex-end", flexDirection : "row"},
    bigImage: {width: SCREEN_WIDTH, height: SCREEN_HEIGHT/2 },
    backButton: { width: 30, height: 30, zIndex:99, elevation:99, margin:10, position: 'absolute' },
    nextButton: { width: 30, height: 30, zIndex:99, elevation:99, margin:10, position: 'absolute' }
  })