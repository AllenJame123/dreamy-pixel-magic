import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { validatePrompt } from "@/utils/contentFilter";

const MemeGenerator = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generateMeme = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your meme");
      return;
    }

    // Validate prompt content
    const validationResult = validatePrompt(prompt);
    if (!validationResult.isValid) {
      toast.error(validationResult.message);
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 15;
      });
    }, 500);

    try {
      const { data, error } = await supabase.functions.invoke('generate-meme', {
        body: { 
          prompt: prompt.trim(),
          topText: topText.trim(),
          bottomText: bottomText.trim()
        }
      });

      if (error) throw error;
      
      if (!data?.success) {
        throw new Error(data?.error || 'Failed to generate meme');
      }

      setGeneratedMeme(data.image);
      setProgress(100);
      toast.success("Meme generated successfully!");
    } catch (error: any) {
      console.error("Error generating meme:", error);
      toast.error(error.message || "Failed to generate meme. Please try again.");
      setGeneratedMeme(null);
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedMeme) return;
    
    try {
      const response = await fetch(generatedMeme);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meme-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Meme downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download meme');
      console.error('Download error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Free AI Meme Generator Online - No Signup Required</h1>
        <h2 className="text-xl text-muted-foreground">Create hilarious memes with AI-generated images and custom text</h2>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="glass-panel p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe your meme image
              </label>
              <Input
                placeholder="e.g., A funny cat wearing sunglasses and a business suit"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full"
                disabled={isGenerating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Top Text
              </label>
              <Input
                placeholder="Enter top text for your meme"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full"
                disabled={isGenerating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bottom Text
              </label>
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
              onClick={generateMeme}
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Meme"}
            </Button>
          </div>
        </Card>

        {generatedMeme && (
          <Card className="glass-panel p-6 space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <img
                src={generatedMeme}
                alt={prompt}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              onClick={handleDownload}
              className="w-full"
              variant="secondary"
            >
              Download Meme
            </Button>
          </Card>
        )}

        <Card className="glass-panel p-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">How It Works</h2>
            <ol className="space-y-4">
              <li className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Describe the image you want for your meme</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Add your custom top and bottom text</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Generate and download your custom meme</span>
              </li>
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MemeGenerator;