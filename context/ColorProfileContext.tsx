import { ColorSeason } from '@/constants/ColorPalettes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ProfilePhoto = {
  uri: string;
  type: 'face' | 'veins' | 'jewelry';
};

export type ColorProfile = {
  season: ColorSeason | null;
  photos: ProfilePhoto[];
  analysis: {
    skinUndertone: 'warm' | 'cool' | 'neutral' | null;
    contrast: 'low' | 'medium' | 'high' | null;
    brightness: 'bright' | 'muted' | null;
  };
  stylePreferences: string[];
};

interface ColorProfileContextType {
  profile: ColorProfile;
  isLoading: boolean;
  updateProfile: (newProfile: Partial<ColorProfile>) => void;
  addPhoto: (photo: ProfilePhoto) => void;
  removePhoto: (uri: string) => void;
  clearProfile: () => void;
}

const defaultProfile: ColorProfile = {
  season: null,
  photos: [],
  analysis: {
    skinUndertone: null,
    contrast: null,
    brightness: null,
  },
  stylePreferences: [],
};

export const ColorProfileContext = createContext<ColorProfileContextType>({
  profile: defaultProfile,
  isLoading: true,
  updateProfile: () => {},
  addPhoto: () => {},
  removePhoto: () => {},
  clearProfile: () => {},
});

export const useColorProfile = () => useContext(ColorProfileContext);

export function ColorProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ColorProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load profile from storage
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('colorProfile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Failed to load color profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async (updatedProfile: ColorProfile) => {
    try {
      await AsyncStorage.setItem('colorProfile', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Failed to save color profile:', error);
    }
  };

  const updateProfile = (newProfile: Partial<ColorProfile>) => {
    const updatedProfile = { ...profile, ...newProfile };
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const addPhoto = (photo: ProfilePhoto) => {
    const updatedPhotos = [...profile.photos.filter(p => p.type !== photo.type), photo];
    const updatedProfile = { ...profile, photos: updatedPhotos };
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const removePhoto = (uri: string) => {
    const updatedPhotos = profile.photos.filter(photo => photo.uri !== uri);
    const updatedProfile = { ...profile, photos: updatedPhotos };
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const clearProfile = () => {
    setProfile(defaultProfile);
    saveProfile(defaultProfile);
  };

  return (
    <ColorProfileContext.Provider
      value={{
        profile,
        isLoading,
        updateProfile,
        addPhoto,
        removePhoto,
        clearProfile,
      }}>
      {children}
    </ColorProfileContext.Provider>
  );
}
