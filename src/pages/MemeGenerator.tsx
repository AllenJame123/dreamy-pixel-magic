import { useState } from "react";
import MemeForm from "@/components/meme-generator/MemeForm";
import GeneratedMeme from "@/components/meme-generator/GeneratedMeme";
import SpecialFeatures from "@/components/meme-generator/SpecialFeatures";
import FAQ from "@/components/meme-generator/FAQ";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const MemeGenerator = () => {
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const handleGenerate = async (prompt: string, top: string, bottom: string) => {
    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Faster progress simulation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 70) return prev + 20;
          if (prev < 90) return prev + 5;
          return prev;
        });
      }, 300);

      // Generate image using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("generate-meme", {
        body: { prompt }
      });

      clearInterval(progressInterval);
      
      if (error) throw error;
      if (!data?.imageUrl) throw new Error("No image URL returned");

      setGeneratedMeme(data.imageUrl);
      setTopText(top);
      setBottomText(bottom);
      setProgress(100);
      toast.success("Meme generated successfully!");
    } catch (error) {
      console.error("Error generating meme:", error);
      toast.error("Failed to generate meme. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateText = (position: 'top' | 'bottom', text: string) => {
    if (position === 'top') {
      setTopText(text);
    } else {
      setBottomText(text);
    }
  };

  const handleDownload = () => {
    if (!generatedMeme) return;
    
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (!canvas) {
      toast.error("Could not download meme");
      return;
    }

    try {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Meme downloaded successfully!");
    } catch (error) {
      console.error("Error downloading meme:", error);
      toast.error("Failed to download meme");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Free AI Meme Generator</h1>
        <p className="text-xl text-muted-foreground">Create and customize hilarious memes in seconds</p>
      </div>

      <Card className="p-6">
        <MemeForm 
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          progress={progress}
        />
      </Card>

      {generatedMeme && (
        <GeneratedMeme 
          imageUrl={generatedMeme}
          topText={topText}
          bottomText={bottomText}
          onDownload={handleDownload}
          onUpdateText={handleUpdateText}
        />
      )}

      <Card className="p-6">
        <SpecialFeatures />
      </Card>

      <FAQ />
    </div>
  );
};

export default MemeGenerator;