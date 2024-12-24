import React from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import QualitySelector from './QualitySelector';
import SizeSelector from './SizeSelector';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onEnterPress: () => void;
  quality: number;
  setQuality: (quality: number) => void;
  imageSize: number;
  setImageSize: (size: number) => void;
  onValidSizeChange: (isValid: boolean) => void;
}

const PromptInput = ({ 
  prompt, 
  setPrompt, 
  isGenerating, 
  onEnterPress,
  quality,
  setQuality,
  imageSize,
  setImageSize,
  onValidSizeChange
}: PromptInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      onEnterPress();
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <div className="relative w-full max-w-xl">
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
      
      <div className="w-full flex flex-col items-center space-y-6">
        <QualitySelector quality={quality} setQuality={setQuality} />
        <SizeSelector 
          imageSize={imageSize} 
          setImageSize={setImageSize} 
          isGenerating={isGenerating}
          onValidSizeChange={onValidSizeChange}
        />
      </div>
    </div>
  );
};

export default PromptInput;