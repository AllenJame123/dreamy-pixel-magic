import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { fabric } from "fabric";
import { ImageControls } from "@/components/text-on-photo/ImageControls";
import { TextControls } from "@/components/text-on-photo/TextControls";
import { UndoRedoControls } from "@/components/text-on-photo/UndoRedoControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const saveState = () => {
    if (!canvas) return;
    setUndoStack(prev => [...prev, JSON.stringify(canvas)]);
    setRedoStack([]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result as string, (img) => {
        img.set({
          selectable: false,
        });
        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        });
        saveState();
        toast.success("Image uploaded successfully!");
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasInit = (fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Text to Photo</h1>
          
          <div className="space-y-6">
            <ImageControls 
              canvas={canvas}
              onImageUpload={handleImageUpload}
            />

            <TextControls
              canvas={canvas}
              selectedFont={selectedFont}
              onFontChange={setSelectedFont}
              saveState={saveState}
            />

            <UndoRedoControls
              canvas={canvas}
              undoStack={undoStack}
              redoStack={redoStack}
              setUndoStack={setUndoStack}
              setRedoStack={setRedoStack}
            />
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <CanvasContainer
            canvasRef={canvasRef}
            containerRef={containerRef}
            onCanvasInit={handleCanvasInit}
          />
        </Card>
      </div>
    </div>
  );
};

export default TextOnPhoto;