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

      onValidSizeChange(isWidthValid && isHeightValid);
      
      if (isWidthValid && isHeightValid) {
        setImageSize(Math.max(width, height));
      }
    }
  }, [customWidth, customHeight, isCustomSize, setImageSize, onValidSizeChange]);

  return (
    <div className="w-full">
      <Label className="text-lg font-medium mb-4 block">Image Size</Label>
      <div className="space-y-4">
        <Select
          value={isCustomSize ? 'custom' : imageSize.toString()}
          onValueChange={handleSizeChange}
          disabled={isGenerating}
        >
          <SelectTrigger className="w-full bg-white/50 backdrop-blur-sm">
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-center block mb-2">Width (px)</Label>
                <Input
                  type="number"
                  placeholder="128-1024"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  min={128}
                  max={1024}
                  className={cn(
                    "bg-white/50 backdrop-blur-sm",
                    widthError && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
              <div>
                <Label className="text-sm text-center block mb-2">Height (px)</Label>
                <Input
                  type="number"
                  placeholder="128-1024"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  min={128}
                  max={1024}
                  className={cn(
                    "bg-white/50 backdrop-blur-sm",
                    heightError && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Enter dimensions between 128 and 1024 pixels
            </p>
          </div>
        )}
        {!isCustomSize && (
          <p className="text-sm text-muted-foreground text-center">
            Larger sizes will take longer to generate
          </p>
        )}
      </div>
    </div>
  );
};

export default SizeSelector;