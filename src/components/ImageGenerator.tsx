import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Image, Play, RefreshCw } from "lucide-react";
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

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const cleanupInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const initializeProgress = () => {
    cleanupInterval();
    setTimer(0);
    setProgress(0);
    
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTimer(elapsed);
      setProgress(Math.min(elapsed * 3.33, 100));
    }, 100);
  };

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

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    cleanupInterval();
    setIsGenerating(true);
    setProgress(0);
    setTimer(0);

    try {
      initializeProgress();
      const imageUrl = await generateImage(prompt);
      const currentTime = timer;
      
      cleanupInterval();
      
      setGeneratedImage({
        imageURL: imageUrl,
        prompt: prompt
      });
      
      toast.success(`Image generated in ${currentTime.toFixed(1)} seconds!`);
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate image. Please try again.');
    } finally {
      cleanupInterval();
      setIsGenerating(false);
      setProgress(100);
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
    <div className="p-4 flex flex-col items-center justify-start mt-4 space-y-6">
      <div className="w-full max-w-2xl space-y-4">
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

          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-3 text-center">How to Use AI Image Generator</h2>
            <div className="grid grid-cols-3 gap-4 text-sm text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Image className="w-5 h-5 text-primary" />
                </div>
                <p>Enter a detailed description of the image you want to create</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <p>Click Generate or press Enter to start the creation process</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <p>Wait a few seconds while we generate your unique image</p>
              </div>
            </div>
          </div>
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