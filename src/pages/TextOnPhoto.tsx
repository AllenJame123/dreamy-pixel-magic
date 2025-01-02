import { useState } from "react";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/text-on-photo/ImageUploader";
import TextEditor from "@/components/text-on-photo/TextEditor";
import TextControls from "@/components/text-on-photo/TextControls";
import TextAlignmentControls from "@/components/text-on-photo/TextAlignmentControls";
import { fabric } from "fabric";

const TextOnPhoto = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleImageUploaded = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setHasImage(true);
    console.log("Image URL received:", imageUrl); // Debug log
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Add Text to Photos</h1>
        <p className="text-xl text-muted-foreground">
          Upload an image and customize it with text
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <ImageUploader onImageUploaded={handleImageUploaded} />
        </Card>
        {hasImage && (
          <Card className="p-6 space-y-6">
            <TextEditor canvas={canvas} />
            <TextControls 
              canvas={canvas}
              canUndo={false}
              canRedo={false}
              onUndo={() => {}}
              onRedo={() => {}}
            />
            <TextAlignmentControls canvas={canvas} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default TextOnPhoto;