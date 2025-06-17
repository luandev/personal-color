import { ColorSeason, SeasonalColorPalettes } from '@/constants/ColorPalettes';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type ColorPaletteDisplayProps = {
  season: ColorSeason | null;
  onSelectSeason?: (season: ColorSeason) => void;
  interactive?: boolean;
};

export function ColorPaletteDisplay({ 
  season, 
  onSelectSeason,
  interactive = false
}: ColorPaletteDisplayProps) {
  if (!season) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText>No color palette determined yet. Complete your analysis to see your color palette.</ThemedText>
      </ThemedView>
    );
  }

  const palette = SeasonalColorPalettes[season];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Your {season.charAt(0).toUpperCase() + season.slice(1)} Color Palette
        </ThemedText>
        {interactive && (
          <View style={styles.seasonSelector}>
            {(['spring', 'summer', 'autumn', 'winter'] as ColorSeason[]).map(s => (
              <Pressable 
                key={s} 
                style={[styles.seasonBubble, s === season && styles.activeSeason]} 
                onPress={() => onSelectSeason?.(s)}
              >
                <ThemedText style={s === season ? styles.activeSeasonText : {}}>
                  {s.charAt(0).toUpperCase()}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      
      <ThemedText style={styles.description}>{palette.description}</ThemedText>
      
      <View style={styles.colorSection}>
        <ThemedText type="defaultSemiBold">Primary Colors</ThemedText>
        <View style={styles.colorRow}>
          {palette.primary.map((color, index) => (
            <View key={index} style={[styles.colorSwatch, { backgroundColor: color }]} />
          ))}
        </View>
      </View>
      
      <View style={styles.colorSection}>
        <ThemedText type="defaultSemiBold">Neutral Colors</ThemedText>
        <View style={styles.colorRow}>
          {palette.neutrals.map((color, index) => (
            <View key={index} style={[styles.colorSwatch, { backgroundColor: color }]} />
          ))}
        </View>
      </View>
      
      <View style={styles.colorSection}>
        <ThemedText type="defaultSemiBold">Accent Colors</ThemedText>
        <View style={styles.colorRow}>
          {palette.accent.map((color, index) => (
            <View key={index} style={[styles.colorSwatch, { backgroundColor: color }]} />
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 16,
  },
  emptyContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  description: {
    opacity: 0.8,
    marginBottom: 8,
  },
  colorSection: {
    gap: 8,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  seasonSelector: {
    flexDirection: 'row',
    gap: 4,
  },
  seasonBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeSeason: {
    backgroundColor: '#0a7ea4',
  },
  activeSeasonText: {
    color: 'white',
  }
});
