import { Star, UserX, LayoutTemplate, Download, Coins, Zap } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Why Choose Our AI Image Generator?
        </h2>
        <p className="text-muted-foreground text-lg">
          Experience the future of image creation with our powerful and user-friendly platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">State-of-the-Art AI</h3>
            <p className="text-sm text-muted-foreground">
              Create stunning visuals with exceptional precision.
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <UserX className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">No Registration</h3>
            <p className="text-sm text-muted-foreground">
              Start creating instantly, no sign-up needed.
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <LayoutTemplate className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Flexible Image Sizes</h3>
            <p className="text-sm text-muted-foreground">
              Any dimension you need, ready for all platforms.
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Multiple Format Downloads</h3>
            <p className="text-sm text-muted-foreground">
              Get your images in PNG, JPG, WebP.
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Completely Free to Use</h3>
            <p className="text-sm text-muted-foreground">
              All features at zero cost, no hidden fees.
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Real-Time Generation</h3>
            <p className="text-sm text-muted-foreground">
              Get your images in seconds, no waiting time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeatures;