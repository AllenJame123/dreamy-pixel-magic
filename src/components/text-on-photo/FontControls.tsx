import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./ColorPicker";
import { Bold, Italic, Underline } from "lucide-react";
import { fabric } from "fabric";

interface FontControlsProps {
  canvas: fabric.Canvas | null;
}

const FontControls = ({ canvas }: FontControlsProps) => {
  const fonts = [
    "Arial",
    "Times New Roman",
    "Roboto",
    "Helvetica",
    "Georgia",
    "Verdana",
    "Courier New"
  ];

  const handleFontChange = (value: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontFamily', value);
      canvas.renderAll();
    }
  };

  const handleFontSize = (value: number[]) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontSize', value[0]);
      canvas.renderAll();
    }
  };

  const handleColorChange = (color: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fill', color);
      canvas.renderAll();
    }
  };

  const toggleStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      switch (style) {
        case 'bold':
          activeObject.set('fontWeight', activeObject.fontWeight === 'bold' ? 'normal' : 'bold');
          break;
        case 'italic':
          activeObject.set('fontStyle', activeObject.fontStyle === 'italic' ? 'normal' : 'italic');
          break;
        case 'underline':
          activeObject.set('underline', !activeObject.underline);
          break;
      }
      canvas.renderAll();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Font Style</h3>
        <Select onValueChange={handleFontChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Font Size</h3>
        <Slider
          defaultValue={[40]}
          max={100}
          min={8}
          step={1}
          onValueChange={handleFontSize}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text Color</h3>
        <ColorPicker
          color="#000000"
          onChange={handleColorChange}
          allowTransparent
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text Style</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleStyle('bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleStyle('italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleStyle('underline')}
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FontControls;