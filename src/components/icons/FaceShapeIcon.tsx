import React from 'react';

interface FaceShapeIconProps {
  className?: string;
  color?: string;
}

const FaceShapeIcon: React.FC<FaceShapeIconProps> = ({ 
  className = "h-6 w-6", 
  color = "currentColor" 
}) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple oval face shape icon */}
      <ellipse 
        cx="50" 
        cy="50" 
        rx="30" 
        ry="40" 
        stroke={color} 
        strokeWidth="3" 
        fill="currentColor" 
        fillOpacity="0.1" 
      />
      {/* Eyes */}
      <circle cx="40" cy="40" r="4" fill={color} />
      <circle cx="60" cy="40" r="4" fill={color} />
      {/* Smile */}
      <path 
        d="M35 60 Q50 70 65 60" 
        stroke={color} 
        strokeWidth="2" 
        fill="none" 
      />
    </svg>
  );
};

export default FaceShapeIcon; 