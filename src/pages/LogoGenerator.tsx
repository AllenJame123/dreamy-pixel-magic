import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

const LogoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generateLogo = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your logo");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 1000);

    try {
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;
      
      if (!data?.success) {
        throw new Error(data?.error || 'Failed to generate logo');
      }

      setGeneratedLogo(data.image);
      setProgress(100);
      toast.success("Logo generated successfully!");
    } catch (error: any) {
      console.error("Error generating logo:", error);
      toast.error(error.message || "Failed to generate logo. Please try again.");
      setGeneratedLogo(null);
    } finally {
      clearInterval(progressInterval);
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
              disabled={isGenerating}
            />
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Generating your logo...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1" />
              </div>
            )}
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