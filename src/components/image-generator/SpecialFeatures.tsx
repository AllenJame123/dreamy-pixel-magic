import { Sparkles, UserX, LayoutTemplate, Download, Coins } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Why Choose Our AI Image Generator?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">State-of-the-Art AI</h3>
            <p className="text-sm text-muted-foreground">Our advanced AI algorithms create stunning visuals with exceptional precision and creativity.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <UserX className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">No Registration</h3>
            <p className="text-sm text-muted-foreground">Jump straight into creating - no accounts, no forms, no waiting.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <LayoutTemplate className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Flexible Image Sizes</h3>
            <p className="text-sm text-muted-foreground">Create images in any dimension you need, from social media posts to custom sizes.</p>
          </div>
        </div>
      </div>

      {/* Center container for the last two items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Download className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Multiple Format Downloads</h3>
            <p className="text-sm text-muted-foreground">Export your creations in PNG, JPG, WebP, and other popular formats.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Completely Free to Use</h3>
            <p className="text-sm text-muted-foreground">Access all features with zero cost - no hidden fees or premium restrictions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeatures;