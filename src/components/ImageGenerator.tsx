import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Sparkles } from "lucide-react";
import { RunwareService, GeneratedImage } from '@/services/RunwareService';
import { toast } from 'sonner';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [runwareService, setRunwareService] = useState<RunwareService | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (!apiKey.trim()) {
      toast.error('Please enter your Runware API key');
      return;
    }

    try {
      setIsGenerating(true);
      let service = runwareService;
      
      if (!service) {
        service = new RunwareService(apiKey);
        setRunwareService(service);
      }

      const result = await service.generateImage({ positivePrompt: prompt });
      setGeneratedImage(result);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
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
      a.download = `generated-image-${Date.now()}.webp`;
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
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Runware API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="glass-panel"
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a
                href="https://runware.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Runware.ai
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="glass-panel pr-12"
                disabled={isGenerating}
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim() || !apiKey.trim()}
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
                alt={generatedImage.positivePrompt}
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
              {generatedImage.positivePrompt}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;