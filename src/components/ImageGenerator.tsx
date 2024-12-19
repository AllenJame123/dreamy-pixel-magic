import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Sparkles, Type } from "lucide-react";
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneratedImage {
  imageURL: string;
  prompt: string;
}

interface TextStyle {
  content: string;
  position: string;
  font: string;
  color: string;
  size: string;
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

  const positions = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-center', label: 'Top Center' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'center-left', label: 'Center Left' },
    { value: 'center', label: 'Center' },
    { value: 'center-right', label: 'Center Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-center', label: 'Bottom Center' },
    { value: 'bottom-right', label: 'Bottom Right' },
  ];

  const fonts = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
  ];

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'x-large', label: 'Extra Large' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      setIsGenerating(true);
      const textDetails = textStyle.content ? 
        `Include the text "${textStyle.content}" in ${textStyle.size} size, using ${textStyle.font} font, in ${textStyle.color} color, positioned at the ${textStyle.position} of the image. Make sure the text is clear and readable.` 
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

            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Add text to include in the image..."
                  value={textStyle.content}
                  onChange={(e) => setTextStyle({ ...textStyle, content: e.target.value })}
                  className="glass-panel pr-12"
                  disabled={isGenerating}
                />
                <Type className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              {textStyle.content && (
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={textStyle.position}
                    onValueChange={(value) => setTextStyle({ ...textStyle, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos.value} value={pos.value}>
                          {pos.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={textStyle.font}
                    onValueChange={(value) => setTextStyle({ ...textStyle, font: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="color"
                    value={textStyle.color}
                    onChange={(e) => setTextStyle({ ...textStyle, color: e.target.value })}
                    className="h-10"
                  />

                  <Select
                    value={textStyle.size}
                    onValueChange={(value) => setTextStyle({ ...textStyle, size: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
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
          <Card className="p-6 glass-panel space-y-4 animate-image-fade">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <img
                src={generatedImage.imageURL}
                alt={generatedImage.prompt}
                className="w-full h-full object-cover"
              />
              <Button
                onClick={handleDownload}
                className="absolute bottom-4 right-4"
                variant="secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {generatedImage.prompt}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;