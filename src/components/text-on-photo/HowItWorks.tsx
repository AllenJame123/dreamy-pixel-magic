import { Image, Text, Upload, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">How It Works</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            <h3 className="font-semibold text-lg">1. Upload Image</h3>
          </div>
          <p className="text-muted-foreground">
            Start by uploading your image. We support common image formats like JPG and PNG.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Text className="w-5 h-5" />
            <h3 className="font-semibold text-lg">2. Add Text</h3>
          </div>
          <p className="text-muted-foreground">
            Add your text (up to 100 characters) and customize its appearance with different colors and sizes. Click and drag to position your text anywhere on the image.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            <h3 className="font-semibold text-lg">3. Preview</h3>
          </div>
          <p className="text-muted-foreground">
            Preview your design in real-time. Make adjustments to the text position, size, and colors until you're satisfied with the result.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            <h3 className="font-semibold text-lg">4. Download</h3>
          </div>
          <p className="text-muted-foreground">
            Once you're happy with your design, download your image with the added text in high quality.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HowItWorks;