import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  allowTransparent?: boolean;
}

export const ColorPicker = ({ color, onChange, allowTransparent = false }: ColorPickerProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative flex-shrink-0">
        <Input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-1 rounded-lg"
        />
      </div>
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow"
        placeholder={allowTransparent ? "Color or transparent" : "Color"}
      />
      {allowTransparent && (
        <button
          onClick={() => onChange("")}
          className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
        >
          Clear
        </button>
      )}
    </div>
  );
};