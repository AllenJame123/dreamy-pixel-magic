import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      onEnterPress();
    }
  };

  const handleSizeChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomSize(true);
      if (!customWidth && !customHeight) {
        setCustomWidth('512');
        setCustomHeight('512');
      }
    } else {
      setIsCustomSize(false);
      const size = Number(value);
      setImageSize(size);
    }
  };

  const validateDimension = (value: number): boolean => {
    return !isNaN(value) && value >= 128 && value <= 1024;
  };

  useEffect(() => {
    if (isCustomSize) {
      const width = Number(customWidth);
      const height = Number(customHeight);

      setWidthError(!validateDimension(width) && customWidth !== '');
      setHeightError(!validateDimension(height) && customHeight !== '');

      if (validateDimension(width) && validateDimension(height)) {
        setImageSize(Math.max(width, height));
      }
    }
  }, [customWidth, customHeight, isCustomSize, setImageSize]);

  const qualityLabels = {
    1: 'Fast',
    2: 'Balanced',
    3: 'High Quality'
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
            <span className="text-sm text-muted-foreground">
              {qualityLabels[quality as keyof typeof qualityLabels]}
            </span>
          </div>
          <div className="relative pt-6">
            <Slider
              min={1}
              max={3}
              step={1}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
              disabled={isGenerating}
              className="z-10"
            />
            <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
              <span className={cn("transition-colors", quality === 1 && "text-primary font-medium")}>Fast</span>
              <span className={cn("transition-colors", quality === 2 && "text-primary font-medium")}>Balanced</span>
              <span className={cn("transition-colors", quality === 3 && "text-primary font-medium")}>High Quality</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Higher quality settings will take longer to generate</p>
        </div>

        <div className="space-y-2">
          <Label>Image Size</Label>
          <Select
            value={isCustomSize ? 'custom' : imageSize.toString()}
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

          {isCustomSize && (
            <div className="space-y-2 mt-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    placeholder="Width (128-1024)"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    min={128}
                    max={1024}
                    className={cn(widthError && "border-red-500 focus-visible:ring-red-500")}
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Height (px)</Label>
                  <Input
                    type="number"
                    placeholder="Height (128-1024)"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    min={128}
                    max={1024}
                    className={cn(heightError && "border-red-500 focus-visible:ring-red-500")}
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