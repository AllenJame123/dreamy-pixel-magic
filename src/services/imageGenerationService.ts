import { supabase } from "@/integrations/supabase/client";
import { validatePrompt } from '@/utils/contentFilter';
import { rateLimiter } from '@/utils/rateLimiting';
import { toast } from 'sonner';

interface ImageDimensions {
  width: number;
  height: number;
}

interface QualitySettings {
  guidance_scale: number;
  num_inference_steps: number;
}

const QUALITY_SETTINGS: Record<number, QualitySettings> = {
  1: { guidance_scale: 3.0, num_inference_steps: 8 },  // Faster
  2: { guidance_scale: 4.0, num_inference_steps: 12 }, // Balanced
  3: { guidance_scale: 5.0, num_inference_steps: 15 }, // High Quality
};

export const generateImage = async (
  prompt: string,
  dimensions: ImageDimensions,
  quality: number
): Promise<string> => {
  if (!rateLimiter.canMakeRequest()) {
    const waitTime = Math.ceil(rateLimiter.getTimeUntilNextAvailable() / 1000);
    throw new Error(
      `Rate limit reached. Please wait ${waitTime} seconds before generating another image.`
    );
  }

  const validationResult = validatePrompt(prompt);
  if (!validationResult.isValid) {
    throw new Error(validationResult.message);
  }

  try {
    const qualitySettings = QUALITY_SETTINGS[quality];
    
    const { data, error: functionError } = await supabase.functions.invoke('generate-image', {
      body: { 
        prompt,
        ...qualitySettings,
        width: dimensions.width,
        height: dimensions.height
      }
    });

    if (functionError) {
      console.error('Function error:', functionError);
      throw new Error(`Failed to generate image: ${functionError.message}`);
    }

    if (!data?.success) {
      console.error('Generation failed:', data?.error);
      throw new Error(data?.error || 'Failed to generate image. Please try a different prompt.');
    }

    rateLimiter.addRequest();
    return data.image;
  } catch (error: any) {
    console.error('Generation error:', error);
    throw error;
  }
};