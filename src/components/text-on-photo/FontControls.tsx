import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "./ColorPicker";
import { fabric } from "fabric";

interface FontControlsProps {
  canvas: fabric.Canvas | null;
  selectedFont: string;
  onFontChange: (value: string) => void;
}

const FontControls = ({ canvas, selectedFont, onFontChange }: FontControlsProps) => {
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontSize', parseInt(event.target.value, 10));
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size</Label>
        <Input
          id="fontSize"
          type="number"
          defaultValue="40"
          min="8"
          max="200"
          onChange={handleFontSizeChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontFamily">Font Family</Label>
        <Select value={selectedFont} onValueChange={onFontChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Courier New">Courier New</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Text Color</Label>
        <ColorPicker
          color="#000000"
          onChange={handleColorChange}
          allowTransparent={false}
        />
      </div>
    </div>
  );
};

export default FontControls;