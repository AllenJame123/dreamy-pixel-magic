import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fabric } from "fabric";
import { toast } from "sonner";

interface TextControlsProps {
  canvas: fabric.Canvas | null;
  selectedFont: string;
  onFontChange: (value: string) => void;
  saveState: () => void;
}

export const TextControls = ({ canvas, selectedFont, onFontChange, saveState }: TextControlsProps) => {
  const addText = () => {
    if (!canvas) return;

    const text = (document.getElementById('textInput') as HTMLInputElement).value;
    const size = parseInt((document.getElementById('fontSize') as HTMLInputElement).value, 10);
    const color = (document.getElementById('fontColor') as HTMLInputElement).value;

    const textBox = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fontFamily: selectedFont,
      fontSize: size,
      fill: color,
      editable: true,
    });

    canvas.add(textBox);
    canvas.setActiveObject(textBox);
    saveState();
    toast.success("Text added successfully!");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="textInput">Text</Label>
          <Input
            id="textInput"
            type="text"
            placeholder="Enter text"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontSelect">Font Style</Label>
          <Select value={selectedFont} onValueChange={onFontChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontSize">Font Size</Label>
          <Input
            id="fontSize"
            type="number"
            defaultValue="20"
            min="8"
            max="200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontColor">Font Color</Label>
          <Input
            id="fontColor"
            type="color"
            defaultValue="#000000"
            className="h-10 p-1"
          />
        </div>
      </div>

      <Button onClick={addText} className="w-full">
        Add Text
      </Button>
    </div>
  );
};