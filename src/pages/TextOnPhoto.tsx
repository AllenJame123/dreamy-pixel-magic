import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import TextControls from "@/components/text-on-photo/TextControls";
import TextAlignmentControls from "@/components/text-on-photo/TextAlignmentControls";
import FontControls from "@/components/text-on-photo/FontControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";
import { fabric } from "fabric";

const TextOnPhoto = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUploaded = (imageUrl: string) => {
    if (!canvas) return;

    // Load the image onto the canvas
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
      setHasImage(true);
    });
  };

  const handleCanvasInit = (fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Add Text to Photos</h1>
        <p className="text-xl text-muted-foreground">
          Upload an image and customize it with text
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <ImageUploader onImageUploaded={handleImageUploaded} />
        </Card>

        {hasImage && (
          <>
            <Card className="lg:col-span-2 aspect-video relative overflow-hidden">
              <CanvasContainer
                canvasRef={canvasRef}
                containerRef={containerRef}
                onCanvasInit={handleCanvasInit}
              />
            </Card>

            <Card className="p-6 space-y-6 lg:row-start-1 lg:col-start-3">
              <TextEditor canvas={canvas} />
              <FontControls canvas={canvas} />
              <TextAlignmentControls canvas={canvas} />
              <TextControls 
                canvas={canvas}
                canUndo={false}
                canRedo={false}
                onUndo={() => {}}
                onRedo={() => {}}
              />
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default TextOnPhoto;