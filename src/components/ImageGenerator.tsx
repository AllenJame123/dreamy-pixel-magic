import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
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
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">AI Image Generator</h1>
        <p className="text-xl text-muted-foreground">Create stunning AI-generated images in seconds</p>
      </div>

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

      <Card className="p-6 glass-panel">
        <SpecialFeatures />
      </Card>

      <FAQ />
    </div>
  );
};

export default ImageGenerator;