import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { AI_QUOTES } from './AIQuotes';
import { validatePrompt } from '@/utils/contentFilter';

interface GeneratedImage {
  imageURL: string;
  prompt: string;
}

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(AI_QUOTES[0]);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(1);
  const [imageSize, setImageSize] = useState(512);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isValidSize = (): boolean => {
    if (!width || !height) return true;
    return width >= 128 && width <= 1024 && height >= 128 && height <= 1024;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
    };
  }, []);

  const cleanupInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
      messageIntervalRef.current = null;
    }
  };

  const startLoadingMessages = () => {
    let index = 0;
    setLoadingMessage(AI_QUOTES[0]);
    
    messageIntervalRef.current = setInterval(() => {
      index = Math.floor(Math.random() * AI_QUOTES.length);
      setLoadingMessage(AI_QUOTES[index]);
    }, 5000);
  };

  const initializeProgress = () => {
    cleanupInterval();
    setTimer(0);
    setProgress(0);
    startLoadingMessages();
    
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTimer(elapsed);
      setProgress(Math.min(elapsed * 3.33, 100));
    }, 100);
  };

  const generateImage = async (userPrompt: string) => {
    // Validate prompt content before proceeding
    const validationResult = validatePrompt(userPrompt);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    try {
      const qualitySettings = {
        1: { guidance_scale: 3.0, num_inference_steps: 10 },
        2: { guidance_scale: 5.0, num_inference_steps: 15 },
        3: { guidance_scale: 7.5, num_inference_steps: 20 },
      }[quality];

      const { data, error: functionError } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: userPrompt,
          ...qualitySettings,
          width,
          height
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

      if (!data?.image) {
        console.error('No image data received');
        throw new Error('No image data received from the server. Please try again.');
      }

      return data.image;
    } catch (error) {
      console.error('Generation error:', error);
      throw new Error('Failed to generate image. Please try editing your prompt and try again.');
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    // Validate dimensions
    if (width < 128 || width > 1024 || height < 128 || height > 1024) {
      toast.error('Image dimensions must be between 128 and 1024 pixels');
      return;
    }

    setError(null);
    cleanupInterval();
    setIsGenerating(true);
    setProgress(0);
    setTimer(0);

    try {
      // Content validation
      const validationResult = validatePrompt(prompt);
      if (!validationResult.isValid) {
        throw new Error(validationResult.message);
      }

      initializeProgress();
      const imageUrl = await generateImage(prompt);
      
      cleanupInterval();
      
      setGeneratedImage({
        imageURL: imageUrl,
        prompt: prompt
      });
      
      toast.success('Image generated successfully!');
    } catch (error: any) {
      console.error('Generation error:', error);
      setError(error.message || 'Failed to generate image. Please try editing your prompt and try again.');
      toast.error(error.message || 'Failed to generate image');
    } finally {
      cleanupInterval();
      setIsGenerating(false);
      setProgress(100);
    }
  };

  const handleDownload = async (format: string = 'webp') => {
    if (!generatedImage?.imageURL) return;
    
    try {
      const response = await fetch(generatedImage.imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
      console.error('Download error:', error);
    }
  };

  return {
    prompt,
    setPrompt,
    isGenerating,
    generatedImage,
    timer,
    progress,
    loadingMessage,
    error,
    quality,
    setQuality,
    imageSize,
    setImageSize,
    width,
    setWidth,
    height,
    setHeight,
    handleGenerate,
    handleDownload,
    isValidSize: () => width >= 128 && width <= 1024 && height >= 128 && height <= 1024
  };
};