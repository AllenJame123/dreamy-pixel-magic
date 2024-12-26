import { Sparkles, UserX, LayoutTemplate, Download, Coins } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Why Choose Our AI Image Generator?
        </h2>
        <p className="text-muted-foreground">
          Experience the future of image creation with our powerful and user-friendly platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        <div className="glass-panel p-6 rounded-xl transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">State-of-the-Art AI</h3>
            <p className="text-sm text-muted-foreground">
              Our advanced AI algorithms create stunning visuals with exceptional precision and creativity.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <UserX className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">No Registration</h3>
            <p className="text-sm text-muted-foreground">
              Jump straight into creating - no accounts, no forms, no waiting.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <LayoutTemplate className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Flexible Image Sizes</h3>
            <p className="text-sm text-muted-foreground">
              Create images in any dimension you need, from social media posts to custom sizes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div className="glass-panel p-6 rounded-xl transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Download className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Multiple Format Downloads</h3>
            <p className="text-sm text-muted-foreground">
              Export your creations in PNG, JPG, WebP, and other popular formats.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Coins className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Completely Free to Use</h3>
            <p className="text-sm text-muted-foreground">
              Access all features with zero cost - no hidden fees or premium restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeatures;