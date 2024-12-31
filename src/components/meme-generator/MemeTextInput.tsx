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
        className="resize-none h-24 w-full max-w-full overflow-auto whitespace-pre-wrap break-words"
        maxLength={100}
      />
      <p className="text-sm text-muted-foreground">
        {value.length}/100 characters
      </p>
    </div>
  );
};

export default MemeTextInput;