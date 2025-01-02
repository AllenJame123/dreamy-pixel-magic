import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { fabric } from "fabric";
import { toast } from "sonner";

interface ImageUploaderProps {
  canvas: fabric.Canvas | null;
  saveState: () => void;
}

const ImageUploader = ({ canvas, saveState }: ImageUploaderProps) => {
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      // Create a new image object
      const img = new Image();
      img.onload = () => {
        if (!canvas) return;

        // Remove existing objects but keep the canvas instance
        canvas.getObjects().forEach(obj => canvas.remove(obj));
        
        // Create fabric image
        const fabricImage = new fabric.Image(img, {
          selectable: false,
          evented: false
        });

        // Calculate scaling to fit the image within the canvas
        const scaleX = canvas.width! / fabricImage.width!;
        const scaleY = canvas.height! / fabricImage.height!;
        const scale = Math.min(scaleX, scaleY);
        
        fabricImage.scale(scale);
        fabricImage.set({
          left: (canvas.width! - fabricImage.width! * scale) / 2,
          top: (canvas.height! - fabricImage.height! * scale) / 2
        });
        
        canvas.add(fabricImage);
        canvas.requestRenderAll();
        saveState();
        toast.success("Image uploaded successfully");
      };
      img.src = e.target.result.toString();
    };
    reader.readAsDataURL(file);
  }, [canvas, saveState]);

  return (
    <Input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="w-full"
    />
  );
};

export default ImageUploader;
