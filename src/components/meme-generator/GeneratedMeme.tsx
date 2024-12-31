import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface GeneratedMemeProps {
  imageUrl: string;
  topText: string;
  bottomText: string;
  onDownload: () => void;
  onUpdateText: (position: 'top' | 'bottom', text: string) => void;
}

interface TextStyle {
  color: string;
  yPosition: number;
}

const GeneratedMeme = ({ 
  imageUrl, 
  topText, 
  bottomText, 
  onDownload,
  onUpdateText 
}: GeneratedMemeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [topStyle, setTopStyle] = useState<TextStyle>({ color: '#ffffff', yPosition: 10 });
  const [bottomStyle, setBottomStyle] = useState<TextStyle>({ color: '#ffffff', yPosition: 90 });

  const colors = [
    '#ffffff', '#9b87f5', '#F2FCE2', '#8B5CF6', '#0EA5E9',
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'
  ];

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError("Could not initialize canvas");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Configure text style
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';

      const fontSize = Math.min(canvas.width * 0.08, 60);
      ctx.font = `bold ${fontSize}px Impact`;

      // Function to wrap text
      const wrapText = (text: string, maxWidth: number) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
          const width = ctx.measureText(currentLine + " " + words[i]).width;
          if (width < maxWidth) {
            currentLine += " " + words[i];
          } else {
            lines.push(currentLine);
            currentLine = words[i];
          }
        }
        lines.push(currentLine);
        return lines;
      };

      // Add top text
      if (topText) {
        const maxWidth = canvas.width * 0.8;
        const lines = wrapText(topText.toUpperCase(), maxWidth);
        const lineHeight = fontSize * 1.2;
        const topPadding = (canvas.height * topStyle.yPosition) / 100;

        ctx.fillStyle = topStyle.color;
        lines.forEach((line, index) => {
          const y = topPadding + (index * lineHeight);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }

      // Add bottom text
      if (bottomText) {
        const maxWidth = canvas.width * 0.8;
        const lines = wrapText(bottomText.toUpperCase(), maxWidth);
        const lineHeight = fontSize * 1.2;
        const bottomPadding = (canvas.height * bottomStyle.yPosition) / 100;
        
        ctx.fillStyle = bottomStyle.color;
        lines.reverse().forEach((line, index) => {
          const y = bottomPadding - (index * lineHeight);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }
    };

    img.onerror = () => {
      setError("Failed to load image");
    };

    img.src = imageUrl;
  };

  useEffect(() => {
    redrawCanvas();
  }, [imageUrl, topText, bottomText, topStyle, bottomStyle]);

  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Top Text</Label>
            <Input
              value={topText}
              onChange={(e) => onUpdateText('top', e.target.value)}
              placeholder="Top text"
            />
            <div className="space-y-2">
              <Label>Position</Label>
              <Slider
                value={[topStyle.yPosition]}
                onValueChange={(value) => {
                  setTopStyle(prev => ({ ...prev, yPosition: value[0] }));
                }}
                min={0}
                max={50}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => setTopStyle(prev => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bottom Text</Label>
            <Input
              value={bottomText}
              onChange={(e) => onUpdateText('bottom', e.target.value)}
              placeholder="Bottom text"
            />
            <div className="space-y-2">
              <Label>Position</Label>
              <Slider
                value={[bottomStyle.yPosition]}
                onValueChange={(value) => {
                  setBottomStyle(prev => ({ ...prev, yPosition: value[0] }));
                }}
                min={50}
                max={100}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => setBottomStyle(prev => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center text-red-500">
                {error}
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <Button
            onClick={onDownload}
            className="w-full"
            variant="secondary"
          >
            Download Meme
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GeneratedMeme;