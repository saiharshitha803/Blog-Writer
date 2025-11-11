
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      <h3 className="text-xl font-semibold mt-4 text-primary">Generating Outline...</h3>
      <p className="text-secondary-foreground mt-1">Our AI is crafting the perfect structure for your article. Please wait a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
