import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface DatingAppScreenProps {}

const DatingAppScreen: React.FC<DatingAppScreenProps> = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedPhotoSet, setSelectedPhotoSet] = useState(0);
  
  const photoSets = [
    ['Photo 1A', 'Photo 2A', 'Photo 3A', 'Photo 4A'],
    ['Photo 1B', 'Photo 2B', 'Photo 3B'],
    ['Photo 1C', 'Photo 2C', 'Photo 3C', 'Photo 4C', 'Photo 5C'],
    ['Photo 1D', 'Photo 2D'],
  ];

  const currentPhotos = photoSets[selectedPhotoSet];

  const handlePreviousPhoto = () => {if (currentPhotoIndex > 0) setCurrentPhotoIndex(currentPhotoIndex - 1);};
  const handleNextPhoto = () => {if (currentPhotoIndex < currentPhotos.length - 1) setCurrentPhotoIndex(currentPhotoIndex + 1);};

  const handlePhotoSetChange = (setIndex: number) => {
    setSelectedPhotoSet(setIndex);
    setCurrentPhotoIndex(0);
  };

  const handleLike = () => console.log('Liked!');
  const handleDislike = () => console.log('Disliked!');

  const renderPhotoSetButton = (index: number) => (
    <TouchableOpacity key={index} style={selectedPhotoSet === index ? styles.activePhotoSetButton : styles.photoSetButton} 
      onPress={() => handlePhotoSetChange(index)}
    >
      <Text style={selectedPhotoSet === index ? styles.activePhotoSetText : styles.photoSetText}>
        {photoSets[index].length}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.profilePhotoContainer}>
        <TouchableOpacity style={styles.leftPhotoNavOverlay} onPress={handlePreviousPhoto} disabled={currentPhotoIndex === 0}>
          <View style={styles.leftNavButton}>
            <Text style={currentPhotoIndex === 0 ? styles.disabledNavButtonText : styles.navButtonText}>
              &lt;
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightPhotoNavOverlay}  onPress={handleNextPhoto} 
            disabled={currentPhotoIndex === currentPhotos.length - 1}>
          <View style={styles.rightNavButton}>
            <Text style={currentPhotoIndex === currentPhotos.length - 1 ? styles.disabledNavButtonText : styles.navButtonText}>
              &gt;
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.mainPhoto}>
          <Text style={styles.photoText}>{currentPhotos[currentPhotoIndex]}</Text>
          <View style={styles.photoIndicators}>
            {currentPhotos.map((_, index) => (
              <View key={index} style={index === currentPhotoIndex ? styles.activeIndicator : styles.indicator} />
            ))}
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.photoSetContainer}>{[0, 1, 2, 3].map(renderPhotoSetButton)}</View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileTitle}>About Me</Text>
          <Text style={styles.profileText}>Lorem ipsum dolor and so forth and so on, blah blah blah, etc. etc. when blah something goes here...</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.dislikeButton} onPress={handleDislike}>
            <Text style={styles.dislikeButtonText}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Text style={styles.likeButtonText}>♥</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bottomActionButton}>
          <Text style={styles.bottomActionButtonText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  profilePhotoContainer: { height: 400, position: 'relative', backgroundColor: '#F5F5F5' },
  leftPhotoNavOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, zIndex: 2, 
    justifyContent: 'center', alignItems: 'center' },
  rightPhotoNavOverlay: { position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, zIndex: 2, 
    justifyContent: 'center', alignItems: 'center' },
  leftNavButton: { width: 40, height: 40, borderRadius: 8, borderWidth: 2, borderColor: '#55CDFC', 
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.95)', marginLeft: 15 },
  rightNavButton: { width: 40, height: 40, borderRadius: 8, borderWidth: 2, borderColor: '#55CDFC', 
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.95)', marginRight: 15 },
  navButtonText: { fontSize: 18, fontWeight: 'bold', color: '#55CDFC' },
  disabledNavButtonText: { fontSize: 18, fontWeight: 'bold', color: '#B0B0B0' },
  mainPhoto: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', margin: 20, 
    borderRadius: 12, position: 'relative' },
  photoText: { fontSize: 18, color: '#8E8E8E', fontWeight: '500' },
  photoIndicators: { position: 'absolute', bottom: 15, flexDirection: 'row', alignSelf: 'center' },
  indicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginHorizontal: 3 },
  activeIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF', marginHorizontal: 3 },
  content: { flex: 1 },
  photoSetContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, paddingVertical: 20 },
  photoSetButton: { width: 60, height: 60, borderRadius: 8, borderWidth: 2, borderColor: '#D0D0D0', 
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  activePhotoSetButton: { width: 60, height: 60, borderRadius: 8, borderWidth: 2, borderColor: '#55CDFC', 
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#55CDFC' },
  photoSetText: { fontSize: 16, fontWeight: 'bold', color: '#8E8E8E' },
  activePhotoSetText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  profileInfo: { backgroundColor: '#FFFFFF', margin: 20, padding: 20, borderRadius: 12, borderWidth: 1, 
    borderColor: '#E0E0E0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, 
    shadowRadius: 2, elevation: 2 },
  profileTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333333' },
  profileText: { fontSize: 15, lineHeight: 22, color: '#8E8E8E' },
  actionButtons: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, marginVertical: 20, gap: 40 },
  dislikeButton: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', 
    backgroundColor: '#F7A8B8', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, 
    shadowRadius: 3.84, elevation: 5 },
  likeButton: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', 
    backgroundColor: '#55CDFC', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, 
    shadowRadius: 3.84, elevation: 5 },
  dislikeButtonText: { fontSize: 24, color: '#FFFFFF', fontWeight: 'bold' },
  likeButtonText: { fontSize: 24, color: '#FFFFFF' },
  bottomActionButton: { backgroundColor: '#55CDFC', paddingVertical: 15, marginHorizontal: 20, marginBottom: 30, 
    borderRadius: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  bottomActionButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default DatingAppScreen;