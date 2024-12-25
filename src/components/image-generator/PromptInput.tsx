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
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  onValidSizeChange: (isValid: boolean) => void;
}

const PromptInput = ({ 
  prompt, 
  setPrompt, 
  isGenerating, 
  onEnterPress,
  quality,
  setQuality,
  width,
  height,
  setWidth,
  setHeight,
  onValidSizeChange
}: PromptInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      onEnterPress();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="relative">
        <Input
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full h-14 pl-4 pr-12 text-lg bg-white/50 backdrop-blur-sm border-2 focus:border-primary"
          disabled={isGenerating}
        />
        <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="grid gap-8 w-full">
        <QualitySelector quality={quality} setQuality={setQuality} />
        <SizeSelector 
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
          isGenerating={isGenerating}
          onValidSizeChange={onValidSizeChange}
        />
      </div>
    </div>
  );
};

export default PromptInput;