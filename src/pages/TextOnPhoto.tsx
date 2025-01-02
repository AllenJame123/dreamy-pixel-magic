import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import FontControls from "@/components/text-on-photo/FontControls";
import TextAlignmentControls from "@/components/text-on-photo/TextAlignmentControls";
import TextControls from "@/components/text-on-photo/TextControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";
import { fabric } from "fabric";
import HowItWorks from "@/components/text-on-photo/HowItWorks";

const TextOnPhoto = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleCanvasInit = (fabricCanvas: fabric.Canvas) => {
    console.log('Canvas initialized');
    setCanvas(fabricCanvas);
  };

  const handleImageUploaded = (imageUrl: string) => {
    if (!canvas) return;
    
    fabric.Image.fromURL(imageUrl, (img) => {
      canvas.clear();
      
      // Calculate scaling to fit the canvas while maintaining aspect ratio
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
        
        <div className="max-w-4xl mx-auto">
          {!imageUploaded ? (
            <>
              <HowItWorks />
              <div className="mt-8">
                <Card className="p-6">
                  <ImageUploader onImageUploaded={handleImageUploaded} />
                </Card>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {/* Text Editor - Always at the top */}
              <Card className="p-6">
                <TextEditor canvas={canvas} />
              </Card>

              {/* Canvas Area */}
              <Card className="p-6">
                <div className="aspect-video">
                  <CanvasContainer
                    canvasRef={canvasRef}
                    containerRef={containerRef}
                    onCanvasInit={handleCanvasInit}
                  />
                </div>
              </Card>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <FontControls canvas={canvas} />
                </Card>
                <Card className="p-4">
                  <TextAlignmentControls canvas={canvas} />
                </Card>
                <Card className="p-4">
                  <TextControls 
                    canvas={canvas}
                    canUndo={false}
                    canRedo={false}
                    onUndo={() => {}}
                    onRedo={() => {}}
                  />
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextOnPhoto;