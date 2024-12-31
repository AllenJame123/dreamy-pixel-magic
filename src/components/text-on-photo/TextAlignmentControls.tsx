import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  AlignJustify,
  MoveVertical,
  MoveHorizontal
} from "lucide-react";

interface TextAlignmentControlsProps {
  canvas: fabric.Canvas | null;
}

const TextAlignmentControls = ({ canvas }: TextAlignmentControlsProps) => {
  const handleAlign = (alignment: string) => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject() as fabric.IText;
    if (activeObject && activeObject.type === 'i-text') {
      (activeObject as fabric.IText).set({ textAlign: alignment });
      canvas.renderAll();
    }
  };

  const handleCenter = (axis: 'horizontal' | 'vertical') => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    if (axis === 'horizontal') {
      const center = canvas.getCenter().left;
      activeObject.set('left', center);
      activeObject.setCoords();
    } else {
      const center = canvas.getCenter().top;
      activeObject.set('top', center);
      activeObject.setCoords();
    }
    
    canvas.renderAll();
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Text Alignment</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAlign('left')}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAlign('center')}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAlign('right')}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAlign('justify')}
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleCenter('horizontal')}
          title="Center Horizontally"
        >
          <MoveHorizontal className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleCenter('vertical')}
          title="Center Vertically"
        >
          <MoveVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TextAlignmentControls;