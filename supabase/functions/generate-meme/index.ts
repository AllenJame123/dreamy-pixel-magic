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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    // Validate prompt
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
      )
    }

    // Initialize Hugging Face with access token
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))

    // Generate image using Stable Diffusion
    const image = await hf.textToImage({
      inputs: prompt,
      model: "stabilityai/stable-diffusion-2",
      parameters: {
        negative_prompt: "nsfw, nude, naked, sexual, explicit content, inappropriate, adult content",
        num_inference_steps: 30,
        guidance_scale: 7.5,
      }
    })

    // Convert image to base64
    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    const imageUrl = `data:image/jpeg;base64,${base64}`

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl: imageUrl
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to generate image. Please try again with a different prompt.' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})