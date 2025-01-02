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

    console.log('Starting image upload process for file:', file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('FileReader loaded successfully');
      
      const imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      
      imgElement.onload = () => {
        console.log('Image loaded successfully, dimensions:', imgElement.width, 'x', imgElement.height);
        
        try {
          // Create a temporary canvas to handle the image
          const tempCanvas = document.createElement('canvas');
          const ctx = tempCanvas.getContext('2d');
          if (!ctx) {
            throw new Error('Could not get canvas context');
          }

          // Set dimensions
          tempCanvas.width = imgElement.width;
          tempCanvas.height = imgElement.height;

          // Draw image to temp canvas
          ctx.drawImage(imgElement, 0, 0);

          // Create fabric image from temp canvas
          fabric.Image.fromURL(tempCanvas.toDataURL('image/png'), (fabricImage) => {
            // Calculate dimensions to fit the canvas while maintaining aspect ratio
            const canvasWidth = canvas.width!;
            const canvasHeight = canvas.height!;
            const imgAspectRatio = imgElement.width / imgElement.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;
            
            let scaledWidth, scaledHeight;
            
            if (imgAspectRatio > canvasAspectRatio) {
              // Image is wider than canvas (relative to height)
              scaledWidth = canvasWidth;
              scaledHeight = canvasWidth / imgAspectRatio;
            } else {
              // Image is taller than canvas (relative to width)
              scaledHeight = canvasHeight;
              scaledWidth = canvasHeight * imgAspectRatio;
            }
            
            console.log('Scaling image to:', scaledWidth, 'x', scaledHeight);
            
            // Set the image dimensions
            fabricImage.scaleToWidth(scaledWidth);
            fabricImage.scaleToHeight(scaledHeight);
            
            // Center the image on canvas
            fabricImage.set({
              left: (canvasWidth - scaledWidth) / 2,
              top: (canvasHeight - scaledHeight) / 2,
              selectable: true,
              hasControls: true,
              backgroundColor: undefined // Remove any background color
            });

            canvas.clear();
            canvas.add(fabricImage);
            canvas.renderAll();
            
            console.log('Image added to canvas successfully');
            toast.success('Image uploaded successfully!');
          }, { crossOrigin: 'anonymous' });
        } catch (error) {
          console.error('Error creating fabric image:', error);
          toast.error('Failed to process image. Please try again.');
        }
      };

      imgElement.onerror = (error) => {
        console.error('Error loading image:', error);
        toast.error('Failed to load image. Please try again.');
      };

      imgElement.src = e.target?.result as string;
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
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