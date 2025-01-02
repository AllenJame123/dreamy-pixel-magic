import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      setCtx(context);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvasRef.current || !ctx) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        canvasRef.current!.width = img.width;
        canvasRef.current!.height = img.height;
        ctx.drawImage(img, 0, 0);
        setUploadedImage(img);
        toast.success("Image uploaded successfully!");
      };
      img.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const addText = () => {
    if (!ctx || !uploadedImage) {
      toast.error("Please upload an image first!");
      return;
    }

    const text = (document.getElementById('textInput') as HTMLInputElement).value;
    const font = (document.getElementById('fontSelect') as HTMLSelectElement).value;
    const size = (document.getElementById('fontSize') as HTMLInputElement).value + 'px';
    const color = (document.getElementById('fontColor') as HTMLInputElement).value;

    // Redraw the original image
    ctx.drawImage(uploadedImage, 0, 0);

    // Add the new text
    ctx.font = `${size} ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, canvasRef.current!.width / 2, canvasRef.current!.height / 2);
    
    toast.success("Text added successfully!");
  };

  const downloadImage = () => {
    if (!canvasRef.current) {
      toast.error("No image to download!");
      return;
    }

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Text to Photo</h1>
          
          <div className="space-y-4">
            <Input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="textInput"
                type="text"
                placeholder="Enter text"
                className="w-full"
              />

              <Select id="fontSelect" defaultValue="Arial">
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                </SelectContent>
              </Select>

              <Input
                id="fontSize"
                type="number"
                defaultValue="20"
                placeholder="Font Size"
                className="w-full"
              />

              <Input
                id="fontColor"
                type="color"
                defaultValue="#000000"
                className="w-full h-10"
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={addText} className="flex-1">
                Add Text
              </Button>
              <Button onClick={downloadImage} variant="outline" className="flex-1">
                Download Image
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <canvas 
            ref={canvasRef}
            className="max-w-full mx-auto border rounded-lg"
            width="800"
            height="500"
          />
        </Card>
      </div>
    </div>
  );
};

export default TextOnPhoto;