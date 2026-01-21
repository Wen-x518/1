import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="relative w-9 h-9 group cursor-pointer flex items-center justify-center">
      <div className="relative w-full h-full transition-transform duration-700 ease-in-out group-hover:rotate-180">
        
        {/* Top Left - Lightest Blue */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-broad-300 rounded-tl-xl rounded-br-md shadow-sm transition-all duration-500 group-hover:scale-90 group-hover:translate-x-0.5 group-hover:translate-y-0.5"></div>
        
        {/* Top Right - Medium Blue */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-broad-500 rounded-tr-xl rounded-bl-md shadow-sm transition-all duration-500 group-hover:scale-90 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"></div>
        
        {/* Bottom Right - Darkest Blue */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-broad-700 rounded-br-xl rounded-tl-md shadow-sm transition-all duration-500 group-hover:scale-90 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"></div>
        
        {/* Bottom Left - Medium Dark Blue */}
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-broad-400 rounded-bl-xl rounded-tr-md shadow-sm transition-all duration-500 group-hover:scale-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></div>
        
        {/* Center Void (Optional visual anchor) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
      </div>
    </div>
  );
};