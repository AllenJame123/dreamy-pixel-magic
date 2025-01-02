import { useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { fabric } from "fabric";
import { toast } from "sonner";
import { ImageControls } from "@/components/text-on-photo/ImageControls";
import { TextControls } from "@/components/text-on-photo/TextControls";
import { UndoRedoControls } from "@/components/text-on-photo/UndoRedoControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";
import ImageUploader from "@/components/text-on-photo/ImageUploader";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [showEditor, setShowEditor] = useState(false);

  const saveState = useCallback(() => {
    if (!canvas) return;
    setUndoStack(prev => [...prev, JSON.stringify(canvas)]);
    setRedoStack([]);
  }, [canvas]);

  const handleImageUpload = useCallback((imageUrl: string) => {
    if (!canvas) {
      toast.error("Canvas not initialized");
      return;
    }

    fabric.Image.fromURL(
      imageUrl, 
      (img) => {
        canvas.clear();
        
        // Calculate scaling to fit the canvas while maintaining aspect ratio
        const canvasWidth = canvas.width || 800;
        const canvasHeight = canvas.height || 600;
        const scale = Math.min(
          canvasWidth / img.width!,
          canvasHeight / img.height!
        );

        img.set({
          scaleX: scale,
          scaleY: scale,
          selectable: false,
        });

        // Center the image
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          originX: 'center',
          originY: 'center',
          left: canvasWidth / 2,
          top: canvasHeight / 2
        });
        
        saveState();
        setShowEditor(true);
        toast.success("Image uploaded successfully");
      },
      {
        crossOrigin: 'anonymous',
        error: (err) => {
          console.error('Error loading image:', err);
          toast.error("Failed to load image");
        }
      }
    );
  }, [canvas, saveState]);

  const handleCanvasInit = useCallback((fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Text to Photo</h1>
          
          {!showEditor ? (
            <ImageUploader onImageUploaded={handleImageUpload} />
          ) : (
            <div className="space-y-6">
              <ImageControls 
                canvas={canvas}
                onImageUpload={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    handleImageUpload(url);
                  }
                }}
              />

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Text Options</h2>
                <TextControls
                  canvas={canvas}
                  selectedFont={selectedFont}
                  onFontChange={setSelectedFont}
                  saveState={saveState}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">History</h2>
                <UndoRedoControls
                  canvas={canvas}
                  undoStack={undoStack}
                  redoStack={redoStack}
                  setUndoStack={setUndoStack}
                  setRedoStack={setRedoStack}
                />
              </div>
            </div>
          )}
        </Card>

        <Card className={`p-6 bg-white ${!showEditor ? 'hidden' : ''}`}>
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