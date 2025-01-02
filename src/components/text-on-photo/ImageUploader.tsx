import { useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUploaded: (canvas: fabric.Canvas) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        // Create a canvas element
        const canvasElement = document.createElement('canvas');
        container.appendChild(canvasElement);

        // Initialize Fabric canvas with the canvas element
        const canvas = new fabric.Canvas(canvasElement, {
          width: container.clientWidth,
          height: Math.min(600, window.innerHeight - 200),
          backgroundColor: "#ffffff",
        });

        const fabricImage = new fabric.Image(imgElement);
        
        // Scale image to fit canvas
        const scale = Math.min(
          canvas.width! / fabricImage.width!,
          canvas.height! / fabricImage.height!
        );
        
        fabricImage.scale(scale);
        
        // Center the image
        fabricImage.set({
          left: (canvas.width! - fabricImage.width! * scale) / 2,
          top: (canvas.height! - fabricImage.height! * scale) / 2
        });

        canvas.add(fabricImage);
        canvas.renderAll();
        
        onImageUploaded(canvas);
        toast.success('Image uploaded successfully!');
      };

      imgElement.src = e.target?.result as string;
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