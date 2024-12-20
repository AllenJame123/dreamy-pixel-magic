import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 text-destructive">
      <AlertCircle className="h-4 w-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;