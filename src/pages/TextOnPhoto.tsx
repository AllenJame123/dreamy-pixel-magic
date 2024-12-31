import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, IEvent } from "fabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Upload, Download, Type, Undo, Redo } from "lucide-react";
import TextEditor from "@/components/text-on-photo/TextEditor";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import { ColorPicker } from "@/components/text-on-photo/ColorPicker";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTextColor, setActiveTextColor] = useState("#000000");
  const [activeBackgroundColor, setActiveBackgroundColor] = useState("");
  const [fontSize, setFontSize] = useState(40);
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    canvas.on('object:modified', saveToHistory);
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  const saveToHistory = () => {
    if (!fabricCanvas) return;
    const json = JSON.stringify(fabricCanvas.toJSON());
    setHistory(prev => [...prev.slice(0, historyIndex + 1), json]);
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      loadFromHistory(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      loadFromHistory(newIndex);
    }
  };

  const loadFromHistory = (index: number) => {
    if (!fabricCanvas) return;
    fabricCanvas.loadFromJSON(JSON.parse(history[index]), () => {
      fabricCanvas.renderAll();
    });
  };

  const handleAddText = () => {
    if (!fabricCanvas || !text) return;

    const fabricText = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontSize: fontSize,
      fill: activeTextColor,
      backgroundColor: activeBackgroundColor || undefined,
      padding: 10,
      editable: true,
    });

    fabricCanvas.add(fabricText);
    fabricCanvas.setActiveObject(fabricText);
    fabricCanvas.renderAll();
    saveToHistory();
    setText("");
    toast.success("Text added successfully!");
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    const link = document.createElement('a');
    link.download = 'text-on-photo.png';
    link.href = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1
    });
    link.click();
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Text on Photo Editor</h1>
        <p className="text-xl text-muted-foreground">Add and customize text on your images</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUploader canvas={fabricCanvas} />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text Content</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to add"
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={12}
                  max={100}
                  step={1}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <ColorPicker color={activeTextColor} onChange={setActiveTextColor} />
                </div>
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <ColorPicker
                    color={activeBackgroundColor}
                    onChange={setActiveBackgroundColor}
                    allowTransparent
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddText} disabled={!text}>
                  <Type className="w-4 h-4 mr-2" />
                  Add Text
                </Button>
                <Button variant="outline" onClick={undo} disabled={historyIndex <= 0}>
                  <Undo className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={redo} disabled={historyIndex >= history.length - 1}>
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden bg-gray-50">
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