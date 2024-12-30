import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, PenLine, Sliders, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { validatePrompt } from "@/utils/contentFilter";

const FaviconGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  const generateFavicon = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    // Validate prompt content
    const validationResult = validatePrompt(prompt);
    if (!validationResult.isValid) {
      toast.error(validationResult.message);
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-favicon", {
        body: { prompt: prompt }
      });

      if (error) throw error;
      if (!data?.image) throw new Error("No image generated");

      setFaviconUrl(data.image);
      toast.success("Favicon generated successfully!");
    } catch (error) {
      console.error("Error generating favicon:", error);
      toast.error("Failed to generate favicon. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadFavicon = async () => {
    if (!faviconUrl) return;

    try {
      const response = await fetch(faviconUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "favicon.ico";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Favicon downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download favicon");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">AI Favicon Generator</h1>
        <p className="text-muted-foreground">
          Create unique favicons for your website using AI. Just describe what you want!
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Describe your favicon (e.g., 'minimalist letter A in blue')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <Button
            className="w-full"
            onClick={generateFavicon}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Favicon"
            )}
          </Button>
        </div>
      </Card>

      {faviconUrl && (
        <Card className="p-6 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={faviconUrl}
                alt="Generated Favicon"
                className="w-32 h-32 object-contain"
              />
            </div>
            <Button onClick={downloadFavicon} variant="secondary">
              Download Favicon
            </Button>
          </div>
        </Card>
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
              <span><strong>Describe Your Favicon:</strong> Enter a detailed description of the favicon you want to create, including style, colors, and any specific elements.</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sliders className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 pt-2">
              <span className="font-bold text-primary">2.</span>
              <span><strong>AI Generation:</strong> Our AI will create a unique favicon based on your description, optimized for website use.</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 pt-2">
              <span className="font-bold text-primary">3.</span>
              <span><strong>Download Your Favicon:</strong> Once generated, download your favicon in ICO format, ready to use on your website.</span>
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
              <p className="text-muted-foreground">Generate high-quality favicons suitable for all modern browsers.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">ICO Format</h3>
              <p className="text-muted-foreground">Download your favicon in the standard ICO format used by websites.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Instant Generation</h3>
              <p className="text-muted-foreground">Create your favicon in seconds with our advanced AI technology.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">No Design Skills Needed</h3>
              <p className="text-muted-foreground">Simply describe what you want, and our AI will create it for you.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FaviconGenerator;