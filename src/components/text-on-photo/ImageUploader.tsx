import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
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
      
      const img = new Image();
      img.onload = () => {
        if (!canvas) return;
        
        canvas.getObjects().forEach(obj => {
          if (!(obj instanceof fabric.IText)) {
            canvas.remove(obj);
          }
        });
        
        const fabricImage = new fabric.Image(img, {
          selectable: false,
          evented: false
        });

        const scaleX = canvas.width! / fabricImage.width!;
        const scaleY = canvas.height! / fabricImage.height!;
        const scale = Math.min(scaleX, scaleY);
        
        fabricImage.scale(scale);
        fabricImage.set({
          left: (canvas.width! - fabricImage.width! * scale) / 2,
          top: (canvas.height! - fabricImage.height! * scale) / 2
        });
        
        canvas.add(fabricImage);
        canvas.sendToBack(fabricImage);
        canvas.requestRenderAll();
        saveState();
        toast.success("Image uploaded successfully");
      };
      img.src = e.target.result.toString();
    };
    reader.readAsDataURL(file);
  }, [canvas, saveState]);

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
        <Upload className="mr-2 h-5 w-5" />
        Choose Image
      </Button>
    </div>
  );
};

export default ImageUploader;