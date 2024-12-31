import { Card } from "@/components/ui/card";

const FAQ = () => {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            What file format will my favicon be in?
          </h3>
          <p className="text-muted-foreground">
            Your favicon will be generated in .ico format, which is the standard format supported by all modern web browsers.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            What size should my favicon be?
          </h3>
          <p className="text-muted-foreground">
            Our generator automatically creates favicons in the recommended 32x32 pixel size, which is the standard size for website favicons.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Can I use my generated favicon commercially?
          </h3>
          <p className="text-muted-foreground">
            Yes, all favicons generated through our platform are free for both personal and commercial use. You receive full rights to use them.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            How detailed should my favicon description be?
          </h3>
          <p className="text-muted-foreground">
            Be as specific as possible about colors, style, and design elements. For example, "minimalist blue letter A with rounded corners" is better than "letter A".
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            What if I'm not satisfied with the generated favicon?
          </h3>
          <p className="text-muted-foreground">
            You can try generating another favicon with a different description. There's no limit to how many favicons you can generate.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;