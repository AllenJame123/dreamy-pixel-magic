import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  imageSize: number;
  setImageSize: (size: number) => void;
  isGenerating: boolean;
  onValidSizeChange: (isValid: boolean) => void;
}

const SizeSelector = ({ imageSize, setImageSize, isGenerating, onValidSizeChange }: SizeSelectorProps) => {
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  const validateDimension = (value: number): boolean => {
    return !isNaN(value) && value >= 128 && value <= 1024;
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
      onValidSizeChange(true);
    }
  };

  useEffect(() => {
    if (isCustomSize) {
      const width = Number(customWidth);
      const height = Number(customHeight);

      const isWidthValid = validateDimension(width);
      const isHeightValid = validateDimension(height);

      setWidthError(!isWidthValid && customWidth !== '');
      setHeightError(!isHeightValid && customHeight !== '');

      if (isWidthValid && isHeightValid) {
        setImageSize(Math.max(width, height));
        onValidSizeChange(true);
      } else {
        onValidSizeChange(false);
      }
    }
  }, [customWidth, customHeight, isCustomSize, setImageSize, onValidSizeChange]);

  return (
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
  );
};

export default SizeSelector;