import { useRef, useEffect } from "react";
import { fabric } from "fabric";

interface CanvasContainerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  onCanvasInit: (canvas: fabric.Canvas) => void;
}

const CanvasContainer = ({ canvasRef, containerRef, onCanvasInit }: CanvasContainerProps) => {
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      console.error('Canvas or container ref not ready');
      return;
    }

    // If canvas is already initialized, skip
    if (canvasInstanceRef.current) {
      console.log('Canvas already initialized, skipping');
      return;
    }

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = Math.min(600, window.innerHeight - 200);

    console.log('Initializing new canvas with dimensions:', containerWidth, 'x', containerHeight);

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: containerWidth,
      height: containerHeight,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    canvasInstanceRef.current = canvas;
    onCanvasInit(canvas);

    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = Math.min(600, window.innerHeight - 200);
      
      canvas.setDimensions({
        width: newWidth,
        height: newHeight,
      });
      
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Cleaning up canvas');
      window.removeEventListener('resize', handleResize);
      if (canvasInstanceRef.current) {
        canvasInstanceRef.current.dispose();
        canvasInstanceRef.current = null;
      }
    };
  }, [canvasRef, containerRef, onCanvasInit]);

  return (
    <div 
      ref={containerRef}
      className="border rounded-lg overflow-hidden bg-[#f8f9fa] w-full aspect-[4/3]"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CanvasContainer;