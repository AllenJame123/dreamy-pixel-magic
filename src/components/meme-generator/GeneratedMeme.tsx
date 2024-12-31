import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GeneratedMemeProps {
  imageUrl: string;
  topText: string;
  bottomText: string;
  onDownload: () => void;
}

const GeneratedMeme = ({ imageUrl, topText, bottomText, onDownload }: GeneratedMemeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw image
      ctx.drawImage(img, 0, 0);

      // Configure text style
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';

      // Calculate font size based on image dimensions
      const fontSize = Math.min(canvas.width * 0.06, 48);
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
        const maxWidth = canvas.width * 0.8; // 80% of canvas width
        const lines = wrapText(topText.toUpperCase(), maxWidth);
        const lineHeight = fontSize * 1.2;
        const topPadding = fontSize;

        lines.forEach((line, index) => {
          const y = topPadding + (index * lineHeight);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }

      // Add bottom text
      if (bottomText) {
        const maxWidth = canvas.width * 0.8; // 80% of canvas width
        const lines = wrapText(bottomText.toUpperCase(), maxWidth);
        const lineHeight = fontSize * 1.2;
        const bottomPadding = canvas.height - (fontSize / 2);

        lines.reverse().forEach((line, index) => {
          const y = bottomPadding - (index * lineHeight);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error);
    };

    img.src = imageUrl;
  }, [imageUrl, topText, bottomText]);

  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      </div>
      <Button
        onClick={onDownload}
        className="w-full"
        variant="secondary"
      >
        Download Meme
      </Button>
    </Card>
  );
};

export default GeneratedMeme;