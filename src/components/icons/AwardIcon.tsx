import { Award } from 'lucide-react';
import React from 'react';

interface AwardIconProps {
  className?: string;
}

const AwardIcon = ({ className }: AwardIconProps) => {
  return <Award className={className} />;
};

export default AwardIcon; 