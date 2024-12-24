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
    <div className="w-full">
      <Label className="text-lg font-medium mb-4 block">Image Quality</Label>
      <RadioGroup
        value={quality.toString()}
        onValueChange={(value) => setQuality(Number(value))}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <Label
          htmlFor="quality-1"
          className={cn(
            "relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 transition-all",
            "hover:bg-primary/5",
            quality === 1 ? "border-primary bg-primary/5" : "border-border"
          )}
        >
          <RadioGroupItem value="1" id="quality-1" className="sr-only" />
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-medium">Fast</p>
            <p className="text-sm text-muted-foreground">Quick results</p>
          </div>
        </Label>
        <Label
          htmlFor="quality-2"
          className={cn(
            "relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 transition-all",
            "hover:bg-primary/5",
            quality === 2 ? "border-primary bg-primary/5" : "border-border"
          )}
        >
          <RadioGroupItem value="2" id="quality-2" className="sr-only" />
          <div className="text-center">
            <Scale className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-medium">Balanced</p>
            <p className="text-sm text-muted-foreground">Good quality</p>
          </div>
        </Label>
        <Label
          htmlFor="quality-3"
          className={cn(
            "relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 transition-all",
            "hover:bg-primary/5",
            quality === 3 ? "border-primary bg-primary/5" : "border-border"
          )}
        >
          <RadioGroupItem value="3" id="quality-3" className="sr-only" />
          <div className="text-center">
            <Stars className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-medium">High Quality</p>
            <p className="text-sm text-muted-foreground">Best results</p>
          </div>
        </Label>
      </RadioGroup>
    </div>
  );
};

export default QualitySelector;