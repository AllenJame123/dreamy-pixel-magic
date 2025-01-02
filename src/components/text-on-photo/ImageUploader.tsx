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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string;
      setPreviewUrl(imgUrl);

      // Create a new image object
      const img = new Image();
      img.onload = () => {
        // Calculate container dimensions
        const containerWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 40;
        const containerHeight = 600;

        // If there's an existing canvas, dispose of it
        if (canvasRef.current) {
          canvasRef.current.dispose();
        }

        // Create new canvas
        const canvas = new fabric.Canvas('canvas-container', {
          width: containerWidth,
          height: containerHeight,
          backgroundColor: '#ffffff'
        });

        canvasRef.current = canvas;

        // Create fabric image
        fabric.Image.fromURL(imgUrl, (fabricImg) => {
          // Scale image to fit canvas while maintaining aspect ratio
          const scaleX = (containerWidth - 40) / fabricImg.width!;
          const scaleY = (containerHeight - 40) / fabricImg.height!;
          const scale = Math.min(scaleX, scaleY);

          fabricImg.scale(scale);

          // Center the image
          fabricImg.set({
            left: (containerWidth - fabricImg.width! * scale) / 2,
            top: (containerHeight - fabricImg.height! * scale) / 2
          });

          // Clear canvas and add image
          canvas.clear();
          canvas.add(fabricImg);
          canvas.renderAll();

          onImageUploaded(canvas);
          toast.success('Image uploaded successfully');
        });
      };
      img.src = imgUrl;
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
      {previewUrl && (
        <div className="mt-4">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-w-full h-auto rounded-lg shadow-lg"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
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
      <canvas id="canvas-container" className="hidden" />
    </div>
  );
};

export default ImageUploader;