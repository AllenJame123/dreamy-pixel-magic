import { Canvas } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "./ColorPicker";
import { useState } from "react";
import { Type } from "lucide-react";

interface TextEditorProps {
  canvas: Canvas | null;
}

const TextEditor = ({ canvas }: TextEditorProps) => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("");

  const addText = () => {
    if (!canvas || !text) return;

    const fabricText = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontSize: fontSize,
      fill: textColor,
      backgroundColor: backgroundColor || undefined,
      padding: 10,
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
    setText("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Text Content</Label>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to add"
          />
          <Button onClick={addText} disabled={!text.trim()}>
            <Type className="w-4 h-4 mr-2" />
            Add Text
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Font Size: {fontSize}px</Label>
        <Input
          type="range"
          min="12"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Text Color</Label>
          <ColorPicker color={textColor} onChange={setTextColor} />
        </div>
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker
            color={backgroundColor}
            onChange={setBackgroundColor}
            allowTransparent
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;