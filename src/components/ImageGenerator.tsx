import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { PenLine, Sliders, Sparkles } from "lucide-react";
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
    width,
    setWidth,
    height,
    setHeight,
    handleGenerate,
    handleDownload,
  } = useImageGeneration();

  const [isValidSize, setIsValidSize] = useState(true);

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Card className="p-6 glass-panel">
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              isGenerating={isGenerating}
              onEnterPress={handleGenerate}
              quality={quality}
              setQuality={setQuality}
              width={width}
              height={height}
              setWidth={setWidth}
              setHeight={setHeight}
              onValidSizeChange={setIsValidSize}
            />
            <div className="flex justify-center">
              <GenerateButton
                onClick={handleGenerate}
                isGenerating={isGenerating}
                disabled={isGenerating || !prompt.trim() || !isValidSize}
              />
            </div>
          </div>

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
        </div>
      </Card>

      {generatedImage && (
        <GeneratedImage
          imageURL={generatedImage.imageURL}
          prompt={generatedImage.prompt}
          onDownload={handleDownload}
        />
      )}

      <Card className="p-6 glass-panel space-y-6">
        <h2 className="text-2xl font-bold text-center">How It Works</h2>
        <ol className="space-y-6 text-lg">
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <PenLine className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 pt-2">
              <span className="font-bold text-primary">1.</span>
              <span><strong>Describe Your Image:</strong> Enter a detailed text description of the image you want to generate.</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sliders className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 pt-2">
              <span className="font-bold text-primary">2.</span>
              <span><strong>Select Quality and Size:</strong> Choose the quality (Fast, Balanced, High Quality) and the size (default: 512 x 512 pixels).</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 pt-2">
              <span className="font-bold text-primary">3.</span>
              <span><strong>Generate and Download:</strong> Click "Generate" to create your image and download it instantly.</span>
            </div>
          </li>
        </ol>
      </Card>

      <Card className="p-6 glass-panel">
        <SpecialFeatures />
      </Card>

      <FAQ />
    </div>
  );
};

export default ImageGenerator;
