import { Sparkles, Zap, Maximize, FileImage, Coins, Clock } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="py-8">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Why Choose this AI Image Generator?
        </h2>
        <p className="text-lg text-muted-foreground">
          Experience the future of image creation with our powerful platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Sparkles className="w-5 h-5 text-primary" />}
          title="State-of-the-Art AI"
          description="Create stunning visuals with exceptional precision."
        />
        <FeatureCard
          icon={<Zap className="w-5 h-5 text-primary" />}
          title="No Registration"
          description="Start creating instantly, no sign-up needed."
        />
        <FeatureCard
          icon={<Maximize className="w-5 h-5 text-primary" />}
          title="Flexible Image Sizes"
          description="Any dimension you need, ready for all platforms."
        />
        <FeatureCard
          icon={<FileImage className="w-5 h-5 text-primary" />}
          title="Multiple Format Downloads"
          description="Get your images in PNG, JPG, WebP."
        />
        <FeatureCard
          icon={<Coins className="w-5 h-5 text-primary" />}
          title="Completely Free to Use"
          description="All features at zero cost, no hidden fees."
        />
        <FeatureCard
          icon={<Clock className="w-5 h-5 text-primary" />}
          title="Real-Time Generation"
          description="Get your images in seconds, no waiting time."
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