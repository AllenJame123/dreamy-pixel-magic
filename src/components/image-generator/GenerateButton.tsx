import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

const GenerateButton = ({ onClick, isGenerating, disabled }: GenerateButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full font-bold text-lg tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span className="font-medium">Generating...</span>
        </>
      ) : (
        <span className="font-medium">Generate Image</span>
      )}
    </Button>
  );
};

export default GenerateButton;