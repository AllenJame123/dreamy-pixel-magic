import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Sparkles } from "lucide-react";
import { toast } from 'sonner';
import { pipeline } from '@huggingface/transformers';

interface GeneratedImage {
  imageURL: string;
  prompt: string;
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [model, setModel] = useState<any>(null);

  const initializeModel = async () => {
    try {
      const pipe = await pipeline(
        'text-to-image',
        'stabilityai/stable-diffusion-2-1-base',
        { device: 'webgpu' }
      );
      setModel(pipe);
      toast.success('Model loaded successfully!');
    } catch (error) {
      console.error('Model initialization error:', error);
      toast.error('Failed to load the model. Please ensure your browser supports WebGPU.');
    }
  };

  React.useEffect(() => {
    initializeModel();
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (!model) {
      toast.error('Model is not ready yet. Please wait.');
      return;
    }

    try {
      setIsGenerating(true);
      const result = await model(prompt);
      
      // Convert the generated image tensor to a blob URL
      const blob = new Blob([result], { type: 'image/png' });
      const imageURL = URL.createObjectURL(blob);
      
      setGeneratedImage({
        imageURL,
        prompt: prompt
      });
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
          <p className="text-muted-foreground">Transform your ideas into stunning visuals - Runs in your browser!</p>
        </div>

        <Card className="p-6 glass-panel space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="glass-panel pr-12"
                disabled={isGenerating || !model}
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim() || !model}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : !model ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Model...
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