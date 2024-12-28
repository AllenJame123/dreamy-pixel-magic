import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      throw new Error('Method not allowed')
    }

    const { prompt } = await req.json()
    console.log('Received prompt:', prompt)

    if (!prompt) {
      throw new Error('Prompt is required')
    }

    // Validate HuggingFace token
    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    if (!hfToken) {
      console.error('HuggingFace token not found')
      throw new Error('Configuration error')
    }

    console.log('Initializing HuggingFace client...')
    const hf = new HfInference(hfToken)

    console.log('Starting image generation...')
    const image = await hf.textToImage({
      inputs: `Create a minimalist logo design: ${prompt}`,
      model: 'stabilityai/stable-diffusion-2-1',
      parameters: {
        num_inference_steps: 30,
        guidance_scale: 7.5,
        width: 512,
        height: 512,
      }
    })

    if (!image) {
      throw new Error('Failed to generate image')
    }

    console.log('Image generated successfully, converting to base64...')
    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    console.log('Sending response...')
    return new Response(
      JSON.stringify({ 
        success: true,
        image: `data:image/png;base64,${base64}` 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
        } 
      }
    )
  } catch (error) {
    console.error('Error in generate-logo function:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Failed to generate logo', 
        details: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }, 
        status: 500 
      }
    )
  }
})