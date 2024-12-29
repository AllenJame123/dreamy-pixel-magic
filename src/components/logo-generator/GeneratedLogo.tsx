import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Edit2 } from "lucide-react";

interface GeneratedLogoProps {
  logoUrl: string;
  prompt: string;
  onEdit: () => void;
  onDownload: () => void;
}

const GeneratedLogo = ({ logoUrl, prompt, onEdit, onDownload }: GeneratedLogoProps) => {
  return (
    <Card className="p-6 glass-panel space-y-4 animate-image-fade">
      <div className="flex justify-end gap-2 mb-4">
        <Button
          onClick={onEdit}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Logo
        </Button>
        <Button
          onClick={onDownload}
          variant="secondary"
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
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