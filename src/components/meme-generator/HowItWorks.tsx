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
          <h3 className="font-semibold text-lg">1. Describe Your Meme Image</h3>
          <p className="text-muted-foreground">
            Start by describing the image you want for your meme in the prompt field. Our AI will generate a safe, appropriate image based on your description.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">2. Generate the Base Image</h3>
          <p className="text-muted-foreground">
            Click the "Generate Meme" button to create your custom meme template. The AI will process your description and create a unique image.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">3. Add Your Meme Text</h3>
          <p className="text-muted-foreground">
            Once your image is generated, add your text in the top and bottom text fields. You can preview how the text appears on your meme in real-time.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">4. Download Your Meme</h3>
          <p className="text-muted-foreground">
            Happy with your creation? Simply click the download button to save your meme as a high-quality PNG file, ready to be shared.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HowItWorks;