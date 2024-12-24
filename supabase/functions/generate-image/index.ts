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
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, guidance_scale, num_inference_steps, width, height } = await req.json()
    console.log('Received prompt:', prompt)
    console.log('Quality settings:', { guidance_scale, num_inference_steps })

    // Server-side content validation
    if (!validatePrompt(prompt)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Your prompt contains inappropriate content. Please provide a prompt suitable for children.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    if (!token) {
      console.error('HUGGING_FACE_ACCESS_TOKEN is not set')
      throw new Error('API configuration error. Please contact support.')
    }

    console.log('Initializing HuggingFace client...')
    const hf = new HfInference(token)

    console.log('Starting image generation...')
    const image = await hf.textToImage({
      inputs: prompt,
      model: 'black-forest-labs/FLUX.1-schnell',
      parameters: {
        guidance_scale,
        num_inference_steps,
        height: height || 512,
        width: width || 512,
      }
    })

    if (!image) {
      console.error('No image generated')
      throw new Error('Failed to generate image')
    }

    console.log('Image generated successfully')
    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    
    return new Response(
      JSON.stringify({ 
        success: true,
        image: `data:image/png;base64,${base64}` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-image function:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to generate image',
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  }
})