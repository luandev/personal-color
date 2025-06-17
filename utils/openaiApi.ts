import * as FileSystem from 'expo-file-system';

// Replace with your actual API key management approach
// In production, you should never store API keys directly in code
// Use environment variables or a secure storage solution
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

type AnalysisResult = {
  season: string;
  undertone: string;
  contrast: string;
  brightness: string;
  recommendations: {
    colors: string[];
    makeup: string[];
    clothing: string[];
  };
  explanation: string;
};

export async function analyzeColorProfile(
  faceImageUri: string, 
  veinsImageUri?: string, 
  jewelryImageUri?: string
): Promise<AnalysisResult> {
  try {
    // Convert images to base64
    const faceImage = await imageToBase64(faceImageUri);
    const veinsImage = veinsImageUri ? await imageToBase64(veinsImageUri) : null;
    const jewelryImage = jewelryImageUri ? await imageToBase64(jewelryImageUri) : null;

    // Prepare the API payload
    const payload = {
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze these images and determine the person's seasonal color profile (Spring, Summer, Autumn, or Winter). " +
                    "Consider skin tone, undertones, contrast level, and brightness. " +
                    "Based on this, provide specific color, makeup, and clothing recommendations."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${faceImage}`
              }
            },
            ...(veinsImage ? [{
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${veinsImage}`
              }
            }] : []),
            ...(jewelryImage ? [{
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${jewelryImage}`
              }
            }] : [])
          ]
        }
      ],
      max_tokens: 1000
    };

    // Make API call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the response - in a real app, you'd want more robust parsing
    const analysisText = data.choices[0].message.content;
    
    // For demo purposes, returning a mock parsed result
    // In a real app, you'd parse the text from OpenAI's response
    return parseAnalysisResponse(analysisText);
  } catch (error) {
    console.error('Error analyzing color profile:', error);
    throw error;
  }
}

async function imageToBase64(uri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
}

// Helper function to parse OpenAI's text response
// In a real app, you would implement more robust parsing
function parseAnalysisResponse(text: string): AnalysisResult {
  // This is a simplified mock implementation
  // In a real app, you'd use more sophisticated NLP or prompt engineering
  // to get structured data from OpenAI
  
  // Mock result - in a real app, you'd parse this from the text
  return {
    season: text.includes('Summer') ? 'summer' : 
            text.includes('Spring') ? 'spring' : 
            text.includes('Autumn') ? 'autumn' : 'winter',
    undertone: text.toLowerCase().includes('warm') ? 'warm' : 'cool',
    contrast: text.toLowerCase().includes('high contrast') ? 'high' : 
              text.toLowerCase().includes('medium contrast') ? 'medium' : 'low',
    brightness: text.toLowerCase().includes('bright') ? 'bright' : 'muted',
    recommendations: {
      colors: ['#A1CEDC', '#8CADD3', '#9B90C2'],
      makeup: ['Rose blush', 'Cool-toned eyeshadows', 'Berry lipsticks'],
      clothing: ['Soft blues', 'Lavenders', 'Cool pinks']
    },
    explanation: text
  };
}
