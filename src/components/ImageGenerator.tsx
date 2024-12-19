import React, { useState, useEffect } from 'react';
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
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setTimer(0);
    setProgress(0);
    const id = setInterval(() => {
      setTimer(prev => prev + 0.1);
      setProgress(prev => Math.min(prev + 0.333, 100));
    }, 100);
    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      setIsGenerating(false);
      stopTimer();
      setProgress(0);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to generate image');
      }

      if (!data?.image) {
        throw new Error('No image data received from the server');
      }

      setGeneratedImage({
        imageURL: data.image,
        prompt: prompt
      });
      toast.success(`Image generated in ${timer.toFixed(1)} seconds!`);
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate image. Please try again.');
    } finally {
      stopTimer();
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    setIsGenerating(true);
    startTimer();
    handleGenerateImage();
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