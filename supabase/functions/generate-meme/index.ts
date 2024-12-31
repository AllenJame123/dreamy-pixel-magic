import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Server-side content filtering patterns
const RESTRICTED_PATTERNS = [
  /\b(nude|naked|sex|porn|xxx|adult|explicit)\b/i,
  /\b(kiss(ing)?|love\s?making|dating|relationship|intimate|romance|romantic)\b/i,
  /\b(genitalia|breasts?|nipples?|body\s?parts)\b/i,
  /\b(intercourse|fornication|erotic|sensual|seductive)\b/i,
  /\b(n[u4]d[e3]|s[e3]x[y]?|p[o0]rn|k[i1]ss)\b/i,
];

const validatePrompt = (prompt: string): boolean => {
  return !RESTRICTED_PATTERNS.some(pattern => pattern.test(prompt));
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, model = "stabilityai/stable-diffusion-2" } = await req.json();
    console.log('Received prompt:', prompt);
    console.log('Using model:', model);

    // Server-side content validation
    if (!validatePrompt(prompt)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Your prompt contains inappropriate content. Please provide a family-friendly prompt.'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    const token = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!token) {
      throw new Error('API configuration error. Please contact support.');
    }

    console.log('Initializing HuggingFace client...');
    const hf = new HfInference(token);

    console.log('Starting image generation...');
    const image = await hf.textToImage({
      inputs: prompt,
      model: model,
      parameters: {
        negative_prompt: "nsfw, nude, naked, sexual, explicit content, inappropriate, adult content",
        num_inference_steps: 20,
        guidance_scale: 7.5,
      }
    });

    if (!image) {
      throw new Error('Failed to generate image');
    }

    console.log('Image generated successfully');
    const arrayBuffer = await image.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    
    return new Response(
      JSON.stringify({ 
        success: true,
        imageUrl: `data:image/jpeg;base64,${base64}` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in generate-meme function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to generate meme. Please try again.' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});