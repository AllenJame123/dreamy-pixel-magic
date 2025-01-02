import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { fabric } from "fabric";
import { Download, Type } from "lucide-react";
import { toast } from "sonner";

interface TextEditorProps {
  canvas: fabric.Canvas | null;
}

const TextEditor = ({ canvas }: TextEditorProps) => {
  const [text, setText] = useState("");

  const addText = () => {
    if (!canvas || !text.trim()) {
      toast.error("Please enter some text first!");
      return;
    }

    const fabricText = new fabric.IText(text, {
      left: canvas.width! / 2,
      top: canvas.height! / 2,
      fontSize: 40,
      fill: '#000000',
      fontFamily: 'Arial',
      originX: 'center',
      originY: 'center',
      editable: true
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
    setText("");
    toast.success("Text added! You can now drag, resize, and edit it directly on the image.");
  };

  const handleDownload = () => {
    if (!canvas) return;
    
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
        withoutTransform: false,
        enableRetinaScaling: true,
      });

      const link = document.createElement('a');
      link.download = 'text-on-photo.png';
      link.href = dataURL;
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Add Text to Image</h3>
      <div className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="flex-grow"
        />
        <Button onClick={addText} className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          Add Text
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Tip: After adding text, you can:
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Drag to reposition</li>
          <li>Double-click to edit</li>
          <li>Use corners to resize</li>
        </ul>
      </div>
      <Button onClick={handleDownload} className="w-full mt-4">
        <Download className="w-4 h-4 mr-2" />
        Download Image
      </Button>
    </div>
  );
};

export default TextEditor;