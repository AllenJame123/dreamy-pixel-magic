import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const FaviconGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  const generateFavicon = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
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
    </div>
  );
};

export default FaviconGenerator;