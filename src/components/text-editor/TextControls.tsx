import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fabric } from "fabric";

interface TextControlsProps {
  canvas: fabric.Canvas | null;
  saveState: () => void;
}

export const TextControls = ({ canvas, saveState }: TextControlsProps) => {
  const addText = () => {
    if (!canvas) return;

    const text = (document.getElementById('textInput') as HTMLInputElement)?.value;
    const font = (document.getElementById('fontSelect') as HTMLSelectElement)?.value;
    const size = parseInt((document.getElementById('fontSize') as HTMLInputElement)?.value || "20", 10);
    const color = (document.getElementById('fontColor') as HTMLInputElement)?.value;

    const textBox = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fontFamily: font,
      fontSize: size,
      fill: color,
      editable: true,
    });

    canvas.add(textBox);
    canvas.setActiveObject(textBox);
    saveState();
  };

  const toggleStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject() as fabric.Textbox;
    if (!activeObject || activeObject.type !== 'textbox') return;

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
    saveState();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="textInput">Text</Label>
        <Input id="textInput" placeholder="Enter text" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontSelect">Font Style</Label>
        <select 
          id="fontSelect" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size</Label>
        <Input 
          type="number" 
          id="fontSize" 
          placeholder="Font Size" 
          defaultValue="20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontColor">Font Color</Label>
        <Input 
          type="color" 
          id="fontColor" 
          defaultValue="#000000"
        />
      </div>

      <div className="flex flex-wrap gap-2 col-span-full">
        <Button onClick={() => toggleStyle('bold')}>Bold</Button>
        <Button onClick={() => toggleStyle('italic')}>Italic</Button>
        <Button onClick={() => toggleStyle('underline')}>Underline</Button>
        <Button onClick={addText}>Add Text</Button>
      </div>
    </div>
  );
};