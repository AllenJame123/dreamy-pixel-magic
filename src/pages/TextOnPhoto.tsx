import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Type, Download } from "lucide-react";

const TextOnPhoto = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Add text
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Position text in center
      const x = canvas.width / 2;
      const y = canvas.height / 2;

      // Add stroke
      ctx.strokeText(text, x, y);
      // Add fill
      ctx.fillText(text, x, y);
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'text-on-photo.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    toast.success('Image downloaded successfully!');
  };

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Text on Photo</h1>
        <h2 className="text-xl text-muted-foreground">Add custom text to your photos easily</h2>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Upload Image</Label>
            <div className="mt-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="text">Text to Add</Label>
            <div className="flex gap-2">
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to add to image"
              />
              <Button onClick={handleAddText} disabled={!image || !text}>
                <Type className="w-4 h-4 mr-2" />
                Add Text
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {image && (
        <Card className="p-6 space-y-4">
          <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TextOnPhoto;