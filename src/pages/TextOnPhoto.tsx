import { useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fabric } from "fabric";
import { toast } from "sonner";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import CanvasControls from "@/components/text-on-photo/CanvasControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const saveState = useCallback(() => {
    if (!canvas) return;
    setUndoStack(prev => [...prev, JSON.stringify(canvas)]);
    setRedoStack([]);
  }, [canvas]);

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
    toast.success("Text added successfully!");
  }, [canvas, saveState]);

  const handleCanvasInit = useCallback((fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
    fabricCanvas.on('object:modified', saveState);
    fabricCanvas.on('object:added', saveState);
  }, [saveState]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Online Image Text Editor</h1>
          
          <div className="space-y-4">
            <ImageUploader canvas={canvas} saveState={saveState} />

            <CanvasContainer 
              canvasRef={canvasRef}
              containerRef={containerRef}
              onCanvasInit={handleCanvasInit}
            />

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
              <CanvasControls
                canvas={canvas}
                undoStack={undoStack}
                redoStack={redoStack}
                setUndoStack={setUndoStack}
                setRedoStack={setRedoStack}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TextOnPhoto;