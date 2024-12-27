import { Card } from "@/components/ui/card";

const FAQ = () => {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Can I use any kind of text description?
          </h3>
          <p className="text-muted-foreground">
            You can use detailed descriptions, but avoid explicit content, hate speech, or copyrighted characters. The more specific your prompt, the better the results.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            How does it ensure my data&apos;s privacy?
          </h3>
          <p className="text-muted-foreground">
            We never store your prompts or generated images. All data is automatically deleted after generation.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Can I use the art for commercial purposes?
          </h3>
          <p className="text-muted-foreground">
            Yes, you can use the generated images for commercial purposes. You receive full rights to use the images you create. However, we recommend checking specific use cases with your legal advisor.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            How accurate is the art to my description?
          </h3>
          <p className="text-muted-foreground">
            Our AI strives for high accuracy, but results may vary based on prompt clarity. Best results come from detailed, clear descriptions with specific style references.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            What should I do if I encounter a problem?
          </h3>
          <p className="text-muted-foreground">
            Contact our support team. Most issues can be resolved by refreshing the page or trying a different browser.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;