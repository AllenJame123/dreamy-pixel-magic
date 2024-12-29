import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, PenLine, Sliders, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import GenerateButton from "@/components/image-generator/GenerateButton";
import GeneratedLogo from "@/components/logo-generator/GeneratedLogo";
import { Card } from "@/components/ui/card";
import FAQ from "@/components/logo-generator/FAQ";

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
        return prev + 15;
      });
    }, 500);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      generateLogo();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Free AI Logo Generator Online - No Signup Required</h1>
        <h2 className="text-xl text-muted-foreground">Create professional logos for your brand in seconds</h2>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="glass-panel p-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Describe your logo
            </label>
            <Input
              placeholder="e.g., A modern minimalist tech company logo with abstract shapes in blue and white"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
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
            <GenerateButton
              onClick={generateLogo}
              isGenerating={isGenerating}
              disabled={isGenerating || !prompt.trim()}
            />
          </div>
        </Card>

        {generatedLogo && (
          <GeneratedLogo
            logoUrl={generatedLogo}
            prompt={prompt}
          />
        )}

        <Card className="glass-panel p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center">How It Works</h2>
          <ol className="space-y-6 text-lg">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <PenLine className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 pt-2">
                <span className="font-bold text-primary">1.</span>
                <span><strong>Describe Your Logo:</strong> Enter a detailed description of the logo you want to create, including style, colors, and any specific elements.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sliders className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 pt-2">
                <span className="font-bold text-primary">2.</span>
                <span><strong>Choose Format:</strong> Select your preferred download format (PNG, JPG, or WebP) for your generated logo.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 pt-2">
                <span className="font-bold text-primary">3.</span>
                <span><strong>Download Your Logo:</strong> Once generated, download your logo in your preferred format, ready to use for your brand.</span>
              </div>
            </li>
          </ol>
        </Card>

        <Card className="glass-panel p-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold">Professional Quality</h3>
                <p className="text-muted-foreground">Generate high-resolution logos suitable for both digital and print use.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Multiple Formats</h3>
                <p className="text-muted-foreground">Download your logo in PNG, JPG, or WebP format to suit your needs.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Instant Generation</h3>
                <p className="text-muted-foreground">Create your logo in seconds with our advanced AI technology.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">No Design Skills Needed</h3>
                <p className="text-muted-foreground">Simply describe what you want, and our AI will create it for you.</p>
              </div>
            </div>
          </div>
        </Card>

        <FAQ />
      </div>
    </div>
  );
};

export default LogoGenerator;