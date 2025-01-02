import { useRef } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUploaded: (canvas: fabric.Canvas) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Create a new canvas element
        const canvasEl = document.createElement('canvas');
        canvasEl.id = 'fabric-canvas';
        
        // Set initial dimensions
        const containerWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 40;
        const containerHeight = 600;
        
        // Initialize fabric canvas
        const canvas = new fabric.Canvas(canvasEl, {
          width: containerWidth,
          height: containerHeight,
          backgroundColor: '#ffffff'
        });

        // Create fabric image
        const fabricImage = new fabric.Image(img);
        
        // Scale image to fit canvas
        const scaleX = (containerWidth - 40) / fabricImage.width!;
        const scaleY = (containerHeight - 40) / fabricImage.height!;
        const scale = Math.min(scaleX, scaleY);
        
        fabricImage.scale(scale);
        
        // Center the image
        fabricImage.set({
          left: (containerWidth - fabricImage.width! * scale) / 2,
          top: (containerHeight - fabricImage.height! * scale) / 2
        });

        // Add to canvas
        canvas.add(fabricImage);
        canvas.renderAll();

        // Clear previous canvas if exists
        const container = document.getElementById('canvas-container');
        if (container) {
          container.innerHTML = '';
          container.appendChild(canvasEl);
        }

        onImageUploaded(canvas);
        toast.success('Image uploaded successfully');
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
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