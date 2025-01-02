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
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'transparent',
      preserveObjectStacking: true,
    });

    // Set canvas dimensions to match container
    const updateCanvasSize = () => {
      const containerWidth = container.clientWidth;
      canvas.setWidth(containerWidth);
      canvas.setHeight(containerWidth * (canvas.height! / canvas.width!));
      canvas.renderAll();
    };

    // Initial size update
    updateCanvasSize();

    // Update canvas size when window resizes
    window.addEventListener('resize', updateCanvasSize);

    canvasInstanceRef.current = canvas;
    onCanvasInit(canvas);

    return () => {
      console.log('Cleaning up canvas');
      window.removeEventListener('resize', updateCanvasSize);
      if (canvasInstanceRef.current) {
        canvasInstanceRef.current.dispose();
        canvasInstanceRef.current = null;
      }
    };
  }, [canvasRef, containerRef, onCanvasInit]);

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden bg-transparent w-full"
      style={{ maxWidth: '100%' }}
    >
      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default CanvasContainer;