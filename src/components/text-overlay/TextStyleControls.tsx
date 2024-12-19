import React from 'react';
import { Input } from "@/components/ui/input";
import { Type } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export interface TextStyle {
  content: string;
  position: string;
  font: string;
  color: string;
  size: string;
}

interface TextStyleControlsProps {
  textStyle: TextStyle;
  onTextStyleChange: (newStyle: TextStyle) => void;
  isGenerating: boolean;
}

const positions = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'center-left', label: 'Center Left' },
  { value: 'center', label: 'Center' },
  { value: 'center-right', label: 'Center Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
];

const fonts = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
];

const sizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'x-large', label: 'Extra Large' },
];

const TextStyleControls = ({ textStyle, onTextStyleChange, isGenerating }: TextStyleControlsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Text Overlay Settings</h3>
      <div className="relative">
        <Input
          placeholder="Add text to include in the image..."
          value={textStyle.content}
          onChange={(e) => onTextStyleChange({ ...textStyle, content: e.target.value })}
          className="glass-panel pr-12"
          disabled={isGenerating}
        />
        <Type className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>

      {textStyle.content && (
        <Card className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={textStyle.position}
              onValueChange={(value) => onTextStyleChange({ ...textStyle, position: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((pos) => (
                  <SelectItem key={pos.value} value={pos.value}>
                    {pos.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={textStyle.font}
              onValueChange={(value) => onTextStyleChange({ ...textStyle, font: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-col space-y-2">
              <label className="text-sm">Text Color</label>
              <Input
                type="color"
                value={textStyle.color}
                onChange={(e) => onTextStyleChange({ ...textStyle, color: e.target.value })}
                className="h-10"
              />
            </div>

            <Select
              value={textStyle.size}
              onValueChange={(value) => onTextStyleChange({ ...textStyle, size: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TextStyleControls;