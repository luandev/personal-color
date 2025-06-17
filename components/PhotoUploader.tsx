import { useThemeColor } from '@/hooks/useThemeColor';
import { Image } from 'expo-image';
// eslint-disable-next-line import/no-unresolved
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

type PhotoUploaderProps = {
  photoUri?: string;
  photoType: 'face' | 'veins' | 'jewelry';
  title: string;
  description: string;
  onPhotoSelected: (uri: string, type: 'face' | 'veins' | 'jewelry') => void;
};

export function PhotoUploader({ 
  photoUri, 
  photoType, 
  title, 
  description, 
  onPhotoSelected 
}: PhotoUploaderProps) {
  const iconColor = useThemeColor({}, 'text');
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets[0]) {
      onPhotoSelected(result.assets[0].uri, photoType);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets[0]) {
      onPhotoSelected(result.assets[0].uri, photoType);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText>{description}</ThemedText>
      
      {photoUri ? (
        <Pressable onPress={pickImage}>
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          <View style={styles.editButton}>
            <IconSymbol name="pencil" size={16} color="#FFFFFF" />
          </View>
        </Pressable>
      ) : (
        <View style={styles.photoButtons}>
          <Pressable style={styles.photoButton} onPress={pickImage}>
            <IconSymbol name="photo.on.rectangle" size={24} color={iconColor} />
            <ThemedText>Gallery</ThemedText>
          </Pressable>
          <Pressable style={styles.photoButton} onPress={takePhoto}>
            <IconSymbol name="camera" size={24} color={iconColor} />
            <ThemedText>Camera</ThemedText>
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 8,
    alignItems: 'center',
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 24,
  },
  photoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0a7ea4',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
