import React from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onEnterPress: () => void;
  quality: number;
  setQuality: (quality: number) => void;
  imageSize: number;
  setImageSize: (size: number) => void;
}

const PromptInput = ({ 
  prompt, 
  setPrompt, 
  isGenerating, 
  onEnterPress,
  quality,
  setQuality,
  imageSize,
  setImageSize
}: PromptInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      onEnterPress();
    }
  };

  return (
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
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Image Quality</Label>
            <span className="text-sm text-muted-foreground">{quality === 1 ? 'Fast' : quality === 2 ? 'Balanced' : 'High Quality'}</span>
          </div>
          <Slider
            min={1}
            max={3}
            step={1}
            value={[quality]}
            onValueChange={(value) => setQuality(value[0])}
            disabled={isGenerating}
          />
          <p className="text-sm text-muted-foreground">Higher quality settings will take longer to generate</p>
        </div>

        <div className="space-y-2">
          <Label>Image Size</Label>
          <Select
            value={imageSize.toString()}
            onValueChange={(value) => setImageSize(Number(value))}
            disabled={isGenerating}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="256">256 x 256</SelectItem>
              <SelectItem value="512">512 x 512</SelectItem>
              <SelectItem value="768">768 x 768</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Larger sizes will take longer to generate</p>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;