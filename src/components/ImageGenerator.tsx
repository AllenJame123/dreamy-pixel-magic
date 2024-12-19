import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import TextStyleControls, { TextStyle } from './text-overlay/TextStyleControls';
import GeneratedImage from './image-display/GeneratedImage';

interface GeneratedImage {
  imageURL: string;
  prompt: string;
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [textStyle, setTextStyle] = useState<TextStyle>({
    content: '',
    position: 'center',
    font: 'Arial',
    color: '#000000',
    size: 'medium'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      setIsGenerating(true);
      const textDetails = textStyle.content ? 
        `The image MUST include the exact text "${textStyle.content}" in ${textStyle.size} size, using ${textStyle.font} font, in ${textStyle.color} color, positioned at the ${textStyle.position} of the image. The text must be clearly visible and exactly match these specifications.` 
        : '';
      const finalPrompt = textStyle.content ? `${prompt}. ${textDetails}` : prompt;

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: finalPrompt }
      });

      if (error) throw error;

      if (data?.image) {
        setGeneratedImage({
          imageURL: data.image,
          prompt: finalPrompt
        });
        toast.success('Image generated successfully!');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
      // Reset the form after generation
      setPrompt('');
      setTextStyle({
        content: '',
        position: 'center',
        font: 'Arial',
        color: '#000000',
        size: 'medium'
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      handleGenerate();
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
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                className="glass-panel pr-12"
                disabled={isGenerating}
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <TextStyleControls
              textStyle={textStyle}
              onTextStyleChange={setTextStyle}
              isGenerating={isGenerating}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </Button>
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