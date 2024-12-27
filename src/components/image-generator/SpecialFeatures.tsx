import { Sparkles, Zap, Maximize, FileImage, Coins, Clock } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="py-16 px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          Why Choose this AI Image Generator?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the future of image creation with our powerful and user-friendly platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <FeatureCard
          icon={<Sparkles className="w-6 h-6 text-primary" />}
          title="State-of-the-Art AI"
          description="Create stunning visuals with exceptional precision."
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6 text-primary" />}
          title="No Registration"
          description="Start creating instantly, no sign-up needed."
        />
        <FeatureCard
          icon={<Maximize className="w-6 h-6 text-primary" />}
          title="Flexible Image Sizes"
          description="Any dimension you need, ready for all platforms."
        />
        <FeatureCard
          icon={<FileImage className="w-6 h-6 text-primary" />}
          title="Multiple Format Downloads"
          description="Get your images in PNG, JPG, WebP."
        />
        <FeatureCard
          icon={<Coins className="w-6 h-6 text-primary" />}
          title="Completely Free to Use"
          description="All features at zero cost, no hidden fees."
        />
        <FeatureCard
          icon={<Clock className="w-6 h-6 text-primary" />}
          title="Real-Time Generation"
          description="Get your images in seconds, no waiting time."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-background to-muted/30 p-6 shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="rounded-full bg-primary/10 p-3 ring-2 ring-primary/20 transition-all group-hover:ring-primary/30">
          {icon}
        </div>
        <h3 className="font-semibold text-xl text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SpecialFeatures;