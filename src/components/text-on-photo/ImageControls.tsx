import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { fabric } from "fabric";

interface ImageControlsProps {
  canvas: fabric.Canvas | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageControls = ({ canvas, onImageUpload }: ImageControlsProps) => {
  const downloadImage = () => {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    // Fix: Pass an object with the format property instead of just a string
    link.href = canvas.toDataURL({ format: 'png' });
    link.click();
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        onChange={onImageUpload}
        accept="image/*"
        className="w-full"
      />
      <Button onClick={downloadImage} variant="outline">
        Download Image
      </Button>
    </div>
  );
};