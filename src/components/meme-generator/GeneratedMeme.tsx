import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import TextSettingsPanel from "./TextSettingsPanel";
import MemePreview from "./MemePreview";
import HowItWorks from "./HowItWorks";

interface GeneratedMemeProps {
  imageUrl: string;
  topText: string;
  bottomText: string;
  onDownload: () => void;
  onUpdateText: (position: 'top' | 'bottom', text: string) => void;
}

interface TextStyle {
  color: string;
  fontSize: number;
  fontFamily: string;
}

const GeneratedMeme = ({ 
  imageUrl, 
  topText, 
  bottomText, 
  onDownload,
  onUpdateText 
}: GeneratedMemeProps) => {
  const [topStyle, setTopStyle] = useState<TextStyle>({ 
    color: '#ffffff',
    fontSize: 48,
    fontFamily: 'Impact'
  });
  
  const [bottomStyle, setBottomStyle] = useState<TextStyle>({ 
    color: '#ffffff',
    fontSize: 48,
    fontFamily: 'Impact'
  });

  const colors = [
    { value: '#ffffff', label: 'White' },
    { value: '#9b87f5', label: 'Purple' },
    { value: '#F2FCE2', label: 'Light Green' },
    { value: '#8B5CF6', label: 'Vivid Purple' },
    { value: '#0EA5E9', label: 'Ocean Blue' },
    { value: '#ff0000', label: 'Red' },
    { value: '#00ff00', label: 'Green' },
    { value: '#0000ff', label: 'Blue' },
    { value: '#ffff00', label: 'Yellow' },
    { value: '#ff00ff', label: 'Magenta' }
  ];

  const fonts = [
    'Impact',
    'Arial',
    'Comic Sans MS',
    'Helvetica',
    'Times New Roman'
  ];

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my meme!',
          text: 'I created this meme using the AI Meme Generator',
          url: window.location.href
        });
      } else {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share meme");
    }
  };

  const updateBothStyles = (updates: Partial<TextStyle>) => {
    setTopStyle(prev => ({ ...prev, ...updates }));
    setBottomStyle(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-8">
      <Card className="glass-panel p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Your Meme</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TextSettingsPanel
              title="Top Text Settings"
              text={topText}
              style={topStyle}
              onTextChange={(text) => onUpdateText('top', text)}
              onStyleChange={setTopStyle}
            />
            <TextSettingsPanel
              title="Bottom Text Settings"
              text={bottomText}
              style={bottomStyle}
              onTextChange={(text) => onUpdateText('bottom', text)}
              onStyleChange={setBottomStyle}
            />
            
            {/* Global Text Settings */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary">Global Text Settings</h3>
              
              <div className="space-y-2">
                <Label className="text-base">Text Color</Label>
                <Select 
                  value={topStyle.color}
                  onValueChange={(value) => updateBothStyles({ color: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem 
                        key={color.value} 
                        value={color.value}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: color.value }}
                        />
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Font Family</Label>
                <Select 
                  value={topStyle.fontFamily}
                  onValueChange={(value) => updateBothStyles({ fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font} value={font}>
                        <span style={{ fontFamily: font }}>{font}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Font Size</Label>
                <Slider
                  value={[topStyle.fontSize]}
                  onValueChange={(value) => updateBothStyles({ fontSize: value[0] })}
                  min={24}
                  max={72}
                  step={2}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <MemePreview
              imageUrl={imageUrl}
              topText={topText}
              bottomText={bottomText}
              topStyle={topStyle}
              bottomStyle={bottomStyle}
            />
            <div className="flex gap-2">
              <Button
                onClick={onDownload}
                className="flex-1 bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Meme
              </Button>
              <Button
                onClick={handleShare}
                variant="secondary"
                size="lg"
                className="bg-white/90 hover:bg-white/95 transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <HowItWorks />
    </div>
  );
};

export default GeneratedMeme;