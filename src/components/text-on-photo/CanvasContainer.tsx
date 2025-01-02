import { useRef, useEffect, useCallback } from "react";
import { fabric } from "fabric";

interface CanvasContainerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  onCanvasInit: (canvas: fabric.Canvas) => void;
}

const CanvasContainer = ({ canvasRef, containerRef, onCanvasInit }: CanvasContainerProps) => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const updateCanvasSize = useCallback(() => {
    if (!fabricCanvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = fabricCanvasRef.current;
    
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    canvas.setDimensions({
      width: containerWidth,
      height: containerHeight
    });
    canvas.renderAll();
  }, [containerRef]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const initialWidth = container.clientWidth;
    const initialHeight = Math.min(600, window.innerHeight - 200);

    // Initialize canvas if it hasn't been initialized yet
    if (!fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: initialWidth,
        height: initialHeight,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true
      });

      fabricCanvasRef.current = canvas;
      onCanvasInit(canvas);
      canvas.renderAll();
    }

    // Update canvas size when window resizes
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [canvasRef, containerRef, onCanvasInit, updateCanvasSize]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative bg-white"
      style={{ minHeight: "400px" }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CanvasContainer;