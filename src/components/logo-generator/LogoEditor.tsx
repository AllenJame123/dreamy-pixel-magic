import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, Crop, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import LogoCropper from './LogoCropper';
import { toast } from 'sonner';

interface LogoEditorProps {
  logoUrl: string;
  onClose: () => void;
}

const LogoEditor = ({ logoUrl, onClose }: LogoEditorProps) => {
  const [showCropper, setShowCropper] = useState(false);
  const [editedLogo, setEditedLogo] = useState('');
  const [downloadFormat, setDownloadFormat] = useState("png");
  const [downloadSize, setDownloadSize] = useState("512");
  const [downloadShape, setDownloadShape] = useState("square");
  const [isLoading, setIsLoading] = useState(true);

  // Load the initial image when the component mounts
  React.useEffect(() => {
    const loadImage = async () => {
      try {
        const img = new Image();
        img.src = logoUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        setEditedLogo(logoUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading image:', error);
        toast.error('Failed to load image');
        setIsLoading(false);
      }
    };
    loadImage();
  }, [logoUrl]);

  const handleCropComplete = (croppedImageUrl: string) => {
    setEditedLogo(croppedImageUrl);
    setShowCropper(false);
    toast.success('Logo cropped successfully!');
  };

  const handleDownload = async () => {
    try {
      // Create a canvas with the desired size
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Set canvas dimensions
      const size = parseInt(downloadSize);
      canvas.width = downloadShape === 'square' ? size : size;
      canvas.height = downloadShape === 'square' ? size : size * 0.75;

      // Create a temporary image to load the base64 data
      const img = new Image();
      img.src = editedLogo;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Draw the image on the canvas with the desired shape
      if (downloadShape === 'circle') {
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to blob and download
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logo-${Date.now()}.${downloadFormat}`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Logo downloaded successfully!');
      }, `image/${downloadFormat}`);
    } catch (error) {
      console.error('Error downloading logo:', error);
      toast.error('Failed to download logo');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Upload className="animate-pulse" />
            <span>Loading image...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white rounded-lg max-w-xl w-full mx-auto space-y-4 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Edit Logo</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="aspect-square relative rounded-lg overflow-hidden max-h-[300px]">
          {editedLogo ? (
            <img
              src={editedLogo}
              alt="Logo to edit"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image loaded</span>
            </div>
          )}
        </div>

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
              onClick={() => setShowCropper(true)}
              className="flex-1"
              variant="outline"
              disabled={!editedLogo}
            >
              <Crop className="w-4 h-4 mr-2" />
              Crop
            </Button>
            <Button 
              onClick={handleDownload}
              className="flex-1"
              variant="secondary"
              disabled={!editedLogo}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>

      {showCropper && editedLogo && (
        <LogoCropper
          imageUrl={editedLogo}
          onClose={() => setShowCropper(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default LogoEditor;