import { ColorPaletteDisplay } from '@/components/ColorPaletteDisplay';
import { InspirationCard } from '@/components/InspirationCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorProfile } from '@/context/ColorProfileContext';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

// Placeholder inspiration data
const makeupInspirations = [
  {
    id: '1',
    title: 'Natural Day Look',
    description: 'A subtle, everyday makeup look that enhances your natural features.',
    imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=200&h=200&auto=format&fit=crop',
    fullImageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000&auto=format&fit=crop',
    content: 'This natural day look focuses on enhancing your features without heavy application. For your seasonal color palette, use soft neutrals on the eyes, a touch of mascara, and a complementary lip shade. Remember to use blush colors that match your season for the most flattering effect.',
  },
  {
    id: '2',
    title: 'Bold Evening Glam',
    description: 'A dramatic look perfect for special occasions and evening events.',
    imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=200&h=200&auto=format&fit=crop',
    fullImageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1000&auto=format&fit=crop',
    content: 'This glamorous evening look makes a statement while still complementing your color season. Focus on creating depth with eyeshadows from your palette, defined liner, and a bold lip in your recommended shades. Highlight points that bring light to your best features.',
  },
];

const outfitInspirations = [
  {
    id: '3',
    title: 'Casual Weekend Style',
    description: 'Comfortable yet stylish outfit ideas perfect for weekend activities.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&h=200&auto=format&fit=crop',
    fullImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    content: 'This casual style incorporates key colors from your season while keeping things relaxed and comfortable. Pair neutral basics with accent pieces in your recommended color palette for a put-together weekend look that complements your natural coloring.',
  },
  {
    id: '4',
    title: 'Office Attire',
    description: 'Professional outfit combinations that flatter your color palette.',
    imageUrl: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=200&h=200&auto=format&fit=crop',
    fullImageUrl: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1000&auto=format&fit=crop',
    content: 'Professional doesn\'t mean boring. These office-appropriate looks incorporate your seasonal colors through classic pieces and thoughtful accessories. Focus on quality fabrics in your best neutrals, with pops of color that bring life to your workwear.',
  },
];

const accessoryInspirations = [
  {
    id: '5',
    title: 'Seasonal Accessories',
    description: 'Jewelry, scarves, and other accessories that complement your coloring.',
    imageUrl: 'https://images.unsplash.com/photo-1576053197211-47c193dba516?q=80&w=200&h=200&auto=format&fit=crop',
    fullImageUrl: 'https://images.unsplash.com/photo-1576053197211-47c193dba516?q=80&w=1000&auto=format&fit=crop',
    content: 'Accessories are the perfect way to incorporate your seasonal colors. Choose metals and gemstones that enhance your undertones, and scarves or bags in your palette\'s accent colors for the most flattering effect.',
  },
];

type InspirationItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fullImageUrl: string;
  content: string;
};

export default function InspirationScreen() {
  const { profile } = useColorProfile();
  const [selectedInspiration, setSelectedInspiration] = useState<InspirationItem | null>(null);
  
  const handleCardPress = (inspiration: InspirationItem) => {
    setSelectedInspiration(inspiration);
  };

  const closeModal = () => {
    setSelectedInspiration(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>
        Style Inspiration
      </ThemedText>
      
      {profile.season ? (
        <View style={styles.miniPalette}>
          <ColorPaletteDisplay season={profile.season} />
        </View>
      ) : (
        <ThemedView style={styles.noAnalysisContainer}>
          <ThemedText style={styles.noAnalysisText}>
            Complete your color analysis to see personalized inspiration.
          </ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Makeup Inspiration</ThemedText>
        {makeupInspirations.map(inspiration => (
          <InspirationCard 
            key={inspiration.id}
            title={inspiration.title}
            description={inspiration.description}
            imageUrl={inspiration.imageUrl}
            onPress={() => handleCardPress(inspiration)}
          />
        ))}
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Outfit Inspiration</ThemedText>
        {outfitInspirations.map(inspiration => (
          <InspirationCard 
            key={inspiration.id}
            title={inspiration.title}
            description={inspiration.description}
            imageUrl={inspiration.imageUrl}
            onPress={() => handleCardPress(inspiration)}
          />
        ))}
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Accessory Inspiration</ThemedText>
        {accessoryInspirations.map(inspiration => (
          <InspirationCard 
            key={inspiration.id}
            title={inspiration.title}
            description={inspiration.description}
            imageUrl={inspiration.imageUrl}
            onPress={() => handleCardPress(inspiration)}
          />
        ))}
      </ThemedView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedInspiration}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <IconSymbol name="xmark" size={24} color="#000" />
            </Pressable>
            
            {selectedInspiration && (
              <>
                <Image 
                  source={{ uri: selectedInspiration.fullImageUrl }} 
                  style={styles.modalImage} 
                />
                <ThemedText type="subtitle" style={styles.modalTitle}>
                  {selectedInspiration.title}
                </ThemedText>
                <ThemedText style={styles.modalDescription}>
                  {selectedInspiration.content}
                </ThemedText>
                
                {profile.season && (
                  <View style={styles.recommendationContainer}>
                    <ThemedText type="defaultSemiBold">
                      Recommended for your {profile.season} palette
                    </ThemedText>
                  </View>
                )}
              </>
            )}
          </ThemedView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  miniPalette: {
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
    gap: 12,
  },
  noAnalysisContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  noAnalysisText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalTitle: {
    marginBottom: 8,
  },
  modalDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});
