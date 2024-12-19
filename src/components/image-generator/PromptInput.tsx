import React from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onEnterPress: () => void;
}

const PromptInput = ({ prompt, setPrompt, isGenerating, onEnterPress }: PromptInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      onEnterPress();
    }
  };

  return (
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
  );
};

export default PromptInput;