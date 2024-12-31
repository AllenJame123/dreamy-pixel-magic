import { useRef } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  canvas: fabric.Canvas | null;
}

const ImageUploader = ({ canvas }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        
        // Calculate dimensions to fit the canvas while maintaining aspect ratio
        const canvasWidth = canvas.width!;
        const canvasHeight = canvas.height!;
        const imgAspectRatio = img.width / img.height;
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
        
        // Set the image dimensions
        fabricImage.scaleToWidth(scaledWidth);
        fabricImage.scaleToHeight(scaledHeight);
        
        // Center the image on canvas
        fabricImage.set({
          left: (canvasWidth - scaledWidth) / 2,
          top: (canvasHeight - scaledHeight) / 2,
        });

        canvas.clear();
        canvas.add(fabricImage);
        canvas.renderAll();
        toast.success('Image uploaded successfully!');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="w-full"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;