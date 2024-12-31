import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface MemeActionsProps {
  onDownload: () => void;
  imageUrl: string;
}

const MemeActions = ({ onDownload }: MemeActionsProps) => {
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
    </div>
  );
};

export default MemeActions;