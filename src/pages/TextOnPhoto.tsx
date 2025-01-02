import { useState } from "react";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import { fabric } from "fabric";

const TextOnPhoto = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [hasImage, setHasImage] = useState(false);

  const handleImageUploaded = (fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
    setHasImage(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Add Text to Photos</h1>
        <p className="text-xl text-muted-foreground">
          Upload an image and customize it with text
        </p>
      </div>

      <Card className="p-6">
        <ImageUploader onImageUploaded={handleImageUploaded} />
        {hasImage && canvas && <TextEditor canvas={canvas} />}
      </Card>
    </div>
  );
};

export default TextOnPhoto;