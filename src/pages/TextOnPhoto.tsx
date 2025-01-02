import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import FontControls from "@/components/text-on-photo/FontControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";
import { fabric } from "fabric";

const TextOnPhoto = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUploaded, setImageUploaded] = useState(false);

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
      
      // Center the image
      img.set({
        left: (canvasWidth - img.width! * scale) / 2,
        top: (canvasHeight - img.height! * scale) / 2
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      setImageUploaded(true);
    });
  };

  const handleCanvasInit = (fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Add Text to Photos</h1>
        
        {!imageUploaded ? (
          <Card className="p-6">
            <ImageUploader onImageUploaded={handleImageUploaded} />
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls Panel */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6">
                <TextEditor canvas={canvas} />
              </Card>
              <Card className="p-6">
                <FontControls canvas={canvas} />
              </Card>
            </div>
            
            {/* Canvas Area */}
            <div className="lg:col-span-8">
              <Card className="aspect-[4/3] relative">
                <CanvasContainer
                  canvasRef={canvasRef}
                  containerRef={containerRef}
                  onCanvasInit={handleCanvasInit}
                />
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextOnPhoto;