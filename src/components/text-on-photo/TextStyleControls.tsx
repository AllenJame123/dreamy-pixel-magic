import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextStyleControlsProps {
  onStyleToggle: (style: 'bold' | 'italic' | 'underline') => void;
  onFontChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultFontSize?: string;
}

const TextStyleControls = ({
  onStyleToggle,
  onFontChange,
  onSizeChange,
  defaultFontSize = "85"
}: TextStyleControlsProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Label htmlFor="textInput" className="text-sm font-medium">Text:</Label>
        <Input
          id="textInput"
          placeholder="Enter text"
          className="max-w-[200px]"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Label htmlFor="fontSelect" className="text-sm font-medium">Font:</Label>
        <select 
          id="fontSelect" 
          onChange={onFontChange}
          className="h-10 px-3 rounded-md border border-input bg-background"
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="fontSize" className="text-sm font-medium">Size:</Label>
        <Input 
          type="number" 
          id="fontSize" 
          placeholder="Size" 
          defaultValue={defaultFontSize}
          onChange={onSizeChange}
          className="w-20"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">Style:</Label>
        <div className="flex gap-1">
          <Button onClick={() => onStyleToggle('bold')} variant="outline" size="sm" className="font-bold">B</Button>
          <Button onClick={() => onStyleToggle('italic')} variant="outline" size="sm" className="italic">I</Button>
          <Button onClick={() => onStyleToggle('underline')} variant="outline" size="sm" className="uppercase underline">U</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="fontColor" className="text-sm font-medium">Color:</Label>
        <Input 
          type="color" 
          id="fontColor" 
          defaultValue="#000000"
          className="w-12 h-10 p-1"
        />
      </div>
    </div>
  );
};

export default TextStyleControls;