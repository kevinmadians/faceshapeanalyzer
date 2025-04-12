import { Heart } from 'lucide-react';
import React from 'react';

interface HeartIconProps {
  className?: string;
}

const HeartIcon = ({ className }: HeartIconProps) => {
  return <Heart className={className} />;
};

export default HeartIcon; 