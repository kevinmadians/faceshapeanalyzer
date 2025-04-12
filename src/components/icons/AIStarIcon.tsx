import React from 'react';

interface AIStarIconProps {
  className?: string;
  color?: string;
}

const AIStarIcon: React.FC<AIStarIconProps> = ({ className = "h-6 w-6", color = "currentColor" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      
      {/* Main large sparkle */}
      <path 
        d="M12 2L14 9.5L21.5 12L14 14.5L12 22L10 14.5L2.5 12L10 9.5L12 2Z" 
        fill="white" 
      />
      
      {/* Small sparkle bottom left */}
      <path 
        d="M5 17L5.5 19L7.5 19.5L5.5 20L5 22L4.5 20L2.5 19.5L4.5 19L5 17Z" 
        fill="white" 
      />
      
      {/* Small sparkle middle left */}
      <path 
        d="M3 11L3.3 12.2L4.5 12.5L3.3 12.8L3 14L2.7 12.8L1.5 12.5L2.7 12.2L3 11Z" 
        fill="white" 
      />
    </svg>
  );
};

export default AIStarIcon; 