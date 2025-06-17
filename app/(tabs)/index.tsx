import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ColorPaletteDisplay } from '@/components/ColorPaletteDisplay';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { StylingTips } from '@/components/StylingTips';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorProfile } from '@/context/ColorProfileContext';

export default function ProfileScreen() {
  const { profile, isLoading } = useColorProfile();

  const headerColor = profile.season 
    ? { 
        light: profile.season === 'spring' ? '#F4D365' : 
               profile.season === 'summer' ? '#C3DCEB' : 
               profile.season === 'autumn' ? '#E3A857' : '#2D4674',
        dark: profile.season === 'spring' ? '#8C7A56' : 
              profile.season === 'summer' ? '#8997A3' : 
              profile.season === 'autumn' ? '#897A60' : '#6D7E91'
      }
    : { light: '#A1CEDC', dark: '#1D3D47' };

  const handleStartAnalysis = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace({
      pathname: "/(tabs)",
      params: { screen: "analysis" }
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={headerColor}
      headerImage={
        profile.photos.length > 0 && profile.photos.find(p => p.type === 'face')?.uri ? (
          <Image
            source={{ uri: profile.photos.find(p => p.type === 'face')?.uri }}
            style={styles.profilePhoto}
          />
        ) : (
          <View style={styles.emptyProfile}>
            <IconSymbol name="person.fill" size={60} color="white" />
          </View>
        )
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Color Profile</ThemedText>
      </ThemedView>

      {!profile.season ? (
        <ThemedView style={styles.startContainer}>
          <ThemedText style={styles.startText}>
            Start your color analysis to discover your personal color palette and get tailored style recommendations.
          </ThemedText>
          <Pressable
            style={styles.startButton}
            onPress={handleStartAnalysis}
          >
            <ThemedText style={styles.buttonText}>Start Analysis</ThemedText>
          </Pressable>
        </ThemedView>
      ) : (
        <>
          <ColorPaletteDisplay season={profile.season} />
          
          <View style={styles.statsContainer}>
            <ThemedView style={styles.statCard}>
              <ThemedText type="defaultSemiBold">Undertone</ThemedText>
              <ThemedText style={styles.statValue}>
                {profile.analysis.skinUndertone || 'Unknown'}
              </ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.statCard}>
              <ThemedText type="defaultSemiBold">Contrast</ThemedText>
              <ThemedText style={styles.statValue}>
                {profile.analysis.contrast || 'Unknown'}
              </ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.statCard}>
              <ThemedText type="defaultSemiBold">Brightness</ThemedText>
              <ThemedText style={styles.statValue}>
                {profile.analysis.brightness || 'Unknown'}
              </ThemedText>
            </ThemedView>
          </View>
          
          <StylingTips season={profile.season} tipType="clothing" />
          <StylingTips season={profile.season} tipType="makeup" />
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profilePhoto: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
  emptyProfile: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.2)',
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 16,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  startContainer: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 20,
  },
  startText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
