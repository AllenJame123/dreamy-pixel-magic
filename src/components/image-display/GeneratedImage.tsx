import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface GeneratedImageProps {
  imageURL: string;
  prompt: string;
  onDownload: (format: string) => void;
}

const GeneratedImage = ({ imageURL, prompt, onDownload }: GeneratedImageProps) => {
  const [downloadFormat, setDownloadFormat] = useState('webp');

  return (
    <Card className="p-6 glass-panel space-y-4 animate-image-fade">
      <div className="flex justify-end gap-2 mb-4">
        <Select
          value={downloadFormat}
          onValueChange={setDownloadFormat}
        >
          <SelectTrigger className="w-[100px] bg-white/90 backdrop-blur-sm">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpg">JPG</SelectItem>
            <SelectItem value="webp">WebP</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => onDownload(downloadFormat)}
          variant="secondary"
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95"
        >
          <Download className="w-4 h-4 mr-2" />
          Download {downloadFormat.toUpperCase()}
        </Button>
      </div>
      
      <div className="aspect-square relative rounded-lg overflow-hidden">
        <img
          src={imageURL}
          alt={prompt}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        {prompt}
      </p>
    </Card>
  );
};

export default GeneratedImage;