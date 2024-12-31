import { CheckCircle } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Special Features</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">AI-Powered Image Generation</h3>
              <p className="text-muted-foreground">
                Create unique, custom meme templates using our advanced AI - just describe what you want!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Smart Text Wrapping</h3>
              <p className="text-muted-foreground">
                Text automatically wraps and scales to fit perfectly within your meme, no matter how long it is.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Real-Time Preview</h3>
              <p className="text-muted-foreground">
                See your meme come to life instantly as you type, with immediate updates to both image and text.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">High-Quality Downloads</h3>
              <p className="text-muted-foreground">
                Download your memes in high-quality PNG format, perfect for sharing on any platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeatures;