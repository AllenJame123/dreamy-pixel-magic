import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      preserveObjectStacking: true
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const saveState = () => {
    if (!canvas) return;
    setUndoStack(prev => [...prev, JSON.stringify(canvas)]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !event.target.files?.[0]) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return;

      fabric.Image.fromURL(e.target.result.toString(), (img) => {
        img.set({
          selectable: false,
        });
        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        });
        saveState();
      });
    };
    reader.readAsDataURL(file);
  };

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

  const undo = () => {
    if (!canvas || undoStack.length === 0) return;
    const state = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
  };

  const downloadImage = () => {
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL({ format: 'png' });
    link.click();
  };

  useEffect(() => {
    if (!canvas) return;
    canvas.on('mouse:down', saveState);
  }, [canvas]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Online Image Text Editor</h1>
      
      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button 
          onClick={triggerFileInput}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 text-lg"
        >
          Choose an Image
        </Button>
      </div>

      <canvas ref={canvasRef} className="border border-gray-200 rounded-lg max-w-full" />

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
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={() => toggleStyle('bold')}>Bold</Button>
        <Button onClick={() => toggleStyle('italic')}>Italic</Button>
        <Button onClick={() => toggleStyle('underline')}>Underline</Button>
        <Button onClick={addText}>Add Text</Button>
        <Button onClick={undo} variant="outline">Undo</Button>
        <Button onClick={downloadImage} variant="default" className="bg-green-600 hover:bg-green-700">
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default TextOnPhoto;