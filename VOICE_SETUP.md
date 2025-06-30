# Voice Setup Guide for KanjiMatch

This guide will help you configure high-quality voice synthesis to replace the robotic Web Speech API.

## Current Voice Quality Issues

The default Web Speech API has several limitations:
- **Robotic sound**: Very mechanical and unnatural
- **Poor Japanese pronunciation**: Often mispronounces words
- **Inconsistent quality**: Varies across browsers and devices
- **Limited voice options**: Depends on system voices

## Voice Provider Options

### 1. ElevenLabs (Recommended - Best Quality)

**Quality**: ⭐⭐⭐⭐⭐ (5/5)  
**Cost**: $0.30 per 1000 characters  
**Setup Time**: 5 minutes

ElevenLabs provides the most natural-sounding Japanese voices with excellent pronunciation.

#### Setup Steps:

1. **Create an account** at [ElevenLabs](https://elevenlabs.io/)
2. **Get your API key** from the profile settings
3. **Choose a Japanese voice** from the voice library (recommended: `21m00Tcm4TlvDq8ikWAM`)
4. **Add environment variables** to your `.env` file:

```env
REACT_APP_ELEVENLABS_API_KEY=your_api_key_here
REACT_APP_ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

### 2. Microsoft Azure Cognitive Services

**Quality**: ⭐⭐⭐⭐ (4/5)  
**Cost**: $0.16 per 1000 characters  
**Setup Time**: 10 minutes

Azure provides high-quality neural voices with good Japanese support.

#### Setup Steps:

1. **Create an Azure account** and get free credits
2. **Create a Speech Service** in Azure Portal
3. **Get your API key and region** from the resource
4. **Add environment variables**:

```env
REACT_APP_AZURE_SPEECH_KEY=your_azure_key_here
REACT_APP_AZURE_SPEECH_REGION=eastus
REACT_APP_AZURE_VOICE_NAME=ja-JP-NanamiNeural
```

### 3. Google Cloud Text-to-Speech

**Quality**: ⭐⭐⭐⭐ (4/5)  
**Cost**: $0.16 per 1000 characters  
**Setup Time**: 15 minutes

Google's neural voices provide excellent quality with good Japanese pronunciation.

#### Setup Steps:

1. **Create a Google Cloud account** and enable billing
2. **Enable the Text-to-Speech API**
3. **Create a service account** and download the JSON key
4. **Add environment variables**:

```env
REACT_APP_GOOGLE_TTS_API_KEY=your_google_api_key_here
REACT_APP_GOOGLE_VOICE_NAME=ja-JP-Neural2-A
```

### 4. Amazon Polly

**Quality**: ⭐⭐⭐ (3/5)  
**Cost**: $0.16 per 1000 characters  
**Setup Time**: 15 minutes

Amazon Polly provides good quality voices with neural engine support.

#### Setup Steps:

1. **Create an AWS account**
2. **Create an IAM user** with Polly permissions
3. **Get access key and secret**
4. **Add environment variables**:

```env
REACT_APP_AWS_ACCESS_KEY_ID=your_access_key
REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_key
REACT_APP_AWS_REGION=us-east-1
REACT_APP_POLLY_VOICE_ID=Mizuki
```

## Environment Variables Reference

Create a `.env` file in your project root with the variables for your chosen provider:

```env
# ElevenLabs (Recommended)
REACT_APP_ELEVENLABS_API_KEY=your_api_key_here
REACT_APP_ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# OR Azure Cognitive Services
REACT_APP_AZURE_SPEECH_KEY=your_azure_key_here
REACT_APP_AZURE_SPEECH_REGION=eastus
REACT_APP_AZURE_VOICE_NAME=ja-JP-NanamiNeural

# OR Google Cloud TTS
REACT_APP_GOOGLE_TTS_API_KEY=your_google_api_key_here
REACT_APP_GOOGLE_VOICE_NAME=ja-JP-Neural2-A

# OR Amazon Polly
REACT_APP_AWS_ACCESS_KEY_ID=your_access_key
REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_key
REACT_APP_AWS_REGION=us-east-1
REACT_APP_POLLY_VOICE_ID=Mizuki
```

## Provider Priority

The system will automatically choose the best available provider in this order:
1. ElevenLabs (if configured)
2. Azure Cognitive Services (if configured)
3. Google Cloud TTS (if configured)
4. Amazon Polly (if configured)
5. Web Speech API (fallback)

## Cost Estimation

For a typical learning session with 50 Japanese words:
- **ElevenLabs**: ~$0.15 per session
- **Azure/Google/Polly**: ~$0.08 per session
- **Web Speech API**: Free

## Testing Your Setup

1. **Restart your development server** after adding environment variables
2. **Check the console** for voice provider initialization messages
3. **Test with a simple Japanese word** like "こんにちは" (konnichiwa)
4. **Listen for improved quality** - should sound much more natural

## Troubleshooting

### Common Issues:

1. **"Voice service failed" errors**:
   - Check your API keys are correct
   - Verify your account has sufficient credits
   - Check network connectivity

2. **Still using Web Speech API**:
   - Ensure environment variables are set correctly
   - Restart the development server
   - Check browser console for configuration errors

3. **Audio not playing**:
   - Check browser autoplay policies
   - Ensure audio permissions are granted
   - Try refreshing the page

### Debug Information:

The app will log the current voice provider in the console. You can also check:
- `currentProvider` in the AudioContext
- `availableProviders` for a list of configured services

## Performance Tips

1. **Cache audio responses** for frequently used words
2. **Use shorter text** for better performance
3. **Implement rate limiting** to avoid API quota issues
4. **Consider offline voice models** for critical functionality

## Security Notes

- **Never commit API keys** to version control
- **Use environment variables** for all sensitive data
- **Implement proper CORS** for production deployments
- **Monitor API usage** to prevent unexpected charges

## Next Steps

After setting up a voice provider:

1. **Test with various Japanese words** to ensure quality
2. **Monitor your usage** and costs
3. **Consider implementing audio caching** for better performance
4. **Add voice selection UI** if you want users to choose different voices

The improved voice quality will significantly enhance the learning experience for your users! 