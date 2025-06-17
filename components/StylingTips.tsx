import { ColorSeason, SeasonalColorPalettes } from '@/constants/ColorPalettes';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type StylingTipsProps = {
  season: ColorSeason | null;
  tipType: 'makeup' | 'clothing';
};

export function StylingTips({ season, tipType }: StylingTipsProps) {
  if (!season) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText>No styling tips available. Complete your analysis to see personalized recommendations.</ThemedText>
      </ThemedView>
    );
  }

  const palette = SeasonalColorPalettes[season];
  const tips = tipType === 'makeup' ? palette.makeupTips : palette.clothingTips;
  const tipTitle = tipType === 'makeup' ? 'Makeup Recommendations' : 'Clothing Recommendations';

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{tipTitle}</ThemedText>
      <ThemedText style={styles.description}>
        Based on your {season} color palette, here are some recommendations:
      </ThemedText>
      <ScrollView style={styles.tipsContainer} showsVerticalScrollIndicator={false}>
        {tips.map((tip, index) => (
          <ThemedView key={index} style={styles.tipItem}>
            <ThemedText>• {tip}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    minHeight: 200,
  },
  emptyContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  description: {
    opacity: 0.8,
    marginBottom: 8,
  },
  tipsContainer: {
    maxHeight: 300,
  },
  tipItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'transparent',
  }
});
