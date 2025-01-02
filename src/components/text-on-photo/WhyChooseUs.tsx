import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const WhyChooseUs = () => {
  return (
    <div className="mt-8 mb-12">
      <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Text Editor</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Easy to Use</h3>
              <p className="text-muted-foreground">
                Our intuitive interface makes it simple to add and customize text on your images without any design experience.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Professional Results</h3>
              <p className="text-muted-foreground">
                Create professional-looking images with perfectly positioned text and customizable styles.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Free to Use</h3>
              <p className="text-muted-foreground">
                Add text to your photos completely free, with no watermarks or hidden fees.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WhyChooseUs;