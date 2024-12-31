import { useRef, useState } from "react";
import { fabric } from "fabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import TextAlignmentControls from "@/components/text-on-photo/TextAlignmentControls";
import TextControls from "@/components/text-on-photo/TextControls";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveCanvasState = (canvas: fabric.Canvas) => {
    if (!canvas) return;
    
    const json = JSON.stringify(canvas.toJSON());
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), json];
      if (newHistory.length > 50) newHistory.shift();
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

  const handleCanvasInit = (canvas: fabric.Canvas) => {
    setFabricCanvas(canvas);
    canvas.on('object:modified', () => saveCanvasState(canvas));
    canvas.on('object:added', () => saveCanvasState(canvas));
    canvas.on('object:removed', () => saveCanvasState(canvas));
    saveCanvasState(canvas);
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
            <TextControls
              canvas={fabricCanvas}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={handleUndo}
              onRedo={handleRedo}
            />
            <TextEditor canvas={fabricCanvas} />
            <TextAlignmentControls canvas={fabricCanvas} />
          </div>

          <div className="space-y-4">
            <CanvasContainer
              canvasRef={canvasRef}
              containerRef={containerRef}
              onCanvasInit={handleCanvasInit}
            />
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