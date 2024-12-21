import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [isCustomSize, setIsCustomSize] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      onEnterPress();
    }
  };

  const handleSizeChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomSize(true);
      setCustomWidth('');
      setCustomHeight('');
    } else {
      setIsCustomSize(false);
      const size = Number(value);
      setImageSize(size);
      setCustomWidth(size.toString());
      setCustomHeight(size.toString());
    }
  };

  const validateDimension = (value: number): boolean => {
    return !isNaN(value) && value >= 128 && value <= 1024;
  };

  useEffect(() => {
    if (isCustomSize) {
      const width = Number(customWidth);
      const height = Number(customHeight);

      if (validateDimension(width) && validateDimension(height)) {
        setImageSize(Math.max(width, height));
      }
    }
  }, [customWidth, customHeight, isCustomSize, setImageSize]);

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
            <span className="text-sm text-muted-foreground">
              {quality === 1 ? 'Fast' : quality === 2 ? 'Balanced' : 'High Quality'}
            </span>
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
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    placeholder="Width (128-1024)"
                    value={customWidth}
                    onChange={(e) => {
                      setCustomWidth(e.target.value);
                      if (!validateDimension(Number(e.target.value))) {
                        toast.error('Width must be between 128 and 1024 pixels');
                      }
                    }}
                    min={128}
                    max={1024}
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Height (px)</Label>
                  <Input
                    type="number"
                    placeholder="Height (128-1024)"
                    value={customHeight}
                    onChange={(e) => {
                      setCustomHeight(e.target.value);
                      if (!validateDimension(Number(e.target.value))) {
                        toast.error('Height must be between 128 and 1024 pixels');
                      }
                    }}
                    min={128}
                    max={1024}
                  />
                </div>
              </div>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {isCustomSize 
              ? "Enter dimensions between 128 and 1024 pixels" 
              : "Larger sizes will take longer to generate"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;