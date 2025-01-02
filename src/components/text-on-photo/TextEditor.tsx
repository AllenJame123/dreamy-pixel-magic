import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { fabric } from "fabric";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface TextEditorProps {
  canvas: fabric.Canvas | null;
}

const TextEditor = ({ canvas }: TextEditorProps) => {
  const [text, setText] = useState("");

  const addText = () => {
    if (!canvas || !text.trim()) return;

    const fabricText = new fabric.Text(text, {
      left: canvas.width! / 2,
      top: canvas.height! / 2,
      fontSize: 40,
      fill: '#000000',
      originX: 'center',
      originY: 'center'
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
    setText("");
  };

  const handleDownload = () => {
    if (!canvas) return;
    
    try {
      const link = document.createElement('a');
      link.download = 'text-on-photo.png';
      link.href = canvas.toDataURL({
        format: 'png',
        quality: 1
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
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to add"
          className="flex-grow"
        />
        <Button onClick={addText}>Add Text</Button>
      </div>
      <Button onClick={handleDownload} className="w-full">
        <Download className="w-4 h-4 mr-2" />
        Download Image
      </Button>
    </div>
  );
};

export default TextEditor;