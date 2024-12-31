import { Sparkles, Zap, Layout, FileImage, Coins, Download } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="py-8">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Why Choose Our Meme Generator?
        </h2>
        <p className="text-lg text-muted-foreground">
          Create unique, custom memes with powerful AI technology
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Sparkles className="w-5 h-5 text-primary" />}
          title="AI-Powered Images"
          description="Generate unique images based on your descriptions."
        />
        <FeatureCard
          icon={<Zap className="w-5 h-5 text-primary" />}
          title="Instant Generation"
          description="Create memes in seconds with our fast AI."
        />
        <FeatureCard
          icon={<Layout className="w-5 h-5 text-primary" />}
          title="Custom Text Placement"
          description="Add text to top and bottom with auto-sizing."
        />
        <FeatureCard
          icon={<FileImage className="w-5 h-5 text-primary" />}
          title="High Quality Output"
          description="Download your memes in high-resolution PNG format."
        />
        <FeatureCard
          icon={<Coins className="w-5 h-5 text-primary" />}
          title="100% Free"
          description="No registration or payment required."
        />
        <FeatureCard
          icon={<Download className="w-5 h-5 text-primary" />}
          title="Easy Download"
          description="Save your memes instantly with one click."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="p-4 rounded-lg bg-white/50 border border-gray-100 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-primary/10 p-2">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-base mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeatures;