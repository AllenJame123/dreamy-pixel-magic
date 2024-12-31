import React, { useState, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface LogoCropperProps {
  imageUrl: string;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
}

const LogoCropper = ({ imageUrl, onClose, onCropComplete }: LogoCropperProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Reset image loaded state when imageUrl changes
    setImageLoaded(false);
  }, [imageUrl]);

  const handleCropComplete = async () => {
    if (!completedCrop) {
      toast.error('Please select an area to crop');
      return;
    }

    try {
      const image = new Image();
      image.src = imageUrl;
      
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('No 2d context');
      }

      // Set canvas size to the crop size
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      // Draw the cropped image
      ctx.drawImage(
        image,
        completedCrop.x,
        completedCrop.y,
        completedCrop.width,
        completedCrop.height,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      // Convert to base64
      const croppedImageUrl = canvas.toDataURL('image/png');
      onCropComplete(croppedImageUrl);
      toast.success('Image cropped successfully!');
    } catch (error) {
      console.error('Error cropping image:', error);
      toast.error('Failed to crop image');
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Crop Logo</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="max-h-[60vh] overflow-auto">
          {imageUrl && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img
                src={imageUrl}
                alt="Logo to crop"
                className="max-w-full h-auto"
                onLoad={handleImageLoad}
              />
            </ReactCrop>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Click and drag to select the area you want to crop
          </div>
          <Button 
            onClick={handleCropComplete}
            className="ml-4"
            disabled={!imageLoaded}
          >
            Apply Crop
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoCropper;