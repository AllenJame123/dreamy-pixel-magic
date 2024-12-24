import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Content filtering patterns for backend validation
const RESTRICTED_PATTERNS = [
  /\b(nude|naked|sex|porn|xxx|adult|explicit)\b/i,
  /\b(genitalia|breasts?|nipples?)\b/i,
  /\b(intercourse|fornication|erotic)\b/i,
  /\b(n[u4]d[e3]|s[e3]x[y]?|p[o0]rn)\b/i,
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

    // Validate prompt content
    if (!validatePrompt(prompt)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Your prompt violates our content guidelines. Please provide a prompt suitable for all audiences.'
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