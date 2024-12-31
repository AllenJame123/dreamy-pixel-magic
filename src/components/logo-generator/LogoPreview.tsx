import React from 'react';

interface LogoPreviewProps {
  editedLogo: string;
}

const LogoPreview = ({ editedLogo }: LogoPreviewProps) => {
  return (
    <div className="aspect-square relative rounded-lg overflow-hidden max-h-[300px]">
      {editedLogo ? (
        <img
          src={editedLogo}
          alt="Logo to edit"
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">No image loaded</span>
        </div>
      )}
    </div>
  );
};

export default LogoPreview;