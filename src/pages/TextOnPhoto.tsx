import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import TextFormatControls from "@/components/text-on-photo/TextFormatControls";
import { Upload, Download } from "lucide-react";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const initCanvas = () => {
    if (!canvasRef.current || canvas) return;
    
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      preserveObjectStacking: true,
    });
    
    setCanvas(newCanvas);
    return newCanvas;
  };

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await document.fonts.ready;
        const fontFamilies = ['Arial', 'Courier New', 'Times New Roman'];
        
        // Check if fonts are available
        const fontsAvailable = fontFamilies.every(font => 
          document.fonts.check(`12px "${font}"`)
        );

        if (!fontsAvailable) {
          console.warn('Some fonts are not available');
          toast.error("Some fonts might not be available");
        }

        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        toast.error("Error loading fonts");
      }
    };

    loadFonts();
  }, []);

  const saveState = () => {
    if (!canvas) return;
    setUndoStack([...undoStack, JSON.stringify(canvas)]);
    setRedoStack([]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      fabric.Image.fromURL(e.target.result.toString(), (img) => {
        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
          selectable: false,
        });
        saveState();
        toast.success("Image uploaded successfully");
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddText = () => {
    if (!canvas || !fontsLoaded) {
      toast.error("Please wait for fonts to load");
      return;
    }
    
    const text = (document.getElementById('textInput') as HTMLInputElement)?.value;
    if (!text) {
      toast.error("Please enter some text");
      return;
    }

    const size = parseInt((document.getElementById('fontSize') as HTMLInputElement)?.value || "20", 10);
    const color = (document.getElementById('fontColor') as HTMLInputElement)?.value;

    const textBox = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontFamily: selectedFont,
      fontSize: size,
      fill: color,
      editable: true,
    });

    canvas.add(textBox);
    canvas.setActiveObject(textBox);
    canvas.renderAll();
    saveState();
    toast.success("Text added successfully");
  };

  const handleUndo = () => {
    if (!canvas || undoStack.length === 0) return;
    
    setRedoStack([...redoStack, JSON.stringify(canvas)]);
    const state = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
    toast.info("Undo successful");
  };

  const handleRedo = () => {
    if (!canvas || redoStack.length === 0) return;
    
    setUndoStack([...undoStack, JSON.stringify(canvas)]);
    const state = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
    toast.info("Redo successful");
  };

  const handleDownload = () => {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Image downloaded successfully!");
  };

  useEffect(() => {
    initCanvas();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Online Image Text Editor</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <div className="relative flex-1">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
            <Upload className="mr-2 h-4 w-4" />
            Choose Image
          </Button>
        </div>
        
        <Button 
          onClick={handleDownload} 
          className="flex-1 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      <div className="grid gap-4 w-full max-w-2xl">
        <div className="flex flex-wrap gap-2 items-center">
          <Input
            id="textInput"
            placeholder="Enter text"
            className="flex-1 min-w-[200px]"
          />
          
          <Select value={selectedFont} onValueChange={setSelectedFont}>
            <SelectTrigger className="w-[180px]">
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
            placeholder="Font Size"
            defaultValue="20"
            className="w-24"
          />
          
          <Input
            id="fontColor"
            type="color"
            defaultValue="#000000"
            className="w-24 h-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2">
            <Button onClick={handleAddText}>Add Text</Button>
            <TextFormatControls canvas={canvas} />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleUndo} 
              disabled={undoStack.length === 0}
            >
              Undo
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRedo} 
              disabled={redoStack.length === 0}
            >
              Redo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextOnPhoto;
