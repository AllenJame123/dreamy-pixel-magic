import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface TextStyle {
  color: string;
  yPosition: number;
  fontSize: number;
  fontFamily: string;
}

interface TextSettingsPanelProps {
  title: string;
  text: string;
  style: TextStyle;
  onTextChange: (text: string) => void;
  onStyleChange: (style: TextStyle) => void;
}

const TextSettingsPanel = ({ 
  title, 
  text, 
  style, 
  onTextChange,
  onStyleChange 
}: TextSettingsPanelProps) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <div className="space-y-2">
        <Label className="text-base">Text Content</Label>
        <Input
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={`Enter ${title.toLowerCase()}`}
          className="border-2"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base">Vertical Position</Label>
        <Slider
          value={[style.yPosition]}
          onValueChange={(value) => {
            onStyleChange({ ...style, yPosition: value[0] });
          }}
          min={title.toLowerCase().includes('top') ? 0 : 50}
          max={title.toLowerCase().includes('top') ? 50 : 100}
          step={1}
        />
      </div>
    </div>
  );
};

export default TextSettingsPanel;