import { useState } from "react";
import MemeForm from "@/components/meme-generator/MemeForm";
import GeneratedMeme from "@/components/meme-generator/GeneratedMeme";
import SpecialFeatures from "@/components/meme-generator/SpecialFeatures";
import FAQ from "@/components/meme-generator/FAQ";
import { Card } from "@/components/ui/card";

const MemeGenerator = () => {
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const handleGenerate = (prompt: string, top: string, bottom: string) => {
    setIsGenerating(true);
    setProgress(0);
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    setTopText(top);
    setBottomText(bottom);
    setGeneratedMeme(prompt); // In a real implementation, this would be the URL from the API
  };

  const handleDownload = () => {
    if (!generatedMeme) return;
    
    const link = document.createElement('a');
    link.href = generatedMeme;
    link.download = 'generated-meme.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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