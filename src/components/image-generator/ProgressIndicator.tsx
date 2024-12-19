import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  isGenerating: boolean;
  timer: number;
  progress: number;
}

const ProgressIndicator = ({ isGenerating, timer, progress }: ProgressIndicatorProps) => {
  if (!isGenerating) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Generating...</span>
        <span>{timer.toFixed(1)}s</span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
};

export default ProgressIndicator;