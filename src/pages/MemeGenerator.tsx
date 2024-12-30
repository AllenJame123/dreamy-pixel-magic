import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { validatePrompt } from "@/utils/contentFilter";
import MemeForm from "@/components/meme-generator/MemeForm";
import GeneratedMeme from "@/components/meme-generator/GeneratedMeme";

const MemeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState<{
    imageUrl: string;
    topText: string;
    bottomText: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);

  const generateMeme = async (prompt: string, topText: string, bottomText: string) => {
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
        body: { prompt, topText, bottomText }
      });

      if (error) throw error;
      
      if (!data?.success) {
        throw new Error(data?.error || 'Failed to generate meme');
      }

      setGeneratedMeme({
        imageUrl: data.image,
        topText,
        bottomText
      });
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
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `meme-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
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
        <MemeForm
          onGenerate={generateMeme}
          isGenerating={isGenerating}
          progress={progress}
        />

        {generatedMeme && (
          <GeneratedMeme
            imageUrl={generatedMeme.imageUrl}
            topText={generatedMeme.topText}
            bottomText={generatedMeme.bottomText}
            onDownload={handleDownload}
          />
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