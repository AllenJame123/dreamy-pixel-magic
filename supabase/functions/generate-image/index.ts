import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    console.log('Received prompt:', prompt)

    const token = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    if (!token) {
      console.error('HUGGING_FACE_ACCESS_TOKEN is not set')
      throw new Error('API configuration error. Please contact support.')
    }

    console.log('Initializing HuggingFace client...')
    const hf = new HfInference(token)

    console.log('Starting image generation with prompt:', prompt)
    const image = await hf.textToImage({
      inputs: prompt,
      model: 'black-forest-labs/FLUX.1-schnell', // Using a faster model
      parameters: {
        guidance_scale: 7.5,
        num_inference_steps: 20, // Reduced from default for faster generation
      }
    })
    console.log('Image generation completed successfully')

    // Convert the blob to a base64 string
    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    console.log('Image converted to base64')

    return new Response(
      JSON.stringify({ 
        success: true,
        image: `data:image/png;base64,${base64}` 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error in generate-image function:', error)
    
    const errorMessage = error.message?.includes('API configuration') 
      ? error.message 
      : 'Failed to generate image. Please try again.'

    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        details: error.message,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Return 200 even for errors to handle them gracefully
      }
    )
  }
})