import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GeneratedImageProps {
  imageURL: string;
  prompt: string;
  onDownload: (format: string) => void;
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onDownload('png')}>
                Download as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload('jpg')}>
                Download as JPG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload('webp')}>
                Download as WebP
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default GeneratedImage;