import { useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { fabric } from "fabric";
import { toast } from "sonner";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // Initialize canvas on component mount
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      preserveObjectStacking: true
    });
    
    setCanvas(fabricCanvas);
    
    // Save state on mouse down
    fabricCanvas.on('mouse:down', () => {
      saveState();
    });
  }, []);

  const saveState = useCallback(() => {
    if (!canvas) return;
    setUndoStack(prev => [...prev, JSON.stringify(canvas)]);
    setRedoStack([]);
  }, [canvas]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      fabric.Image.fromURL(e.target.result.toString(), (img) => {
        if (!img) {
          toast.error("Failed to load image");
          return;
        }

        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
          selectable: false
        });
        
        saveState();
        toast.success("Image uploaded successfully");
      });
    };
    reader.readAsDataURL(file);
  }, [canvas, saveState]);

  const handleAddText = useCallback(() => {
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
    saveState();
  }, [canvas, saveState]);

  const handleUndo = useCallback(() => {
    if (!canvas || undoStack.length === 0) return;
    
    setRedoStack(prev => [...prev, JSON.stringify(canvas)]);
    const state = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
  }, [canvas, undoStack]);

  const handleRedo = useCallback(() => {
    if (!canvas || redoStack.length === 0) return;
    
    setUndoStack(prev => [...prev, JSON.stringify(canvas)]);
    const state = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
  }, [canvas, redoStack]);

  const handleDownload = useCallback(() => {
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    // Fix: Pass an object with format property
    link.href = canvas.toDataURL({ format: 'png' });
    link.click();
  }, [canvas]);

  // Initialize canvas on mount
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Online Image Text Editor</h1>
          
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />

            <canvas ref={canvasRef} className="border border-gray-200 rounded-lg w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="textInput"
                type="text"
                placeholder="Enter text"
                className="w-full"
              />
              
              <select
                id="fontSelect"
                className="w-full border rounded-md p-2"
              >
                <option value="Arial">Arial</option>
                <option value="Courier New">Courier New</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>

              <Input
                id="fontSize"
                type="number"
                placeholder="Font Size"
                defaultValue="20"
                className="w-full"
              />

              <Input
                id="fontColor"
                type="color"
                defaultValue="#000000"
                className="w-full h-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleAddText}>Add Text</Button>
              <Button onClick={handleUndo} variant="outline">Undo</Button>
              <Button onClick={handleRedo} variant="outline">Redo</Button>
              <Button onClick={handleDownload} variant="secondary">Download Image</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TextOnPhoto;