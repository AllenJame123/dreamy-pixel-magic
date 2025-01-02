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
        if (!img) {
          toast.error("Failed to load image");
          return;
        }

        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
          selectable: false
        });
        
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