import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Create a local preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageUploaded(url);
    toast.success('Image uploaded successfully');
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {!previewUrl ? (
        <Button 
          variant="outline" 
          className="w-full h-64 flex flex-col items-center justify-center gap-4 border-2 border-dashed"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8" />
          <div className="text-center">
            <p className="font-medium">Click to upload an image</p>
            <p className="text-sm text-muted-foreground">Supports: JPG, PNG</p>
          </div>
        </Button>
      ) : (
        <div className="relative border rounded-lg overflow-hidden bg-white">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-auto max-h-[500px] object-contain"
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreviewUrl(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Change Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;