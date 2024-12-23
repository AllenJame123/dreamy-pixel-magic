import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Zap, Scale, Stars } from "lucide-react";
import { cn } from "@/lib/utils";

interface QualitySelectorProps {
  quality: number;
  setQuality: (quality: number) => void;
}

const QualitySelector = ({ quality, setQuality }: QualitySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Image Quality</Label>
      <RadioGroup
        value={quality.toString()}
        onValueChange={(value) => setQuality(Number(value))}
        className="grid grid-cols-3 gap-4"
      >
        <Label
          htmlFor="quality-1"
          className={cn(
            "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent cursor-pointer",
            quality === 1 && "border-primary"
          )}
        >
          <RadioGroupItem value="1" id="quality-1" className="sr-only" />
          <Zap className="mb-2 h-6 w-6" />
          <div className="space-y-1 text-center">
            <p className="font-medium leading-none">Fast</p>
            <p className="text-xs text-muted-foreground">Quick results</p>
          </div>
        </Label>
        <Label
          htmlFor="quality-2"
          className={cn(
            "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent cursor-pointer",
            quality === 2 && "border-primary"
          )}
        >
          <RadioGroupItem value="2" id="quality-2" className="sr-only" />
          <Scale className="mb-2 h-6 w-6" />
          <div className="space-y-1 text-center">
            <p className="font-medium leading-none">Balanced</p>
            <p className="text-xs text-muted-foreground">Good quality</p>
          </div>
        </Label>
        <Label
          htmlFor="quality-3"
          className={cn(
            "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent cursor-pointer",
            quality === 3 && "border-primary"
          )}
        >
          <RadioGroupItem value="3" id="quality-3" className="sr-only" />
          <Stars className="mb-2 h-6 w-6" />
          <div className="space-y-1 text-center">
            <p className="font-medium leading-none">High Quality</p>
            <p className="text-xs text-muted-foreground">Best results</p>
          </div>
        </Label>
      </RadioGroup>
    </div>
  );
};

export default QualitySelector;