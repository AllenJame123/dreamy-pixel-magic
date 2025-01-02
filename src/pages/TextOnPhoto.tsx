import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { TextControls } from "@/components/text-editor/TextControls";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);

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

  return (
    <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Online Image Text Editor</h1>
      
      <div className="w-full max-w-sm">
        <Button 
          variant="default" 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
          onClick={() => document.getElementById('imageUpload')?.click()}
        >
          Choose Image
        </Button>
        <input 
          id="imageUpload"
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <canvas ref={canvasRef} className="border border-gray-200 rounded-lg max-w-full" />

      <TextControls canvas={canvas} saveState={saveState} />

      <div className="flex gap-2 mt-4">
        <Button onClick={undo} variant="outline">Undo</Button>
        <Button onClick={downloadImage} variant="default" className="bg-green-600 hover:bg-green-700">
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default TextOnPhoto;