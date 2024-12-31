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

      const drawWrappedText = (text: string, isTop: boolean, style: TextStyle) => {
        if (!text) return;

        // Set initial font size
        let fontSize = style.fontSize;
        ctx.font = `${fontSize}px ${style.fontFamily}`;
        ctx.fillStyle = style.color;

        // Calculate max width (60% of canvas width)
        const maxWidth = canvas.width * 0.6;
        
        // Split text into words and initialize lines array
        const words = text.toUpperCase().split(' ');
        const lines: string[] = [];
        let currentLine = words[0];

        // Break text into lines that fit within maxWidth
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

        // Adjust font size if too many lines
        const maxLines = 3;
        if (lines.length > maxLines) {
          fontSize = fontSize * (maxLines / lines.length);
          ctx.font = `${fontSize}px ${style.fontFamily}`;
        }

        // Calculate line height and total height
        const lineHeight = fontSize * 1.2;
        const totalHeight = lines.length * lineHeight;
        
        // Calculate starting Y position
        let startY;
        if (isTop) {
          startY = fontSize + (canvas.height * 0.05); // 5% padding from top
        } else {
          startY = canvas.height - (totalHeight + canvas.height * 0.05); // 5% padding from bottom
        }

        // Draw each line with stroke and fill
        lines.forEach((line, index) => {
          const y = startY + (index * lineHeight);
          // Draw stroke
          ctx.strokeText(line, canvas.width / 2, y);
          // Draw fill
          ctx.fillText(line, canvas.width / 2, y);
        });
      };

      // Draw top and bottom text
      if (topText) {
        drawWrappedText(topText, true, topStyle);
      }
      if (bottomText) {
        drawWrappedText(bottomText, false, bottomStyle);
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