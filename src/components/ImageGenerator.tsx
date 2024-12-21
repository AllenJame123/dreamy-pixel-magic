import React from 'react';
import { Card } from "@/components/ui/card";
import { Image, Play, RefreshCw } from "lucide-react";
import GeneratedImage from './image-display/GeneratedImage';
import PromptInput from './image-generator/PromptInput';
import ProgressIndicator from './image-generator/ProgressIndicator';
import GenerateButton from './image-generator/GenerateButton';
import SpecialFeatures from './image-generator/SpecialFeatures';
import FAQ from './image-generator/FAQ';
import ErrorMessage from './image-generator/ErrorMessage';
import { useImageGeneration } from './image-generator/useImageGeneration';

const ImageGenerator = () => {
  const {
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
    handleGenerate,
    handleDownload
  } = useImageGeneration();

  return (
    <div className="p-4 flex flex-col items-center justify-start mt-4 space-y-6">
      <div className="w-full max-w-2xl space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">AI Image Generator</h1>
          <p className="text-xl text-muted-foreground">Create stunning AI-generated images in seconds</p>
          <p className="text-muted-foreground">Free to use • No signup required • Instant results</p>
        </div>

        <Card className="p-6 glass-panel space-y-4">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            isGenerating={isGenerating}
            onEnterPress={handleGenerate}
            quality={quality}
            setQuality={setQuality}
            imageSize={imageSize}
            setImageSize={setImageSize}
          />

          {isGenerating && (
            <p className="text-center text-muted-foreground animate-pulse">
              {loadingMessage}
            </p>
          )}

          {error && <ErrorMessage message={error} />}

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

        <Card className="p-6 glass-panel space-y-4">
          <div className="border-t pt-4">
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

          <SpecialFeatures />
        </Card>

        <FAQ />
      </div>
    </div>
  );
};

export default ImageGenerator;