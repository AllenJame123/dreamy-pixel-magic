import Editor from "@/components/text-on-photo/Editor";
import HowItWorks from "@/components/text-on-photo/HowItWorks";
import WhyChooseUs from "@/components/text-on-photo/WhyChooseUs";
import FAQ from "@/components/text-on-photo/FAQ";

const TextOnPhoto = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Add Text to Photos Online</h1>
        <p className="text-lg text-muted-foreground">
          Easily add and customize text on your images with our free online editor
        </p>
      </div>

      <Editor />
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
    </div>
  );
};

export default TextOnPhoto;