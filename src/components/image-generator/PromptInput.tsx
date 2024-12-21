import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [customSize, setCustomSize] = useState('');
  const [isCustomSize, setIsCustomSize] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      onEnterPress();
    }
  };

  const handleSizeChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomSize(true);
    } else {
      setIsCustomSize(false);
      setImageSize(Number(value));
    }
  };

  const handleCustomSizeSubmit = () => {
    const size = Number(customSize);
    if (isNaN(size) || size < 128 || size > 1024) {
      toast.error('Please enter a valid size between 128 and 1024 pixels');
      return;
    }
    setImageSize(size);
    setIsCustomSize(false);
    toast.success(`Custom size set to ${size}x${size} pixels`);
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
          {!isCustomSize ? (
            <Select
              value={imageSize.toString()}
              onValueChange={handleSizeChange}
              disabled={isGenerating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256 × 256 pixels</SelectItem>
                <SelectItem value="512">512 × 512 pixels</SelectItem>
                <SelectItem value="768">768 × 768 pixels</SelectItem>
                <SelectItem value="custom">Custom size...</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter size in pixels (128-1024)"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                min={128}
                max={1024}
                className="flex-1"
              />
              <Button 
                onClick={handleCustomSizeSubmit}
                variant="secondary"
                type="button"
              >
                Set Size
              </Button>
              <Button 
                onClick={() => setIsCustomSize(false)}
                variant="ghost"
                type="button"
              >
                Cancel
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {isCustomSize 
              ? "Enter a custom size between 128 and 1024 pixels. The image will be square." 
              : "Larger sizes will take longer to generate"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;