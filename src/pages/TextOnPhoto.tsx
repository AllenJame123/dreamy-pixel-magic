import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import FontControls from "@/components/text-on-photo/FontControls";
import TextAlignmentControls from "@/components/text-on-photo/TextAlignmentControls";
import TextControls from "@/components/text-on-photo/TextControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";
import { fabric } from "fabric";

const TextOnPhoto = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleCanvasInit = (fabricCanvas: fabric.Canvas) => {
    console.log('Canvas initialized');
    setCanvas(fabricCanvas);
  };

  const handleImageUploaded = (imageUrl: string) => {
    if (!canvas) {
      console.error('Canvas not initialized');
      return;
    }
    
    fabric.Image.fromURL(imageUrl, (img) => {
      canvas.clear();
      
      const canvasWidth = canvas.width!;
      const canvasHeight = canvas.height!;
      const scale = Math.min(
        canvasWidth / img.width!,
        canvasHeight / img.height!
      );

      img.scale(scale);
      img.set({
        left: (canvasWidth - img.width! * scale) / 2,
        top: (canvasHeight - img.height! * scale) / 2
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      setImageUploaded(true);
    });
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Add Text to Photos</h1>
        
        {!imageUploaded ? (
          <Card className="max-w-xl mx-auto p-6">
            <ImageUploader onImageUploaded={handleImageUploaded} />
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Text Editor Controls - Always Visible at Top */}
            <Card className="p-4">
              <TextEditor canvas={canvas} />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Side Controls */}
              <div className="lg:col-span-3 space-y-4">
                <Card className="p-4">
                  <FontControls canvas={canvas} />
                </Card>
                <Card className="p-4">
                  <TextAlignmentControls canvas={canvas} />
                </Card>
                <Card className="p-4">
                  <TextControls 
                    canvas={canvas}
                    canUndo={historyIndex > 0}
                    canRedo={historyIndex < history.length - 1}
                    onUndo={() => {
                      if (historyIndex > 0) {
                        setHistoryIndex(historyIndex - 1);
                      }
                    }}
                    onRedo={() => {
                      if (historyIndex < history.length - 1) {
                        setHistoryIndex(historyIndex + 1);
                      }
                    }}
                  />
                </Card>
              </div>

              {/* Canvas Area - Larger and More Prominent */}
              <div className="lg:col-span-9">
                <Card className="w-full aspect-[4/3] relative">
                  <CanvasContainer
                    canvasRef={canvasRef}
                    containerRef={containerRef}
                    onCanvasInit={handleCanvasInit}
                  />
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextOnPhoto;