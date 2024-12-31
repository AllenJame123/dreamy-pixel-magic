import { Button } from "@/components/ui/button";
import { Download, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";

interface MemeActionsProps {
  onDownload: () => void;
}

const MemeActions = ({ onDownload }: MemeActionsProps) => {
  const handleShare = async (platform: string) => {
    try {
      const url = window.location.href;
      const text = 'Check out this meme I created!';
      
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
          toast.info("To share on Instagram, please download the meme first and share it through the Instagram app.");
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
      
      <div className="grid grid-cols-3 gap-2">
        <Button
          onClick={() => handleShare('facebook')}
          variant="outline"
          className="flex items-center justify-center"
        >
          <Facebook className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={() => handleShare('twitter')}
          variant="outline"
          className="flex items-center justify-center"
        >
          <Twitter className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={() => handleShare('instagram')}
          variant="outline"
          className="flex items-center justify-center"
        >
          <Instagram className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={() => handleShare('whatsapp')}
          variant="outline"
          className="flex items-center justify-center"
        >
          <FaWhatsapp className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={() => handleShare('messenger')}
          variant="outline"
          className="flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MemeActions;