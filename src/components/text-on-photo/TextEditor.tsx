import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "./ColorPicker";
import { useState } from "react";
import { Type, Bold, Italic, Underline } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TextEditorProps {
  canvas: fabric.Canvas | null;
}

const MAX_CHARS = 500;
const FONT_FAMILIES = [
  "Arial",
  "Times New Roman",
  "Helvetica",
  "Georgia",
  "Impact",
  "Verdana",
  "Comic Sans MS",
];

const TextEditor = ({ canvas }: TextEditorProps) => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");

  const addText = () => {
    if (!canvas || !text) return;

    const fabricText = new fabric.IText(text, {
      left: canvas.getCenter().left,
      top: canvas.getCenter().top,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fill: textColor,
      backgroundColor: backgroundColor || undefined,
      padding: 10,
      originX: 'center',
      originY: 'center',
      cornerStyle: 'circle',
      transparentCorners: false,
      cornerColor: '#2563eb',
      cornerStrokeColor: '#ffffff',
      borderColor: '#2563eb',
      editingBorderColor: '#2563eb',
      strokeWidth: 1,
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
    setText("");
  };

  const toggleStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      const iTextObject = activeObject as fabric.IText;
      switch (style) {
        case 'bold':
          iTextObject.set({ fontWeight: iTextObject.get('fontWeight') === 'bold' ? 'normal' : 'bold' });
          break;
        case 'italic':
          iTextObject.set({ fontStyle: iTextObject.get('fontStyle') === 'italic' ? 'normal' : 'italic' });
          break;
        case 'underline':
          iTextObject.set({ underline: !iTextObject.get('underline') });
          break;
      }
      canvas.renderAll();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Text Content</Label>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setText(e.target.value);
              }
            }}
            placeholder="Enter text to add"
            maxLength={MAX_CHARS}
          />
          <Button onClick={addText} disabled={!text.trim()}>
            <Type className="w-4 h-4 mr-2" />
            Add Text
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {text.length}/{MAX_CHARS} characters
        </p>
      </div>

      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Font Size: {fontSize}px</Label>
        <Input
          type="range"
          min="12"
          max="200"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleStyle('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleStyle('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleStyle('underline')}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
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