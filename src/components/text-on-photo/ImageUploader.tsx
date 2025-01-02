import { useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  canvas: fabric.Canvas | null;
}

const ImageUploader = ({ canvas }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File) => {
    if (!canvas) {
      console.error('Canvas is not initialized');
      toast.error('Canvas not ready. Please try again.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) {
        toast.error('Failed to read image file');
        return;
      }

      const imgElement = new Image();
      imgElement.onload = () => {
        // Create a fabric image directly from the loaded image element
        const fabricImage = new fabric.Image(imgElement, {
          left: 0,
          top: 0,
          selectable: true,
          hasControls: true,
        });

        // Calculate scaling to fit the canvas while maintaining aspect ratio
        const canvasWidth = canvas.width!;
        const canvasHeight = canvas.height!;
        const scaleX = canvasWidth / imgElement.width;
        const scaleY = canvasHeight / imgElement.height;
        const scale = Math.min(scaleX, scaleY);

        fabricImage.scale(scale);

        // Center the image
        fabricImage.left = (canvasWidth - imgElement.width * scale) / 2;
        fabricImage.top = (canvasHeight - imgElement.height * scale) / 2;

        // Clear canvas and add the new image
        canvas.clear();
        canvas.add(fabricImage);
        canvas.renderAll();

        toast.success('Image uploaded successfully!');
      };

      imgElement.onerror = () => {
        toast.error('Failed to load image. Please try again.');
      };

      // Set source after defining handlers
      imgElement.src = e.target.result as string;
    };

    reader.onerror = () => {
      toast.error('Failed to read image file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-200"
        }`}
      >
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Drag and drop your image here, or
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="link"
              className="text-primary"
            >
              click to browse
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG
          </p>
        </div>
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