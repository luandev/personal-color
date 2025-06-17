# Personal Color Assistant

A cutting-edge personal color assistant and stylist application leveraging OpenAI's vision capabilities. Upload your photos, and let it analyze and provide personalized style recommendations based on your unique color palette and style preferences.

## Features

- Upload photos of your veins, jewelry, and face for a comprehensive color analysis
- Receive personalized styling advice and color recommendations
- View your seasonal color palette with primary, neutral, and accent colors
- Get detailed makeup and clothing recommendations based on your season
- Browse inspiration for makeup, outfits, and accessories that complement your coloring

## Getting Started

1. Clone the repository

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up your OpenAI API key
   
   Edit the `utils/openaiApi.ts` file and replace `YOUR_OPENAI_API_KEY` with your actual API key.
   
   **Note:** In a production environment, you should use environment variables or a secure storage solution instead.

4. Start the app

   ```bash
   npx expo start
   ```

## Usage

1. Navigate to the "Analysis" tab and upload photos of your face, wrist veins, and preferred jewelry
2. Tap "Analyze My Colors" to process your photos
3. View your personalized color palette and recommendations in the "Profile" tab
4. Explore style inspirations in the "Inspiration" tab

## Technology Stack

- React Native / Expo
- TypeScript
- AsyncStorage for data persistence
- Expo Router for navigation
- OpenAI GPT-4 Vision API for photo analysis

## Seasonal Color Theory

This app is based on the four-season color theory, which categorizes individuals into:

- **Spring**: Warm, clear colors with golden undertones
- **Summer**: Cool, soft colors with blue undertones
- **Autumn**: Warm, muted colors with earthy undertones
- **Winter**: Cool, clear colors with blue undertones

Each season has a unique color palette that complements the individual's natural coloring, including skin undertone, hair color, and eye color.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve the application.
  git config --global user.email "luan.citta@gmail.com"
  git config --global user.name "luan.citta"