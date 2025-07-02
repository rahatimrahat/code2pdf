
import React from 'react';

const LoadingSpinner: React.FC<{ size?: string; text?: string }> = ({ size = 'h-8 w-8', text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${size} animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent`}
      ></div>
      {text && <p className="mt-2 text-sm text-slate-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
