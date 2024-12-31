import { fabric } from "fabric";
import { Button } from "@/components/ui/button";
import { 
  MoveUp,
  MoveDown,
  Layers,
  Group,
  Ungroup
} from "lucide-react";

interface LayerControlsProps {
  canvas: fabric.Canvas | null;
}

const LayerControls = ({ canvas }: LayerControlsProps) => {
  const bringForward = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
      canvas.renderAll();
    }
  };

  const sendBackward = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackward(activeObject);
      canvas.renderAll();
    }
  };

  const group = () => {
    if (!canvas) return;
    const activeSelection = canvas.getActiveObjects();
    if (activeSelection.length > 1) {
      const group = new fabric.Group(activeSelection);
      canvas.discardActiveObject();
      activeSelection.forEach(obj => canvas.remove(obj));
      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.renderAll();
    }
  };

  const ungroup = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject() as fabric.Group;
    if (activeObject && activeObject.type === 'group') {
      const items = activeObject.getObjects();
      activeObject.destroy();
      canvas.remove(activeObject);
      canvas.add(...items);
      canvas.renderAll();
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Layer Controls</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={bringForward}
          title="Bring Forward"
        >
          <MoveUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={sendBackward}
          title="Send Backward"
        >
          <MoveDown className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={group}
          title="Group Objects"
        >
          <Group className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={ungroup}
          title="Ungroup Objects"
        >
          <Ungroup className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LayerControls;