import { Download, Rocket, Sparkles } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="border-t pt-4 mt-4">
      <h2 className="text-lg font-semibold mb-3 text-center">What Makes This Special</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm max-w-4xl mx-auto">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
          <p>Fast and efficient image generation powered by state-of-the-art AI technology</p>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <p>Unique artistic style that combines creativity with precision, perfect for creating stunning visuals</p>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-primary" />
          </div>
          <p>Download your generated images in multiple formats (PNG, JPG, WebP) to suit your needs</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeatures;