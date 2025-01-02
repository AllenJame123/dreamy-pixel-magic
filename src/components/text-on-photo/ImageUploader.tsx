import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUploaded: (canvas: fabric.Canvas) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Create a local preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const img = new Image();
    img.onload = () => {
      // Create canvas element
      const canvas = document.createElement('canvas');
      const containerWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 40;
      const containerHeight = 600;

      canvas.width = containerWidth;
      canvas.height = containerHeight;

      // Initialize fabric canvas
      const fabricCanvas = new fabric.Canvas(canvas, {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#ffffff'
      });

      // Create fabric image
      fabric.Image.fromURL(objectUrl, (fabricImage) => {
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
        fabricCanvas.add(fabricImage);
        fabricCanvas.renderAll();
        
        // Clear previous canvas
        const container = document.getElementById('canvas-container');
        if (container) {
          container.innerHTML = '';
          container.appendChild(canvas);
        }

        onImageUploaded(fabricCanvas);
        toast.success('Image uploaded successfully');
      });
    };

    img.src = objectUrl;
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
    </div>
  );
};

export default ImageUploader;