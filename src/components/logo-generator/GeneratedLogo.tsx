import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Edit2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface GeneratedLogoProps {
  logoUrl: string;
  prompt: string;
  onEdit: () => void;
}

const GeneratedLogo = ({ logoUrl, prompt, onEdit }: GeneratedLogoProps) => {
  const [downloadFormat, setDownloadFormat] = useState('png');

  const handleDownload = async () => {
    try {
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `logo-${Date.now()}.${downloadFormat}`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Logo downloaded successfully!');
    } catch (error) {
      console.error('Error downloading logo:', error);
      toast.error('Failed to download logo');
    }
  };

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
          onClick={handleDownload}
          variant="secondary"
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95"
        >
          <Download className="w-4 h-4 mr-2" />
          Download {downloadFormat.toUpperCase()}
        </Button>
        <Button
          onClick={onEdit}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Logo
        </Button>
      </div>
      
      <div className="aspect-square relative rounded-lg overflow-hidden">
        <img
          src={logoUrl}
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

export default GeneratedLogo;