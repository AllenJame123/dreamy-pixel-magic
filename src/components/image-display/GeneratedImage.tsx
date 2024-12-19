import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from 'sonner';

interface GeneratedImageProps {
  imageURL: string;
  prompt: string;
  onDownload: () => void;
}

const GeneratedImage = ({ imageURL, prompt, onDownload }: GeneratedImageProps) => {
  return (
    <Card className="p-6 glass-panel space-y-4 animate-image-fade">
      <div className="aspect-square relative rounded-lg overflow-hidden">
        <img
          src={imageURL}
          alt={prompt}
          className="w-full h-full object-cover"
        />
        <Button
          onClick={onDownload}
          className="absolute bottom-4 right-4"
          variant="secondary"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        {prompt}
      </p>
    </Card>
  );
};

export default GeneratedImage;