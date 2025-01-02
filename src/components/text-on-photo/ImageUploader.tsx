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

  const initCanvas = () => {
    if (!canvasRef.current) return null;
    
    // Clean up existing canvas if it exists
    if (fabricCanvas) {
      fabricCanvas.dispose();
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
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
      const canvas = initCanvas();
      if (!canvas) return;

      fabric.Image.fromURL(e.target?.result as string, (img) => {
        // Scale image to fit canvas while maintaining aspect ratio
        const maxWidth = 800;
        const maxHeight = 600;
        let width = img.width || 0;
        let height = img.height || 0;

        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }

        if (height > maxHeight) {
          const ratio = maxHeight / height;
          height = maxHeight;
          width = width * ratio;
        }

        img.set({
          scaleX: width / (img.width || 1),
          scaleY: height / (img.height || 1),
          left: (canvas.width || 0) / 2,
          top: (canvas.height || 0) / 2,
          originX: 'center',
          originY: 'center'
        });

        canvas.clear();
        canvas.add(img);
        canvas.renderAll();
        onImageUploaded(canvas);
        toast.success('Image uploaded successfully');
      }, { crossOrigin: 'anonymous' });
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

      <div className="border rounded-lg overflow-hidden bg-gray-50 flex justify-center items-center min-h-[400px]">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-[600px] object-contain"
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