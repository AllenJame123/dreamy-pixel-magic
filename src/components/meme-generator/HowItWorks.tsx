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
          <h3 className="font-semibold text-lg">1. Generate Your Base Image</h3>
          <p className="text-muted-foreground">
            Start by describing the image you want for your meme. Our AI will generate a unique image based on your description.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">2. Add Your Text</h3>
          <p className="text-muted-foreground">
            Use the editor to add top and bottom text to your meme. You can customize the text content, position, and color.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">3. Customize the Look</h3>
          <p className="text-muted-foreground">
            Fine-tune your meme by adjusting text positions using sliders and selecting from various color options for perfect visibility.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">4. Download and Share</h3>
          <p className="text-muted-foreground">
            Once you're happy with your meme, click the download button to save it and share it with the world!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HowItWorks;