import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
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
            <Button
              onClick={onDownload}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
              size="lg"
            >
              <Download className="w-6 h-6 mr-2" />
              Download Your Meme
            </Button>
          </div>
        </div>
      </Card>
      
      <HowItWorks />
    </div>
  );
};

export default GeneratedMeme;