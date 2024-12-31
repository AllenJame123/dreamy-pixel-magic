import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface TextStyle {
  color: string;
  yPosition: number;
  width: number;
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
  const colors = [
    '#ffffff', '#9b87f5', '#F2FCE2', '#8B5CF6', '#0EA5E9',
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'
  ];

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
      <div className="space-y-2">
        <Label className="text-base">Text Width (%)</Label>
        <Slider
          value={[style.width]}
          onValueChange={(value) => {
            onStyleChange({ ...style, width: value[0] });
          }}
          min={40}
          max={100}
          step={1}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base">Text Color</Label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => onStyleChange({ ...style, color })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextSettingsPanel;