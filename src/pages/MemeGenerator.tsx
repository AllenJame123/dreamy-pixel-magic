import { useState } from "react";
import MemeForm from "@/components/meme-generator/MemeForm";
import GeneratedMeme from "@/components/meme-generator/GeneratedMeme";
import SpecialFeatures from "@/components/meme-generator/SpecialFeatures";
import FAQ from "@/components/meme-generator/FAQ";
import { Card } from "@/components/ui/card";

const MemeGenerator = () => {
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Free AI Meme Generator</h1>
        <p className="text-xl text-muted-foreground">Create and customize hilarious memes in seconds</p>
      </div>

      <Card className="p-6">
        <MemeForm onGenerate={setGeneratedMeme} />
      </Card>

      {generatedMeme && (
        <Card className="p-6">
          <GeneratedMeme imageUrl={generatedMeme} />
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