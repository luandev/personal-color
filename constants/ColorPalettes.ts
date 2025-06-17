/**
 * Color palettes for the four seasonal color types
 */

export type ColorSeason = 'spring' | 'summer' | 'autumn' | 'winter';

export type ColorPalette = {
  primary: string[];
  neutrals: string[];
  accent: string[];
  description: string;
  characteristics: string[];
  makeupTips: string[];
  clothingTips: string[];
};

export const SeasonalColorPalettes: Record<ColorSeason, ColorPalette> = {
  spring: {
    primary: ['#F4D365', '#F29E38', '#E97451', '#D64161', '#C42C90'],
    neutrals: ['#F9F2E7', '#E9D9C2', '#8C7A56', '#5C4E37'],
    accent: ['#2FC1D3', '#4AA361', '#B0E57C'],
    description: 'Spring types have warm, clear colors with golden undertones.',
    characteristics: [
      'Warm, golden undertones',
      'Clear, bright appearance',
      'Light to medium contrast',
      'Golden or red hair',
      'Warm-toned eyes (green, golden brown, amber)',
    ],
    makeupTips: [
      'Use warm peach blushes',
      'Golden or copper eyeshadows',
      'Coral or warm pink lipsticks',
      'Avoid cool plums and blue-reds',
    ],
    clothingTips: [
      'Wear golden yellows and greens',
      'Choose warm reds and peaches',
      'Avoid stark black and cool blues',
      'Opt for ivory instead of pure white',
    ],
  },
  summer: {
    primary: ['#C3DCEB', '#8CADD3', '#9B90C2', '#BFA2CD', '#F5AEAE'],
    neutrals: ['#F4F6F9', '#D2DCE3', '#8997A3', '#5D6B77'],
    accent: ['#A0D6B4', '#D4EFC8', '#F3DBE0'],
    description: 'Summer types have cool, soft colors with blue undertones.',
    characteristics: [
      'Cool, blue undertones',
      'Soft, muted appearance',
      'Low to medium contrast',
      'Ash blonde or brown hair',
      'Cool-toned eyes (blue, gray, cool brown)',
    ],
    makeupTips: [
      'Use rose or cool pink blushes',
      'Mauve and taupe eyeshadows',
      'Rose pink or berry lipsticks',
      'Avoid orange and warm browns',
    ],
    clothingTips: [
      'Wear soft blues and lavenders',
      'Choose cool pinks and blue-reds',
      'Avoid orange and yellow-greens',
      'Opt for soft gray instead of black',
    ],
  },
  autumn: {
    primary: ['#E3A857', '#C07D38', '#A05C35', '#8E444B', '#674A51'],
    neutrals: ['#F8EDDD', '#D8C7AE', '#897A60', '#4B4030'],
    accent: ['#486824', '#A2C77D', '#D7C797'],
    description: 'Autumn types have warm, muted colors with earthy undertones.',
    characteristics: [
      'Warm, golden-olive undertones',
      'Muted, earthy appearance',
      'Medium to high contrast',
      'Auburn or dark brown hair',
      'Rich-toned eyes (amber, dark brown, olive green)',
    ],
    makeupTips: [
      'Use terracotta or warm bronze blushes',
      'Olive green and copper eyeshadows',
      'Brick red or terracotta lipsticks',
      'Avoid fuchsia and cool pinks',
    ],
    clothingTips: [
      'Wear olive greens and mustard yellows',
      'Choose rust and terracotta shades',
      'Avoid bright, cool colors',
      'Opt for cream instead of pure white',
    ],
  },
  winter: {
    primary: ['#2D4674', '#4A246D', '#9B1E64', '#C32148', '#E63E62'],
    neutrals: ['#FFFFFF', '#D4D7DB', '#6D7E91', '#292C33'],
    accent: ['#045C5C', '#2073BC', '#60A1D6'],
    description: 'Winter types have cool, clear colors with blue undertones.',
    characteristics: [
      'Cool, blue undertones',
      'Clear, bright appearance',
      'High contrast',
      'Dark brown or black hair',
      'Clear-toned eyes (deep brown, black, icy blue)',
    ],
    makeupTips: [
      'Use cool pink or plum blushes',
      'Silver or cool gray eyeshadows',
      'Blue-red or deep burgundy lipsticks',
      'Avoid orange and warm browns',
    ],
    clothingTips: [
      'Wear true black and pure white',
      'Choose jewel tones and cool reds',
      'Avoid orange and warm earth tones',
      'Opt for cool gray instead of beige',
    ],
  },
};
