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
            Start by describing the image you want for your meme. Our AI will create a unique, custom image based on your description.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">2. Add Your Text</h3>
          <p className="text-muted-foreground">
            Add your meme text in the top and bottom text fields. The text will automatically wrap and fit within the image.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">3. Preview Your Meme</h3>
          <p className="text-muted-foreground">
            See your meme update in real-time as you type. The preview shows exactly how your meme will look when downloaded.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">4. Download Your Creation</h3>
          <p className="text-muted-foreground">
            Once you're happy with your meme, simply click the download button to save it to your device.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HowItWorks;