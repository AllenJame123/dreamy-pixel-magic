import ImageGenerator from "@/components/ImageGenerator";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Image Generator</h1>
          <p className="text-gray-600 mb-8 text-center">
            Create stunning AI-generated images from text descriptions. No sign-up required!
          </p>
          <ImageGenerator />
        </Card>
      </div>
    </div>
  );
};

export default Index;