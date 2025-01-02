import { Card } from "@/components/ui/card";

const FAQ = () => {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            How do I add text to my photo?
          </h3>
          <p className="text-muted-foreground">
            Simply upload your image, click "Add Text", and start typing. You can drag the text to position it anywhere on your image and customize its appearance using the available options.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Can I customize the text style?
          </h3>
          <p className="text-muted-foreground">
            Yes! You can change the font family, size, color, and apply styles like bold, italic, or underline. The text is fully customizable to match your needs.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            What image formats are supported?
          </h3>
          <p className="text-muted-foreground">
            Our tool supports common image formats including JPG, PNG, and GIF. The final image will be downloaded as a high-quality PNG file.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Can I undo my changes?
          </h3>
          <p className="text-muted-foreground">
            Yes, you can undo your changes using the Undo button. This helps you easily correct any mistakes while editing.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;