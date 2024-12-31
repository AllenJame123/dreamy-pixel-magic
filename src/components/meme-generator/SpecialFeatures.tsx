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
              <h3 className="font-semibold mb-2">AI-Powered Image Generation</h3>
              <p className="text-muted-foreground">
                Create unique meme images using advanced AI technology - just describe what you want!
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Classic Meme Text</h3>
              <p className="text-muted-foreground">
                Add top and bottom text to your meme in the classic Impact font style.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Real-Time Preview</h3>
              <p className="text-muted-foreground">
                See your meme come to life instantly as you add text and generate images.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Easy Download</h3>
              <p className="text-muted-foreground">
                Download your finished meme with one click, ready to share on social media.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpecialFeatures;