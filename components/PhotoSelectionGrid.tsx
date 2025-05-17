import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const numColumns = 3;
const { width } = Dimensions.get('window');
const itemSize = width / numColumns - 20;

interface PhotoSelectionGridProps {
  images: string[];
  onImagePress?: (index: number) => void;
}

const photoUris: any = [
    'bernie1thumb.png', 'bernie2thumb.png', 'bernie3thumb.png', 'bernie4thumb.png', 'bernie5thumb.png'
];
const defaultImg = 'add_image.png';
let photoSource:string[] = [];
for(let i = 0; i < 9; i++){
    photoSource[i] = (i >= photoUris.length ? defaultImg : photoUris[i]);
}

function PhotoSelectionGrid({ images, onImagePress }: PhotoSelectionGridProps){
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'], allowsEditing: true, aspect: [4, 3], quality: 1});
        if (!result.canceled) { setImage(result.assets[0].uri); }
    };

    images = (images === null || images.length < 1) ? photoSource : images;
    const req = require.context('../assets/images/test_thumbs/', false, /\.png$/);
    const getImage = (filename: string): number => { return req(`./${filename}`); };

    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={pickImage}>
                <Image source={getImage(item)} style={styles.image} />
            </TouchableOpacity>
        </View>
    );

      return (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      );
}

const styles = StyleSheet.create({
  item: { width: itemSize, height: itemSize, margin: 10, borderWidth: 1, borderColor: 'mediumvioletred', 
        borderRadius: 10,},
  image: { width: '100%', height: '100%', borderRadius: 10 },
});

export default PhotoSelectionGrid;