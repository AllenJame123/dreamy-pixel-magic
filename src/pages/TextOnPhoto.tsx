import React from 'react';
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import HowItWorks from "@/components/text-on-photo/HowItWorks";

const TextOnPhoto = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Add Text to Photos</h1>
        <p className="text-xl text-muted-foreground">
          Easily add and customize text overlays on your images
        </p>
      </div>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <ImageUploader />
          <TextEditor />
        </div>
      </Card>

      <HowItWorks />
    </div>
  );
};

export default TextOnPhoto;