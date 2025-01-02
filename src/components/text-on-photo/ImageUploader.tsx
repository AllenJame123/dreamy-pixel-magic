import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { fabric } from "fabric";

interface ImageUploaderProps {
  onImageUploaded: (canvas: fabric.Canvas) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [hasImage, setHasImage] = useState(false);

  const initCanvas = (width: number, height: number) => {
    if (!canvasRef.current) return null;
    
    // Dispose of existing canvas if it exists
    if (fabricCanvas) {
      fabricCanvas.dispose();
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: 'transparent'
    });

    setFabricCanvas(canvas);
    return canvas;
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 800; // Maximum width for the canvas
        const maxHeight = 600; // Maximum height for the canvas
        
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        
        // Scale down the image if it's too large
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        const canvas = initCanvas(width, height);
        if (!canvas) return;

        fabric.Image.fromURL(e.target?.result as string, (fabricImg) => {
          canvas.setDimensions({
            width: width,
            height: height
          });

          fabricImg.scaleToWidth(width);
          fabricImg.scaleToHeight(height);
          
          fabricImg.set({
            left: 0,
            top: 0,
            originX: 'left',
            originY: 'top',
            selectable: false,
            evented: false
          });

          canvas.clear();
          canvas.add(fabricImg);
          canvas.renderAll();
          onImageUploaded(canvas);
          setHasImage(true);
          toast.success('Image uploaded successfully');
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {!hasImage ? (
        <div 
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Click to upload an image</p>
              <Button
                variant="link"
                className="text-primary"
              >
                Browse files
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-transparent">
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageUpload(file);
          }
        }}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;