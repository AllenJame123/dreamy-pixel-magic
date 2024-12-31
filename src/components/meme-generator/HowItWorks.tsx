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
            Start by describing the image you want for your meme. Our AI will generate a unique, appropriate image based on your description. Keep it fun and family-friendly!
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">2. Add Your Text</h3>
          <p className="text-muted-foreground">
            Once your image is generated, add your meme text. You can add text at the top and bottom of the image. See your changes in real-time as you type!
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">3. Preview and Adjust</h3>
          <p className="text-muted-foreground">
            Preview your meme exactly as it will look. The text automatically adjusts to fit the image perfectly, with a stroke outline to ensure readability on any background.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">4. Download and Share</h3>
          <p className="text-muted-foreground">
            Happy with your creation? Download your meme in high quality, ready to share with friends or on social media. Your meme is saved in PNG format for the best quality.
          </p>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Pro Tip:</strong> For the best results, be specific in your image description and keep your text concise and punchy. The more specific your description, the better the AI-generated image will match your vision!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HowItWorks;