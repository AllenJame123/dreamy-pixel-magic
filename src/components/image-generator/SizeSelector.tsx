import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  isGenerating: boolean;
  onValidSizeChange: (isValid: boolean) => void;
}

const SizeSelector = ({ 
  width,
  height,
  setWidth,
  setHeight,
  isGenerating,
  onValidSizeChange 
}: SizeSelectorProps) => {
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  const validateDimension = (value: number): boolean => {
    return !isNaN(value) && value >= 128 && value <= 1200;
  };

  const handleSizeChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomSize(true);
    } else {
      setIsCustomSize(false);
      const size = Number(value);
      setWidth(size);
      setHeight(size);
      onValidSizeChange(true);
    }
  };

  const getCurrentSizeValue = (): string => {
    if (isCustomSize) return 'custom';
    if (width === height) return width.toString();
    return 'custom';
  };

  useEffect(() => {
    if (isCustomSize) {
      const isWidthValid = validateDimension(width);
      const isHeightValid = validateDimension(height);

      setWidthError(!isWidthValid);
      setHeightError(!isHeightValid);

      onValidSizeChange(isWidthValid && isHeightValid);
    }
  }, [width, height, isCustomSize, onValidSizeChange]);

  return (
    <div className="w-full">
      <Label className="text-lg font-medium mb-4 block">Image Size</Label>
      <div className="space-y-4">
        <Select
          value={getCurrentSizeValue()}
          onValueChange={handleSizeChange}
          disabled={isGenerating}
        >
          <SelectTrigger className="w-full bg-white/50 backdrop-blur-sm">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="512">512 × 512 pixels</SelectItem>
            <SelectItem value="768">768 × 768 pixels</SelectItem>
            <SelectItem value="1024">1024 × 1024 pixels</SelectItem>
            <SelectItem value="1200">1200 × 1200 pixels</SelectItem>
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
                  placeholder="128-1200"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min={128}
                  max={1200}
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
                  placeholder="128-1200"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={128}
                  max={1200}
                  className={cn(
                    "bg-white/50 backdrop-blur-sm",
                    heightError && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Enter dimensions between 128 and 1200 pixels
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SizeSelector;