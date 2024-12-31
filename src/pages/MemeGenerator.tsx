import { useState } from "react";
import MemeForm from "@/components/meme-generator/MemeForm";
import GeneratedMeme from "@/components/meme-generator/GeneratedMeme";
import SpecialFeatures from "@/components/meme-generator/SpecialFeatures";
import HowItWorks from "@/components/meme-generator/HowItWorks";
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
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      const { data, error } = await supabase.functions.invoke("generate-meme", {
        body: { 
          prompt,
          model: "stabilityai/stable-diffusion-2",
          num_inference_steps: 20,
          guidance_scale: 7.5,
        }
      });

      clearInterval(progressInterval);
      
      if (error) {
        console.error("Generation error:", error);
        throw error;
      }

      if (!data?.imageUrl) {
        throw new Error("No image URL returned from generation");
      }

      setGeneratedMeme(data.imageUrl);
      setTopText(top);
      setBottomText(bottom);
      setProgress(100);
      toast.success("Meme generated successfully!");
    } catch (error: any) {
      console.error("Error generating meme:", error);
      toast.error(error.message || "Failed to generate meme. Please try again.");
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
    
    try {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement;
      if (!canvas) {
        throw new Error("Canvas not found");
      }

      const link = document.createElement("a");
      link.download = `meme-${Date.now()}.png`;
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

      <HowItWorks />

      <Card className="p-6">
        <SpecialFeatures />
      </Card>

      <FAQ />
    </div>
  );
};

export default MemeGenerator;