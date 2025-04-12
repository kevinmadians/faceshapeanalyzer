import React, { useEffect, useState, memo } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  progress?: number;
  message?: string;
  isVisible: boolean;
  imageUrl?: string;
}

// Using memo to prevent unnecessary re-renders
const LoadingScreen: React.FC<LoadingScreenProps> = memo(({ 
  progress = 0, 
  message = "Analyzing your face shape...",
  isVisible,
  imageUrl
}) => {
  const [mounted, setMounted] = useState(false);
  
  // Avoid animation start during initial mount (prevents jank)
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    }
    return () => setMounted(false);
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  // Memoize static values
  const dashArray = 2 * Math.PI * 38;
  const dashOffset = dashArray * (1 - progress / 100);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl px-4 relative">
        {/* Enhanced image with scanning effect */}
        {imageUrl && (
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-xl border border-primary/30 animate-glow-pulse">
            {/* Larger and more performance-optimized container */}
            <div className="w-full" style={{ contain: 'paint' }}>
              <img 
                src={imageUrl} 
                alt="Scanning" 
                className="w-full h-auto object-contain max-h-[400px] md:max-h-[450px]"
                style={{ 
                  display: 'block',
                  contain: 'layout'
                }}
              />
              
              {/* Enhanced grid pattern using CSS background with animation */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-30 animate-grid-pulse"
                style={{ 
                  backgroundImage: 'linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  transform: 'translateZ(0)' // Force GPU rendering
                }}
              />
              
              {/* Enhanced scanning effect with horizontal animation */}
              {mounted && (
                <>
                  {/* Horizontal scanning beam */}
                  <div 
                    className="absolute top-1/2 left-0 h-3 bg-gradient-to-r from-primary/30 via-primary/80 to-primary/30 animate-scan-horizontal"
                    style={{
                      boxShadow: '0 0 12px 4px rgba(124, 58, 237, 0.5)',
                      transform: 'translateY(-50%) translateZ(0)', // Center it vertically
                      willChange: 'transform, width, opacity',
                      borderRadius: '100px'
                    }}
                  />
                  
                  {/* Additional vertical scan line for more dynamic effect */}
                  <div 
                    className="absolute left-1/2 top-0 w-2 h-full bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-scan-down"
                    style={{
                      boxShadow: '0 0 8px 3px rgba(124, 58, 237, 0.3)',
                      transform: 'translateX(-50%) translateZ(0)', // Center it horizontally
                      willChange: 'transform'
                    }}
                  />
                </>
              )}
            </div>
            
            {/* Enhanced face detection indicators */}
            {progress < 80 ? (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  {/* Outer pulse ring */}
                  <div 
                    className="w-20 h-20 rounded-full border-2 border-dashed border-primary/80 animate-pulse-ring"
                    style={{ transform: 'translateZ(0)' }}
                  />
                  
                  {/* Inner ring for more visual interest */}
                  <div 
                    className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 animate-fade-pulse"
                    style={{ transform: 'translate(-50%, -50%) translateZ(0)' }}
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Enhanced measurement guides */}
                <div className="absolute top-0 left-1/2 h-full w-[1px] bg-primary/50 transform -translate-x-[0.5px]" style={{ transform: 'translateX(-0.5px) translateZ(0)' }} />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/50 transform -translate-y-[0.5px]" style={{ transform: 'translateY(-0.5px) translateZ(0)' }} />
                
                {/* Face shape outline that appears when near completion */}
                <div 
                  className="absolute top-1/2 left-1/2 w-48 h-64 rounded-full border border-primary/60 -translate-x-1/2 -translate-y-1/2 animate-fade-pulse"
                  style={{ 
                    transform: 'translate(-50%, -50%) translateZ(0)',
                    borderRadius: '40% 40% 40% 40% / 50% 50% 40% 40%' // Approximate oval face shape
                  }}
                />
              </div>
            )}
            
            {/* Percentage overlay on the image */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-primary/30">
              <span className="text-lg font-bold text-primary">{Math.round(progress)}%</span>
            </div>
          </div>
        )}
        
        {/* Enhanced fallback spinner when no image */}
        {!imageUrl && (
          <div className="w-40 h-40 relative mx-auto mb-8">
            <div 
              className="absolute inset-0 rounded-full bg-lavender/40 animate-pulse-ring"
              style={{ transform: 'translateZ(0)' }}
            />
            <div 
              className="absolute inset-2 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"
              style={{ transform: 'translateZ(0)' }}
            />
            <div 
              className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin-slow"
              style={{ transform: 'translateZ(0)', animationDirection: 'reverse', animationDuration: '3s' }}
            />
          </div>
        )}
        
        {/* More visually appealing progress bar */}
        <div className="w-full h-4 bg-accent/80 rounded-full overflow-hidden mb-6 backdrop-blur-sm shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-lavender via-primary to-violet-500 flex items-center justify-end pr-1"
            style={{ 
              width: `${progress}%`,
              transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateZ(0)',
              boxShadow: '0 0 8px 0 rgba(124, 58, 237, 0.4)'
            }}
          >
            {progress > 10 && (
              <span className="text-[10px] text-white font-medium drop-shadow-sm">{Math.round(progress)}%</span>
            )}
          </div>
        </div>
      
        {/* Enhanced progress messages */}
        <div className="text-center max-w-md mx-auto">
          <p className="mt-2 text-xl font-medium">
            {message}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {progress < 30 
              ? "Detecting facial features and analyzing proportions..." 
              : progress < 60 
                ? "Calculating facial measurements and ratios..." 
                : progress < 90 
                  ? "Determining your face shape and unique features..." 
                  : "Almost there! Preparing your personalized recommendations..."}
          </p>
        </div>
      </div>
    </div>
  );
});

export default LoadingScreen;
