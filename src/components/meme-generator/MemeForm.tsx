import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { validatePrompt } from "@/utils/contentFilter";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface MemeFormProps {
  onGenerate: (prompt: string, topText: string, bottomText: string) => void;
  isGenerating: boolean;
  progress: number;
}

const MemeForm = ({ onGenerate, isGenerating, progress }: MemeFormProps) => {
  const [prompt, setPrompt] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validatePrompt(prompt);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a description for your meme image");
      return;
    }

    onGenerate(prompt.trim(), topText.trim(), bottomText.trim());
  };

  return (
    <Card className="glass-panel p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-1">
            Describe your meme image (Required)
          </Label>
          <Input
            placeholder="e.g., A funny cat wearing sunglasses and a business suit"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full"
            disabled={isGenerating}
            required
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">
            Top Text (Optional)
          </Label>
          <Input
            placeholder="Enter top text for your meme"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            className="w-full"
            disabled={isGenerating}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">
            Bottom Text (Optional)
          </Label>
          <Input
            placeholder="Enter bottom text for your meme"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className="w-full"
            disabled={isGenerating}
          />
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Generating your meme...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}

        <Button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Meme'
          )}
        </Button>
      </form>
    </Card>
  );
};

export default MemeForm;