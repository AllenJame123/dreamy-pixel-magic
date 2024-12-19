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
      className="w-full font-bold text-lg tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-primary/80 active:scale-95"
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