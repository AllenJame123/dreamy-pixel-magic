import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface GeneratedImageProps {
  imageURL: string;
  prompt: string;
  onDownload: () => void;
}

const GeneratedImage = ({ imageURL, prompt, onDownload }: GeneratedImageProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={imageURL}
            alt={prompt}
            className="w-full h-full object-contain"
            crossOrigin="anonymous"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground line-clamp-2">{prompt}</p>
          <Button onClick={onDownload} variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GeneratedImage;