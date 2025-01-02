import { useState, useRef } from "react";
import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const TextOnPhoto = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!canvasRef.current) return;

      // Initialize canvas if not already done
      if (!canvas) {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
          width: 800,
          height: 600,
        });
        setCanvas(newCanvas);
      }

      // Load the image
      fabric.Image.fromURL(e.target?.result as string, (img) => {
        if (!canvas) return;
        
        // Scale image to fit canvas
        const scale = Math.min(
          800 / img.width!,
          600 / img.height!
        );
        
        img.scale(scale);
        
        // Center the image
        img.set({
          left: (800 - img.width! * scale) / 2,
          top: (600 - img.height! * scale) / 2
        });

        canvas.clear();
        canvas.add(img);
        canvas.renderAll();
        toast.success("Image uploaded successfully!");
      });
    };
    reader.readAsDataURL(file);
  };

  const addText = () => {
    if (!canvas || !text.trim()) {
      toast.error("Please enter some text first!");
      return;
    }

    const fabricText = new fabric.IText(text, {
      left: canvas.width! / 2,
      top: canvas.height! / 2,
      fontSize: 40,
      fill: '#000000',
      fontFamily: 'Arial',
      originX: 'center',
      originY: 'center',
      editable: true
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
    setText("");
    toast.success("Text added! You can now drag, resize, and edit it directly on the image.");
  };

  const handleDownload = () => {
    if (!canvas) {
      toast.error("Please add an image first!");
      return;
    }
    
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
      });

      const link = document.createElement('a');
      link.download = 'text-on-photo.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
      console.error("Download error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                className="flex-grow text-lg"
              />
              <Button onClick={addText} size="lg">
                Add Text
              </Button>
              <Button onClick={handleDownload} variant="outline" size="lg">
                Download
              </Button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full h-16"
            >
              Click to Upload Image
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <canvas 
            ref={canvasRef}
            className="w-full max-w-4xl mx-auto border rounded-lg"
          />
        </Card>
      </div>
    </div>
  );
};

export default TextOnPhoto;