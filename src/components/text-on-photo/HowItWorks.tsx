import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Info className="w-6 h-6" />
        <h2 className="text-2xl font-bold">How It Works</h2>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">1. Upload Your Image</h3>
          <p className="text-muted-foreground">
            Start by uploading the image you want to add text to. Our editor supports common image formats like JPG and PNG.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">2. Add Your Text</h3>
          <p className="text-muted-foreground">
            Click the "Add Text" button and start typing. You can add multiple text elements and position them anywhere on your image by dragging.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">3. Customize the Style</h3>
          <p className="text-muted-foreground">
            Personalize your text with different fonts, sizes, colors, and styles. Make it bold, italic, or underlined to match your design needs.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">4. Download and Share</h3>
          <p className="text-muted-foreground">
            Once you're happy with your design, click the Download button to save your image with the added text. Your creation will be saved as a high-quality PNG file.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HowItWorks;