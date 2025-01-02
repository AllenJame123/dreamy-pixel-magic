import { Button } from "@/components/ui/button";
import { fabric } from "fabric";
import { toast } from "sonner";

interface CanvasControlsProps {
  canvas: fabric.Canvas | null;
  undoStack: string[];
  redoStack: string[];
  setUndoStack: (stack: string[]) => void;
  setRedoStack: (stack: string[]) => void;
}

const CanvasControls = ({
  canvas,
  undoStack,
  redoStack,
  setUndoStack,
  setRedoStack,
}: CanvasControlsProps) => {
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

  const handleDownload = () => {
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL({ format: 'png' });
    link.click();
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleUndo} variant="outline" disabled={undoStack.length === 0}>
        Undo
      </Button>
      <Button onClick={handleRedo} variant="outline" disabled={redoStack.length === 0}>
        Redo
      </Button>
      <Button onClick={handleDownload} variant="secondary">
        Download Image
      </Button>
    </div>
  );
};

export default CanvasControls;