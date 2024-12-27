import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LogoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);

  const generateLogo = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your logo");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: { prompt: `Create a minimalist logo for: ${prompt}` }
      });

      if (error) throw error;
      setGeneratedLogo(data.image);
      toast.success("Logo generated successfully!");
    } catch (error) {
      console.error("Error generating logo:", error);
      toast.error("Failed to generate logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">AI Logo Generator</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass-panel p-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Describe your logo
            </label>
            <Input
              placeholder="e.g., A modern tech company logo with abstract shapes"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={generateLogo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Logo"
              )}
            </Button>
          </div>
        </div>

        {generatedLogo && (
          <div className="glass-panel p-6 animate-image-fade">
            <img
              src={generatedLogo}
              alt="Generated logo"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoGenerator;