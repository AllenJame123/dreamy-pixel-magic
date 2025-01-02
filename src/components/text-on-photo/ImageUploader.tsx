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
      
      fabric.Image.fromURL(e.target.result.toString(), (img) => {
        if (!canvas || !img) {
          toast.error("Failed to load image");
          return;
        }

        // Remove existing objects but keep the canvas instance
        canvas.getObjects().forEach(obj => canvas.remove(obj));
        
        // Calculate scaling to fit the image within the canvas
        const scaleX = canvas.width! / img.width!;
        const scaleY = canvas.height! / img.height!;
        const scale = Math.min(scaleX, scaleY);
        
        img.scale(scale);
        img.set({
          left: (canvas.width! - img.width! * scale) / 2,
          top: (canvas.height! - img.height! * scale) / 2,
          selectable: false,
          evented: false
        });
        
        canvas.add(img);
        canvas.renderAll();
        saveState();
        toast.success("Image uploaded successfully");
      });
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
