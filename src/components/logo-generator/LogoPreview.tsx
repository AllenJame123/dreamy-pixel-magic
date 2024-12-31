import React, { useState } from 'react';

interface LogoPreviewProps {
  editedLogo: string;
}

const LogoPreview = ({ editedLogo }: LogoPreviewProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Error loading image in preview:', e);
    console.log('Attempted image URL:', editedLogo);
    setImageError(true);
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully in preview');
    setImageError(false);
  };

  return (
    <div className="aspect-square relative rounded-lg overflow-hidden max-h-[300px] bg-gray-100 border border-gray-200">
      {editedLogo ? (
        <>
          <img
            src={editedLogo}
            alt="Logo to edit"
            className="w-full h-full object-contain"
            crossOrigin="anonymous"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageError ? 'none' : 'block' }}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500">
              Error loading image
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">No image loaded</span>
        </div>
      )}
    </div>
  );
};

export default LogoPreview;