import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="resize-none h-20"
      />
    </div>
  );
};

export default MemeTextInput;