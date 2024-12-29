import { Card } from "@/components/ui/card";

const FAQ = () => {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            What file formats are available for logo downloads?
          </h3>
          <p className="text-muted-foreground">
            You can download your generated logos in PNG, JPG, or WebP formats, suitable for different use cases and platforms.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Can I use the generated logos commercially?
          </h3>
          <p className="text-muted-foreground">
            Yes, all logos generated through our platform are free for commercial use. You receive full rights to use them for your business or project.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            How detailed should my logo description be?
          </h3>
          <p className="text-muted-foreground">
            The more specific your description, the better the results. Include details about style, colors, and any specific elements you want in your logo.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            How long does it take to generate a logo?
          </h3>
          <p className="text-muted-foreground">
            Logo generation typically takes 15-30 seconds. The exact time may vary based on the complexity of your request.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            What if I'm not satisfied with the generated logo?
          </h3>
          <p className="text-muted-foreground">
            You can try generating another logo with a more detailed or different description. There's no limit to how many logos you can generate.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;