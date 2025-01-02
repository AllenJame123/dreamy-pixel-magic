import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { fabric } from "fabric";
import { Undo2, Redo2, Download } from "lucide-react";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      preserveObjectStacking: true,
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Save canvas state
  const saveState = () => {
    if (!canvas) return;
    setUndoStack(prev => [...prev, JSON.stringify(canvas)]);
    setRedoStack([]);
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result as string, (img) => {
        img.set({
          selectable: false,
        });
        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        });
        saveState();
        toast.success("Image uploaded successfully!");
      });
    };
    reader.readAsDataURL(file);
  };

  // Add text to canvas
  const addText = () => {
    if (!canvas) return;

    const text = (document.getElementById('textInput') as HTMLInputElement).value;
    const size = parseInt((document.getElementById('fontSize') as HTMLInputElement).value, 10);
    const color = (document.getElementById('fontColor') as HTMLInputElement).value;

    const textBox = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fontFamily: selectedFont,
      fontSize: size,
      fill: color,
      editable: true,
    });

    canvas.add(textBox);
    canvas.setActiveObject(textBox);
    saveState();
    toast.success("Text added successfully!");
  };

  // Undo functionality
  const handleUndo = () => {
    if (!canvas || undoStack.length === 0) return;
    
    const newRedoStack = [...redoStack, JSON.stringify(canvas)];
    const state = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);
    
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
    setRedoStack(newRedoStack);
    setUndoStack(newUndoStack);
    toast.info("Undo successful");
  };

  // Redo functionality
  const handleRedo = () => {
    if (!canvas || redoStack.length === 0) return;
    
    const newUndoStack = [...undoStack, JSON.stringify(canvas)];
    const state = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);
    
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
    setUndoStack(newUndoStack);
    setRedoStack(newRedoStack);
    toast.info("Redo successful");
  };

  // Download image
  const downloadImage = () => {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Text to Photo</h1>
          
          <div className="space-y-4">
            <Input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="textInput"
                type="text"
                placeholder="Enter text"
                className="w-full"
              />

              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                </SelectContent>
              </Select>

              <Input
                id="fontSize"
                type="number"
                defaultValue="20"
                placeholder="Font Size"
                className="w-full"
              />

              <Input
                id="fontColor"
                type="color"
                defaultValue="#000000"
                className="w-full h-10"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={addText} className="flex-1">
                Add Text
              </Button>
              <Button onClick={handleUndo} variant="outline" disabled={undoStack.length === 0}>
                <Undo2 className="w-4 h-4 mr-2" />
                Undo
              </Button>
              <Button onClick={handleRedo} variant="outline" disabled={redoStack.length === 0}>
                <Redo2 className="w-4 h-4 mr-2" />
                Redo
              </Button>
              <Button onClick={downloadImage} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <canvas 
            ref={canvasRef}
            className="max-w-full mx-auto border rounded-lg"
          />
        </Card>
      </div>
    </div>
  );
};

export default TextOnPhoto;