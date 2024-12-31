import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Crop, Download } from "lucide-react";

interface DownloadOptionsProps {
  downloadFormat: string;
  setDownloadFormat: (value: string) => void;
  downloadSize: string;
  setDownloadSize: (value: string) => void;
  downloadShape: string;
  setDownloadShape: (value: string) => void;
  onCrop: () => void;
  onDownload: () => void;
  isEnabled: boolean;
}

const DownloadOptions = ({
  downloadFormat,
  setDownloadFormat,
  downloadSize,
  setDownloadSize,
  downloadShape,
  setDownloadShape,
  onCrop,
  onDownload,
  isEnabled
}: DownloadOptionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Format</Label>
        <Select value={downloadFormat} onValueChange={setDownloadFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpg">JPG</SelectItem>
            <SelectItem value="webp">WebP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Size</Label>
        <Select value={downloadSize} onValueChange={setDownloadSize}>
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="256">256px</SelectItem>
            <SelectItem value="512">512px</SelectItem>
            <SelectItem value="1024">1024px</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Shape</Label>
        <Select value={downloadShape} onValueChange={setDownloadShape}>
          <SelectTrigger>
            <SelectValue placeholder="Select shape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
            <SelectItem value="rectangle">Rectangle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end gap-2">
        <Button 
          onClick={onCrop}
          className="flex-1"
          variant="outline"
          disabled={!isEnabled}
        >
          <Crop className="w-4 h-4 mr-2" />
          Crop
        </Button>
        <Button 
          onClick={onDownload}
          className="flex-1"
          variant="secondary"
          disabled={!isEnabled}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default DownloadOptions;