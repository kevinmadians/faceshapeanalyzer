import React from 'react';

interface FaceShapeIconProps {
  className?: string;
  color?: string;
  animated?: boolean;
}

const FaceShapeIcon: React.FC<FaceShapeIconProps> = ({ 
  className = "h-6 w-6", 
  color = "currentColor",
  animated = false
}) => {
  // CSS for animations
  const floatingAnimation = `
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-5px) rotate(1deg); }
      50% { transform: translateY(0px) rotate(0deg); }
      75% { transform: translateY(5px) rotate(-1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes pulse {
      0% { opacity: 0.8; }
      50% { opacity: 1; }
      100% { opacity: 0.8; }
    }
    
    @keyframes blink {
      0% { transform: scaleY(1); }
      5% { transform: scaleY(0.1); }
      10% { transform: scaleY(1); }
      100% { transform: scaleY(1); }
    }
    
    .face-container {
      animation: float 6s ease-in-out infinite;
      transform-origin: center;
    }
    
    .face-shape {
      animation: pulse 4s ease-in-out infinite;
    }
    
    .eye {
      animation: blink 6s infinite;
      transform-origin: center;
      animation-delay: ${Math.random() * 2}s;
    }
    
    .smile {
      animation: pulse 5s ease-in-out infinite;
      animation-delay: 1s;
    }
  `;

  return (
    <>
      {animated && <style>{floatingAnimation}</style>}
      <svg 
        className={`${className} ${animated ? 'face-container' : ''}`}
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
          className={animated ? 'face-shape' : ''}
        />
        {/* Eyes */}
        <circle cx="40" cy="40" r="4" fill={color} className={animated ? 'eye' : ''} />
        <circle cx="60" cy="40" r="4" fill={color} className={animated ? 'eye' : ''} />
        {/* Smile */}
        <path 
          d="M35 60 Q50 70 65 60" 
          stroke={color} 
          strokeWidth="2" 
          fill="none" 
          className={animated ? 'smile' : ''}
        />
      </svg>
    </>
  );
};

export default FaceShapeIcon; 