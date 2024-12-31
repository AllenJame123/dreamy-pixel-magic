import { useRef } from "react";
import { Canvas } from "fabric";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  canvas: Canvas | null;
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
        
        // Scale image to fit canvas while maintaining aspect ratio
        const scale = Math.min(
          canvas.width! / img.width,
          canvas.height! / img.height
        );
        
        fabricImage.scale(scale);
        
        // Center the image
        fabricImage.set({
          left: (canvas.width! - img.width * scale) / 2,
          top: (canvas.height! - img.height * scale) / 2,
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