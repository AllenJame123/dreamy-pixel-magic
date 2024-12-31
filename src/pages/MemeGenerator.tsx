import { useState } from "react";
import MemeForm from "@/components/meme-generator/MemeForm";
import GeneratedMeme from "@/components/meme-generator/GeneratedMeme";
import SpecialFeatures from "@/components/meme-generator/SpecialFeatures";
import FAQ from "@/components/meme-generator/FAQ";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

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
      // Start progress simulation
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      // Make the API call to generate the image
      const response = await fetch("/api/generate-meme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate meme");
      }

      const data = await response.json();
      
      // Clear interval and set final progress
      clearInterval(progressInterval);
      setProgress(100);
      
      // Update state with the generated image and text
      setGeneratedMeme(data.imageUrl);
      setTopText(top);
      setBottomText(bottom);
      
      toast.success("Meme generated successfully!");
    } catch (error) {
      toast.error("Failed to generate meme. Please try again.");
      console.error("Error generating meme:", error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
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
      toast.error("Failed to download meme");
      console.error("Error downloading meme:", error);
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
        <Card className="p-6">
          <GeneratedMeme 
            imageUrl={generatedMeme}
            topText={topText}
            bottomText={bottomText}
            onDownload={handleDownload}
          />
        </Card>
      )}

      <Card className="p-6">
        <SpecialFeatures />
      </Card>

      <FAQ />
    </div>
  );
};

export default MemeGenerator;