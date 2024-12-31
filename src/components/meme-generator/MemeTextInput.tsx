import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MemeTextInputProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

const MemeTextInput = ({ label, value, onChange, placeholder }: MemeTextInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-base">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-2"
      />
    </div>
  );
};

export default MemeTextInput;