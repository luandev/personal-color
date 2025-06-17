import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type InspirationCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  onPress?: () => void;
};

export function InspirationCard({ imageUrl, title, description, onPress }: InspirationCardProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <ThemedText type="defaultSemiBold" style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.description} numberOfLines={2}>
            {description}
          </ThemedText>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
  },
});
