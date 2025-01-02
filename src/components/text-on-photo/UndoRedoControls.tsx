import { Button } from "@/components/ui/button";
import { Undo2, Redo2 } from "lucide-react";
import { fabric } from "fabric";
import { toast } from "sonner";

interface UndoRedoControlsProps {
  canvas: fabric.Canvas | null;
  undoStack: string[];
  redoStack: string[];
  setUndoStack: (stack: string[]) => void;
  setRedoStack: (stack: string[]) => void;
}

export const UndoRedoControls = ({
  canvas,
  undoStack,
  redoStack,
  setUndoStack,
  setRedoStack,
}: UndoRedoControlsProps) => {
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

  return (
    <div className="flex gap-2">
      <Button onClick={handleUndo} variant="outline" disabled={undoStack.length === 0}>
        <Undo2 className="w-4 h-4 mr-2" />
        Undo
      </Button>
      <Button onClick={handleRedo} variant="outline" disabled={redoStack.length === 0}>
        <Redo2 className="w-4 h-4 mr-2" />
        Redo
      </Button>
    </div>
  );
};