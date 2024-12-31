import { Card } from "@/components/ui/card";
import MemePreview from "./MemePreview";
import MemeTextInput from "./MemeTextInput";
import MemeActions from "./MemeActions";
import HowItWorks from "./HowItWorks";

interface GeneratedMemeProps {
  imageUrl: string;
  topText: string;
  bottomText: string;
  onDownload: () => void;
  onUpdateText: (position: 'top' | 'bottom', text: string) => void;
}

const GeneratedMeme = ({ 
  imageUrl, 
  topText, 
  bottomText, 
  onDownload,
  onUpdateText 
}: GeneratedMemeProps) => {
  const defaultStyle = {
    color: '#ffffff',
    fontSize: 48,
    fontFamily: 'Impact'
  };

  return (
    <div className="space-y-8">
      <Card className="glass-panel p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Your Meme</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <MemeTextInput
              label="Top Text (Optional)"
              value={topText}
              onChange={(text) => onUpdateText('top', text)}
              placeholder="Enter top text for your meme"
            />
            <MemeTextInput
              label="Bottom Text (Optional)"
              value={bottomText}
              onChange={(text) => onUpdateText('bottom', text)}
              placeholder="Enter bottom text for your meme"
            />
          </div>

          <div className="space-y-4">
            <MemePreview
              imageUrl={imageUrl}
              topText={topText}
              bottomText={bottomText}
              topStyle={defaultStyle}
              bottomStyle={defaultStyle}
            />
            <MemeActions onDownload={onDownload} />
          </div>
        </div>
      </Card>
      
      <HowItWorks />
    </div>
  );
};

export default GeneratedMeme;