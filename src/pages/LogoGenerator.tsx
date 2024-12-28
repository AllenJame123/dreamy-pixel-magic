import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LogoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState("png");
  const [downloadSize, setDownloadSize] = useState("512");
  const [downloadShape, setDownloadShape] = useState("square");

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

  const handleDownload = async () => {
    if (!generatedLogo) return;

    try {
      // Create a canvas with the desired size
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Set canvas dimensions
      const size = parseInt(downloadSize);
      canvas.width = downloadShape === 'square' ? size : size;
      canvas.height = downloadShape === 'square' ? size : size * 0.75;

      // Create a temporary image to load the base64 data
      const img = new Image();
      img.src = generatedLogo;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Draw the image on the canvas with the desired shape
      if (downloadShape === 'circle') {
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to blob and download
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logo-${Date.now()}.${downloadFormat}`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Logo downloaded successfully!');
      }, `image/${downloadFormat}`);
    } catch (error) {
      console.error('Error downloading logo:', error);
      toast.error('Failed to download logo');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">AI Logo Generator</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass-panel p-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Describe your logo
            </label>
            <Input
              placeholder="e.g., A modern tech company logo with abstract shapes"
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
            <Button
              onClick={generateLogo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Logo"
              )}
            </Button>
          </div>
        </div>

        {generatedLogo && (
          <div className="glass-panel p-6 space-y-6 animate-image-fade">
            <img
              src={generatedLogo}
              alt="Generated logo"
              className="w-full h-auto rounded-lg"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={downloadFormat} onValueChange={setDownloadFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={downloadSize} onValueChange={setDownloadSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="256">256px</SelectItem>
                    <SelectItem value="512">512px</SelectItem>
                    <SelectItem value="1024">1024px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Shape</Label>
                <Select value={downloadShape} onValueChange={setDownloadShape}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="rectangle">Rectangle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  variant="secondary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Logo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoGenerator;