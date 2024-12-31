import { Button } from "@/components/ui/button";
import { Download, Share2, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MemeActionsProps {
  onDownload: () => void;
  imageUrl: string;
}

const MemeActions = ({ onDownload, imageUrl }: MemeActionsProps) => {
  const handleShare = async (platform: string) => {
    try {
      const url = window.location.href;
      const text = 'Check out this meme I created!';
      
      // Get the canvas element and convert it to a blob
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        throw new Error('Canvas element not found');
      }
      
      const imageBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      let shareUrl = '';
      switch (platform) {
        case 'facebook':
          // Facebook requires an app ID for sharing images directly
          // Fallback to URL sharing
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          window.open(shareUrl, '_blank', 'width=600,height=400');
          break;
          
        case 'twitter':
          // Twitter (X) only supports URL sharing through web intent
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
          window.open(shareUrl, '_blank', 'width=600,height=400');
          break;
          
        case 'whatsapp':
          // Create a temporary URL for the image
          const imageUrl = URL.createObjectURL(imageBlob);
          shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + imageUrl)}`;
          window.open(shareUrl);
          // Clean up the temporary URL after a delay
          setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
          break;
          
        case 'messenger':
          shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_FB_APP_ID&redirect_uri=${encodeURIComponent(url)}`;
          window.open(shareUrl, '_blank', 'width=600,height=400');
          break;
          
        case 'instagram':
          // Instagram doesn't support direct sharing, so we help users save the image
          const link = document.createElement('a');
          link.href = URL.createObjectURL(imageBlob);
          link.download = 'meme.png';
          link.click();
          URL.revokeObjectURL(link.href);
          toast.info("Image downloaded. You can now share it on Instagram!");
          break;
          
        case 'native':
          if (navigator.share) {
            try {
              const file = new File([imageBlob], 'meme.png', { type: 'image/png' });
              await navigator.share({
                title: 'Check out my meme!',
                text: text,
                files: [file]
              });
            } catch (error) {
              console.error('Error sharing:', error);
              // Fallback to URL sharing if file sharing fails
              await navigator.share({
                title: 'Check out my meme!',
                text: text,
                url: url
              });
            }
          } else {
            toast.error("Native sharing is not supported on your device");
          }
          break;
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share meme");
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={onDownload}
        className="w-full bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
        size="lg"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Meme
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            <Share2 className="w-5 h-5 mr-2" />
            Share Meme
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleShare('native')} className="gap-2">
            <Share2 className="w-4 h-4" /> Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('facebook')} className="gap-2">
            <Facebook className="w-4 h-4" /> Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('twitter')} className="gap-2">
            <Twitter className="w-4 h-4" /> Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('instagram')} className="gap-2">
            <Instagram className="w-4 h-4" /> Instagram
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="gap-2">
            <FaWhatsapp className="w-4 h-4" /> WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('messenger')} className="gap-2">
            <MessageCircle className="w-4 h-4" /> Messenger
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemeActions;