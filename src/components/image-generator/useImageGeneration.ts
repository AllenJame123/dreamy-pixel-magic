import { useState } from 'react';
import { toast } from 'sonner';
import { useLoadingState } from './useLoadingState';
import { generateImage } from '@/services/imageGenerationService';

interface GeneratedImage {
  imageURL: string;
  prompt: string;
}

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(1);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  
  const {
    timer,
    progress,
    loadingMessage,
    initializeProgress,
    cleanupInterval,
    setProgress
  } = useLoadingState();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (width < 128 || width > 1200 || height < 128 || height > 1200) {
      toast.error('Image dimensions must be between 128 and 1200 pixels');
      return;
    }

    setError(null);
    setIsGenerating(true);
    
    try {
      initializeProgress();
      const imageUrl = await generateImage(prompt, { width, height }, quality);
      
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
    width,
    setWidth,
    height,
    setHeight,
    handleGenerate,
    handleDownload,
  };
};