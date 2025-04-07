
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  progress?: number;
  message?: string;
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  progress = 0, 
  message = "Analyzing your face shape...",
  isVisible 
}) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity">
      <div className="w-48 h-48 relative">
        {/* Pulsing ring animation */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-lavender animate-pulse-ring" />
        
        {/* Spinning circle */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin-slow" />
        
        {/* Progress circle */}
        {progress > 0 && (
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="38" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4"
              className="text-primary opacity-30" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="38" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4"
              className="text-primary" 
              strokeDasharray={`${2 * Math.PI * 38}`}
              strokeDashoffset={`${2 * Math.PI * 38 * (1 - progress / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
        )}
        
        {/* Progress percentage */}
        {progress > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
      
      <p className="mt-8 text-xl font-medium text-center">
        {message}
      </p>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs text-center">
        This may take a few moments. Please don't refresh the page.
      </p>
    </div>
  );
};

export default LoadingScreen;
