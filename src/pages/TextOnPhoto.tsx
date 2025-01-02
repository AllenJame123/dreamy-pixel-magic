import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, Download } from "lucide-react";
import TextFormatControls from "@/components/text-on-photo/TextFormatControls";
import FontControls from "@/components/text-on-photo/FontControls";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import CanvasContainer from "@/components/text-on-photo/CanvasContainer";

const TextOnPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await document.fonts.ready;
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        toast.error("Error loading fonts");
      }
    };

    loadFonts();
  }, []);

  const handleCanvasInit = (fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
    
    // Setup text editing events
    fabricCanvas.on('text:selection', (e) => {
      const textObject = e.target as fabric.IText;
      if (textObject) {
        setSelectedFont(textObject.fontFamily || 'Arial');
      }
    });
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

    const textBox = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontFamily: selectedFont,
      fontSize: 40,
      fill: '#000000',
      editable: true,
    });

    canvas.add(textBox);
    canvas.setActiveObject(textBox);
    canvas.renderAll();
    toast.success("Text added successfully");
  };

  const handleDownload = () => {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Online Image Text Editor</h1>
      
      <div className="w-full">
        <ImageUploader canvas={canvas} saveState={() => {}} />
      </div>

      <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
        <CanvasContainer
          canvasRef={canvasRef}
          containerRef={containerRef}
          onCanvasInit={handleCanvasInit}
        />
      </div>

      <Button 
        onClick={handleDownload} 
        className="w-full sm:w-auto bg-primary hover:bg-primary/90"
        size="lg"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Image
      </Button>

      <div className="grid gap-4 w-full max-w-2xl">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              id="textInput"
              placeholder="Enter text"
              className="w-full"
            />
          </div>
          
          <Button onClick={handleAddText} className="bg-primary">
            Add Text
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FontControls
            canvas={canvas}
            selectedFont={selectedFont}
            onFontChange={setSelectedFont}
          />
          <TextFormatControls canvas={canvas} />
        </div>
      </div>
    </div>
  );
};

export default TextOnPhoto;