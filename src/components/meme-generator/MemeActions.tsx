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
      const imageBlob = await fetch(imageUrl).then(r => r.blob());
      
      let shareUrl = '';
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
          break;
        case 'messenger':
          shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_FB_APP_ID&redirect_uri=${encodeURIComponent(url)}`;
          break;
        case 'instagram':
          // For Instagram, we'll help users save the image first
          const link = document.createElement('a');
          link.href = URL.createObjectURL(imageBlob);
          link.download = 'meme.png';
          link.click();
          toast.info("Image downloaded. You can now share it on Instagram!");
          return;
        case 'native':
          if (navigator.share) {
            try {
              const file = new File([imageBlob], 'meme.png', { type: 'image/png' });
              await navigator.share({
                title: 'Check out my meme!',
                text: text,
                url: url,
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
          }
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
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