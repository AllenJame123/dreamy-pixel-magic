import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const url = URL.createObjectURL(file);
    onImageUploaded(url);
    toast.success('Image uploaded successfully');
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="flex flex-col items-center gap-4">
        <Upload className="h-12 w-12 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-medium">Drag and drop an image here</p>
          <p className="text-sm text-muted-foreground">or click to upload</p>
          <p className="mt-2 text-sm text-muted-foreground">Supports: JPG, PNG, GIF</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;