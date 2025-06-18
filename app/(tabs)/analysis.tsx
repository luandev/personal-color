import {
  ColorPaletteDisplay,
  LoadingOverlay,
  PhotoUploader,
  ThemedText,
  ThemedView,
} from '@/design-system';
import { ColorSeason } from '@/constants/ColorPalettes';
import { useColorProfile } from '@/context/ColorProfileContext';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function AnalysisScreen() {
  const { profile, addPhoto, updateProfile } = useColorProfile();
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handlePhotoSelected = (uri: string, type: 'face' | 'veins' | 'jewelry') => {
    addPhoto({ uri, type });
  };

  const handleAnalyze = async () => {
    if (!profile.photos.find(p => p.type === 'face')) {
      setError('A face photo is required for analysis.');
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      const facePhoto = profile.photos.find(p => p.type === 'face')?.uri || '';
      const veinsPhoto = profile.photos.find(p => p.type === 'veins')?.uri;
      const jewelryPhoto = profile.photos.find(p => p.type === 'jewelry')?.uri;

      // In a real app, we would call the API here
      // For demo purposes, let's simulate API call with a timeout and random season
      // const result = await analyzeColorProfile(facePhoto, veinsPhoto, jewelryPhoto);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result for demo
      const seasons: ColorSeason[] = ['spring', 'summer', 'autumn', 'winter'];
      const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
      const undertones = ['warm', 'cool', 'neutral'] as const;
      const randomUndertone = undertones[Math.floor(Math.random() * undertones.length)];
      const contrasts = ['low', 'medium', 'high'] as const;
      const randomContrast = contrasts[Math.floor(Math.random() * contrasts.length)];
      const brightness = ['bright', 'muted'] as const;
      const randomBrightness = brightness[Math.floor(Math.random() * brightness.length)];
      
      updateProfile({
        season: randomSeason,
        analysis: {
          skinUndertone: randomUndertone,
          contrast: randomContrast,
          brightness: randomBrightness,
        },
      });
      
      // Go to profile screen
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace({
        pathname: "/(tabs)",
      });
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error('Analysis error:', err);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      {analyzing && <LoadingOverlay message="Analyzing your colors..." />}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Color Analysis
        </ThemedText>
        
        <ThemedText style={styles.instructions}>
          Take or upload photos of your face, veins, and jewelry preferences to determine your personal color palette.
        </ThemedText>
      
        <PhotoUploader
          photoUri={profile.photos.find(p => p.type === 'face')?.uri}
          photoType="face"
          title="Face Photo"
          description="Take a photo in natural light without makeup for the most accurate results."
          onPhotoSelected={handlePhotoSelected}
        />
        
        <PhotoUploader
          photoUri={profile.photos.find(p => p.type === 'veins')?.uri}
          photoType="veins"
          title="Wrist Veins"
          description="Take a photo of your inner wrist to help determine your undertone."
          onPhotoSelected={handlePhotoSelected}
        />
        
        <PhotoUploader
          photoUri={profile.photos.find(p => p.type === 'jewelry')?.uri}
          photoType="jewelry"
          title="Jewelry Preference"
          description="Take a photo of jewelry that looks best on you (gold, silver, etc)."
          onPhotoSelected={handlePhotoSelected}
        />

        {error && (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        )}
        
        {profile.photos.length > 0 && (
          <Pressable
            style={[styles.analyzeButton, analyzing && styles.disabledButton]}
            onPress={handleAnalyze}
            disabled={analyzing}
          >
            {analyzing ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText style={styles.buttonText}>Analyze My Colors</ThemedText>
            )}
          </Pressable>
        )}
        
        {profile.season && !analyzing && (
          <View style={styles.resultContainer}>
            <ThemedText type="subtitle">Your Results</ThemedText>
            <ColorPaletteDisplay season={profile.season} />
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
  },
  analyzeButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.08)',
    marginTop: 16,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  }
});
