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
      className="relative w-full min-w-[130px] h-[40px] font-bold text-lg bg-[#3a86ff] shadow-[0_5px_#4433ff] border-none rounded-md transition-all duration-300 transform hover:shadow-[0_3px_#4433ff] hover:translate-y-[1px] active:shadow-[0_0_#4433ff] active:translate-y-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
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