import { useRef, useEffect } from "react";

interface TextStyle {
  color: string;
  fontSize: number;
  fontFamily: string;
}

interface MemePreviewProps {
  imageUrl: string;
  topText: string;
  bottomText: string;
  topStyle: TextStyle;
  bottomStyle: TextStyle;
}

const MemePreview = ({ 
  imageUrl, 
  topText, 
  bottomText, 
  topStyle, 
  bottomStyle 
}: MemePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Clear and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Text styling
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';

      const drawWrappedText = (text: string, y: number, style: TextStyle, isTop: boolean) => {
        if (!text) return;

        ctx.font = `${style.fontSize}px ${style.fontFamily}`;
        ctx.fillStyle = style.color;

        // Calculate max width for text (80% of canvas width)
        const maxWidth = canvas.width * 0.8;
        const words = text.toUpperCase().split(' ');
        const lines: string[] = [];
        let currentLine = words[0];

        // Break text into lines
        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + ' ' + words[i];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        // Calculate vertical positioning
        const lineHeight = style.fontSize * 1.2;
        const totalHeight = lines.length * lineHeight;
        
        // Draw each line
        lines.forEach((line, index) => {
          const lineY = isTop 
            ? y + (index * lineHeight)
            : y - ((lines.length - 1 - index) * lineHeight);
          
          ctx.strokeText(line, canvas.width / 2, lineY);
          ctx.fillText(line, canvas.width / 2, lineY);
        });
      };

      // Draw top text
      if (topText) {
        drawWrappedText(topText, topStyle.fontSize * 1.2, topStyle, true);
      }

      // Draw bottom text
      if (bottomText) {
        drawWrappedText(bottomText, canvas.height - bottomStyle.fontSize * 0.5, bottomStyle, false);
      }
    };

    img.src = imageUrl;
  }, [imageUrl, topText, bottomText, topStyle, bottomStyle]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-100">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default MemePreview;