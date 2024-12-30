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
    img.src = imageUrl;

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Configure text style
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      // Calculate font size based on canvas width
      const fontSize = canvas.width * 0.08;
      ctx.font = `bold ${fontSize}px Impact`;

      // Add top text
      if (topText) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
      }

      // Add bottom text
      if (bottomText) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }
    };
  }, [imageUrl, topText, bottomText]);

  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="aspect-square relative rounded-lg overflow-hidden">
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