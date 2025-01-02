import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline } from "lucide-react";
import { fabric } from "fabric";

interface TextFormatControlsProps {
  canvas: fabric.Canvas | null;
}

const TextFormatControls = ({ canvas }: TextFormatControlsProps) => {
  const toggleStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      switch (style) {
        case 'bold':
          activeObject.set('fontWeight', activeObject.fontWeight === 'bold' ? 'normal' : 'bold');
          break;
        case 'italic':
          activeObject.set('fontStyle', activeObject.fontStyle === 'italic' ? 'normal' : 'italic');
          break;
        case 'underline':
          activeObject.set('underline', !activeObject.underline);
          break;
      }
      canvas.renderAll();
    }
  };

  return (
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
  );
};

export default TextFormatControls;