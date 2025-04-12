import { Palette } from 'lucide-react';
import React from 'react';

interface PaletteIconProps {
  className?: string;
}

const PaletteIcon = ({ className }: PaletteIconProps) => {
  return <Palette className={className} />;
};

export default PaletteIcon; 