import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { toast } from 'sonner';
import LogoCropper from './LogoCropper';
import LoadingOverlay from './LoadingOverlay';
import LogoPreview from './LogoPreview';
import DownloadOptions from './DownloadOptions';

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

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Enable CORS
        img.src = logoUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        setEditedLogo(logoUrl);
      } catch (error) {
        console.error('Error loading image:', error);
        toast.error('Failed to load image');
      } finally {
        setIsLoading(false);
      }
    };

    if (logoUrl) {
      loadImage();
    }

    return () => {
      // Cleanup
      setEditedLogo('');
      setIsLoading(false);
    };
  }, [logoUrl]);

  const handleCropComplete = (croppedImageUrl: string) => {
    setEditedLogo(croppedImageUrl);
    setShowCropper(false);
    toast.success('Logo cropped successfully!');
  };

  const handleDownload = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const size = parseInt(downloadSize);
      canvas.width = downloadShape === 'square' ? size : size;
      canvas.height = downloadShape === 'square' ? size : size * 0.75;

      const img = new Image();
      img.crossOrigin = "anonymous"; // Enable CORS
      img.src = editedLogo;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      if (downloadShape === 'circle') {
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
    return <LoadingOverlay />;
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

        <LogoPreview editedLogo={editedLogo} />

        <DownloadOptions
          downloadFormat={downloadFormat}
          setDownloadFormat={setDownloadFormat}
          downloadSize={downloadSize}
          setDownloadSize={setDownloadSize}
          downloadShape={downloadShape}
          setDownloadShape={setDownloadShape}
          onCrop={() => setShowCropper(true)}
          onDownload={handleDownload}
          isEnabled={!!editedLogo}
        />
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