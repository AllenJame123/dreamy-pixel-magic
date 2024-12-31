import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Special Features</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Custom Text Positioning</h3>
              <p className="text-muted-foreground">
                Place your text anywhere on the image with our intuitive text positioning system.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Multiple Text Lines</h3>
              <p className="text-muted-foreground">
                Add multiple text lines to create more complex and engaging memes.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Font Customization</h3>
              <p className="text-muted-foreground">
                Choose from different font styles and sizes to match your meme's mood.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">High-Quality Export</h3>
              <p className="text-muted-foreground">
                Download your memes in high resolution, perfect for sharing on social media.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpecialFeatures;