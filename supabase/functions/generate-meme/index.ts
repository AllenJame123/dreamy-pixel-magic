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
  /\b(touch(ing)?|embrace|hug(ging)?|cuddle|affection(ate)?)\b/i,
];

const validatePrompt = (prompt: string): boolean => {
  const lowerPrompt = prompt.toLowerCase();
  return !RESTRICTED_PATTERNS.some(pattern => pattern.test(lowerPrompt));
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, topText, bottomText } = await req.json();
    console.log('Generating meme with prompt:', prompt);

    if (!validatePrompt(prompt)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Your prompt contains inappropriate content'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'));

    // Use the faster FLUX model with optimized parameters
    const image = await hf.textToImage({
      inputs: prompt,
      model: 'black-forest-labs/FLUX.1-schnell',
      parameters: {
        num_inference_steps: 20,
        guidance_scale: 7.0,
      }
    });

    // Convert image to base64
    const arrayBuffer = await image.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    return new Response(
      JSON.stringify({ 
        success: true,
        image: `data:image/png;base64,${base64}`,
        topText,
        bottomText
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating meme:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to generate meme'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});