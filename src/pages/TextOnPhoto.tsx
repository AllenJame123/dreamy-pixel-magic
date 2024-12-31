import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import TextEditor from "@/components/text-on-photo/TextEditor";
import ImageUploader from "@/components/text-on-photo/ImageUploader";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    try {
      const link = document.createElement('a');
      link.download = 'text-on-photo.png';
      link.href = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1
      });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Add Text to Photo</h1>
        <p className="text-xl text-muted-foreground">
          Upload an image and add customizable text overlays to create stunning visuals
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUploader canvas={fabricCanvas} />
            <TextEditor canvas={fabricCanvas} />
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TextOnPhoto;