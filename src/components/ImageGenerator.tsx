import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import GeneratedImage from './image-display/GeneratedImage';
import PromptInput from './image-generator/PromptInput';
import ProgressIndicator from './image-generator/ProgressIndicator';
import GenerateButton from './image-generator/GenerateButton';

interface GeneratedImage {
  imageURL: string;
  prompt: string;
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isGenerating) {
      intervalRef.current = setInterval(() => {
        setTimer(t => t + 0.1);
        setProgress(p => Math.min(p + 0.333, 100));
      }, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isGenerating]);

  const generateImage = async (userPrompt: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: userPrompt }
      });

      if (error) throw new Error(`Function error: ${error.message}`);
      if (!data?.success) throw new Error(data?.error || 'Failed to generate image');
      if (!data?.image) throw new Error('No image data received from the server');

      return data.image;
    } catch (error) {
      throw error;
    }
  };

  const resetState = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsGenerating(false);
    setProgress(0);
    setTimer(0);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      setIsGenerating(true);
      setTimer(0);
      setProgress(0);
      
      const imageUrl = await generateImage(prompt);
      
      setGeneratedImage({
        imageURL: imageUrl,
        prompt: prompt
      });
      
      const finalTime = timer;
      toast.success(`Image generated in ${finalTime.toFixed(1)} seconds!`);
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate image. Please try again.');
    } finally {
      resetState();
    }
  };

  const handleDownload = async () => {
    if (!generatedImage?.imageURL) return;
    
    try {
      const response = await fetch(generatedImage.imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
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

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">AI Image Generator</h1>
          <p className="text-muted-foreground">Transform your ideas into stunning visuals</p>
        </div>

        <Card className="p-6 glass-panel space-y-4">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            isGenerating={isGenerating}
            onEnterPress={handleGenerate}
          />

          <ProgressIndicator
            isGenerating={isGenerating}
            timer={timer}
            progress={progress}
          />

          <GenerateButton
            onClick={handleGenerate}
            isGenerating={isGenerating}
            disabled={isGenerating || !prompt.trim()}
          />
        </Card>

        {generatedImage && (
          <GeneratedImage
            imageURL={generatedImage.imageURL}
            prompt={generatedImage.prompt}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;