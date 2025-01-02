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

  const initCanvas = (width: number, height: number) => {
    if (!canvasRef.current) return null;
    
    // Clean up existing canvas if it exists
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
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        
        // Initialize canvas with natural image dimensions
        const canvas = initCanvas(naturalWidth, naturalHeight);
        if (!canvas) return;

        fabric.Image.fromURL(e.target?.result as string, (fabricImg) => {
          // Set image dimensions to match canvas
          fabricImg.scaleToWidth(canvas.width!);
          fabricImg.scaleToHeight(canvas.height!);
          
          fabricImg.set({
            left: 0,
            top: 0,
            originX: 'left',
            originY: 'top'
          });

          canvas.clear();
          canvas.add(fabricImg);
          canvas.renderAll();
          onImageUploaded(canvas);
          toast.success('Image uploaded successfully');
        }, { crossOrigin: 'anonymous' });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Click to upload an image</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
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

      <div className="border rounded-lg overflow-hidden bg-gray-50">
        <canvas
          ref={canvasRef}
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </div>

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