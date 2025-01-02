import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="textInput"
          type="text"
          placeholder="Enter text"
          className="w-full"
        />

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

        <Input
          id="fontSize"
          type="number"
          defaultValue="20"
          placeholder="Font Size"
          className="w-full"
        />

        <Input
          id="fontColor"
          type="color"
          defaultValue="#000000"
          className="w-full h-10"
        />
      </div>

      <Button onClick={addText} className="w-full">
        Add Text
      </Button>
    </div>
  );
};