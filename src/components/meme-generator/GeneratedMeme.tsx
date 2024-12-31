import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
  yPosition: number;
}

const GeneratedMeme = ({ 
  imageUrl, 
  topText, 
  bottomText, 
  onDownload,
  onUpdateText 
}: GeneratedMemeProps) => {
  const [topStyle, setTopStyle] = useState<TextStyle>({ color: '#ffffff', yPosition: 10 });
  const [bottomStyle, setBottomStyle] = useState<TextStyle>({ color: '#ffffff', yPosition: 90 });

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my meme!',
          text: 'I created this meme using the AI Meme Generator',
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share meme');
    }
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