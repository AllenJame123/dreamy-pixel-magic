import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Can I use any kind of text description?</AccordionTrigger>
          <AccordionContent>
            Yes, you can use any descriptive text to generate images. For best results, be specific and detailed in your descriptions, including elements like style, colors, mood, and composition.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does it ensure my data&apos;s privacy?</AccordionTrigger>
          <AccordionContent>
            We take privacy seriously. Your prompts and generated images are not stored permanently, and we don&apos;t collect any personal information. All data is processed securely and temporarily.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can I use the art for commercial purposes?</AccordionTrigger>
          <AccordionContent>
            Yes, you can use the generated images for commercial purposes. You receive full rights to use the images you create. However, we recommend checking specific use cases with your legal advisor.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I use the tool on mobile devices?</AccordionTrigger>
          <AccordionContent>
            Yes, our AI Image Generator is fully responsive and works on all devices, including smartphones and tablets. The interface automatically adapts to your screen size for the best experience.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Are there any file size limits?</AccordionTrigger>
          <AccordionContent>
            Generated images are optimized for web use while maintaining high quality. The typical file size is between 1-3MB, making them perfect for various online applications and easy to download.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>How accurate is the art to my description?</AccordionTrigger>
          <AccordionContent>
            Our AI model strives to match your description as closely as possible. The accuracy depends on the clarity and detail of your prompt. More specific descriptions typically yield more accurate results.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What should I do if I encounter a problem?</AccordionTrigger>
          <AccordionContent>
            If you encounter any issues, try refreshing the page or clearing your browser cache. If the problem persists, you can try using a different browser or device. For technical support, please contact our support team.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;