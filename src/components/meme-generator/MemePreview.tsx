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
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;

      const drawWrappedText = (text: string, isTop: boolean, style: TextStyle) => {
        if (!text) return;

        // Initial font size and settings
        let fontSize = style.fontSize;
        const maxWidth = canvas.width * 0.8; // 80% of canvas width
        const maxLines = 3;
        const padding = canvas.height * 0.05; // 5% padding from edges

        // Function to measure and wrap text
        const wrapText = (fontSize: number): string[] => {
          ctx.font = `${fontSize}px ${style.fontFamily}`;
          const words = text.toUpperCase().split(' ');
          const lines: string[] = [];
          let currentLine = words[0];

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
          return lines;
        };

        // Get initial text wrap
        let lines = wrapText(fontSize);

        // Reduce font size until text fits in maxLines
        while (lines.length > maxLines && fontSize > 20) {
          fontSize -= 5;
          lines = wrapText(fontSize);
        }

        // Set final font settings
        ctx.font = `${fontSize}px ${style.fontFamily}`;
        ctx.fillStyle = style.color;

        // Calculate positions
        const lineHeight = fontSize * 1.2;
        const totalHeight = lines.length * lineHeight;
        
        let startY;
        if (isTop) {
          startY = padding + fontSize; // Top position with padding
        } else {
          startY = canvas.height - padding - totalHeight + fontSize; // Bottom position with padding
        }

        // Draw each line
        lines.forEach((line, index) => {
          const y = startY + (index * lineHeight);
          // Draw stroke (outline)
          ctx.strokeText(line, canvas.width / 2, y);
          // Draw fill (text)
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