
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface FaceShapeRadarChartProps {
  scores: Record<string, number>;
  primaryShape: string;
}

const FaceShapeRadarChart: React.FC<FaceShapeRadarChartProps> = ({ scores, primaryShape }) => {
  // Transform scores to data format needed for RadarChart
  const data = Object.entries(scores).map(([shape, value]) => ({
    shape: shape.charAt(0).toUpperCase() + shape.slice(1), // Capitalize first letter
    value: Number(value) * 100 // Convert to percentage
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="shape"
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Radar
            name="Face Shape Match"
            dataKey="value"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FaceShapeRadarChart;
