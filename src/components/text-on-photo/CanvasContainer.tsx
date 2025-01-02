import { useRef, useEffect } from "react";
import { fabric } from "fabric";

interface CanvasContainerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  onCanvasInit: (canvas: fabric.Canvas) => void;
}

const CanvasContainer = ({ canvasRef, containerRef, onCanvasInit }: CanvasContainerProps) => {
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = new fabric.Canvas(canvasRef.current);

    // Set initial dimensions
    const updateCanvasSize = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      canvas.setDimensions({
        width: containerWidth,
        height: containerHeight
      });
      canvas.renderAll();
    };

    // Initial size update
    updateCanvasSize();

    // Update canvas size when window resizes
    window.addEventListener('resize', updateCanvasSize);

    // Call the initialization callback
    onCanvasInit(canvas);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.dispose();
    };
  }, [canvasRef, containerRef, onCanvasInit]);

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