import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface MemeActionsProps {
  onDownload: () => void;
}

const MemeActions = ({ onDownload }: MemeActionsProps) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my meme!',
          text: 'I created this meme using the AI Meme Generator',
          url: window.location.href
        });
      } else {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share meme");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={onDownload}
        className="flex-1 bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
        size="lg"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Meme
      </Button>
      <Button
        onClick={handleShare}
        variant="secondary"
        size="lg"
        className="bg-white/90 hover:bg-white/95 transition-colors duration-200"
      >
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default MemeActions;