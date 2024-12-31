import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Undo2, Redo2 } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import TextAlignmentControls from "@/components/text-on-photo/TextAlignmentControls";
import LayerControls from "@/components/text-on-photo/LayerControls";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = Math.min(600, window.innerHeight - 200);

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: containerWidth,
      height: containerHeight,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    // Enable text editing on double click
    canvas.on('mouse:dblclick', (options) => {
      if (options.target && options.target.type === 'i-text') {
        const textObject = options.target as fabric.IText;
        textObject.enterEditing();
        textObject.selectAll();
      }
    });

    // Save state after each modification
    canvas.on('object:modified', () => {
      saveCanvasState(canvas);
    });

    canvas.on('object:added', () => {
      saveCanvasState(canvas);
    });

    canvas.on('object:removed', () => {
      saveCanvasState(canvas);
    });

    setFabricCanvas(canvas);
    saveCanvasState(canvas); // Save initial state

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = Math.min(600, window.innerHeight - 200);
      
      canvas.setDimensions({
        width: newWidth,
        height: newHeight,
      });
      
      const scaleX = newWidth / canvas.getWidth();
      const scaleY = newHeight / canvas.getHeight();
      const objects = canvas.getObjects();
      
      objects.forEach(obj => {
        obj.scaleX = obj.scaleX! * scaleX;
        obj.scaleY = obj.scaleY! * scaleY;
        obj.left = obj.left! * scaleX;
        obj.top = obj.top! * scaleY;
        obj.setCoords();
      });
      
      canvas.renderAll();
      saveCanvasState(canvas);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const saveCanvasState = (canvas: fabric.Canvas) => {
    if (!canvas) return;
    
    const json = JSON.stringify(canvas.toJSON());
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), json];
      if (newHistory.length > 50) newHistory.shift(); // Limit history size
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
    setCanUndo(true);
    setCanRedo(false);
  };

  const loadCanvasState = (json: string) => {
    if (!fabricCanvas) return;
    
    fabricCanvas.loadFromJSON(json, () => {
      fabricCanvas.renderAll();
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0 && fabricCanvas) {
      const newIndex = historyIndex - 1;
      loadCanvasState(history[newIndex]);
      setHistoryIndex(newIndex);
      setCanUndo(newIndex > 0);
      setCanRedo(true);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1 && fabricCanvas) {
      const newIndex = historyIndex + 1;
      loadCanvasState(history[newIndex]);
      setHistoryIndex(newIndex);
      setCanUndo(true);
      setCanRedo(newIndex < history.length - 1);
    }
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    try {
      const link = document.createElement('a');
      link.download = 'text-on-photo.png';
      link.href = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2
      });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
      console.error("Download error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Add Text to Photos</h1>
        <p className="text-xl text-muted-foreground">
          Create professional text overlays with advanced styling options
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUploader canvas={fabricCanvas} />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleUndo} 
                disabled={!canUndo}
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRedo} 
                disabled={!canRedo}
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </Button>
            </div>
            <TextEditor canvas={fabricCanvas} />
            <TextAlignmentControls canvas={fabricCanvas} />
            <LayerControls canvas={fabricCanvas} />
          </div>

          <div className="space-y-4">
            <div 
              ref={containerRef}
              className="border rounded-lg overflow-hidden bg-[#f8f9fa] w-full aspect-[4/3]"
            >
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TextOnPhoto;