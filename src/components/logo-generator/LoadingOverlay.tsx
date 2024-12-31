import React from 'react';
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Upload className="animate-pulse" />
          <span>Loading image...</span>
        </div>
      </Card>
    </div>
  );
};

export default LoadingOverlay;