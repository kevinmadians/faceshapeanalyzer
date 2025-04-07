
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar } from 'recharts';
import { Check } from 'lucide-react';

export interface FaceShapeData {
  primary: string;
  scores: {
    [key: string]: number;
  };
  tips: {
    hairstyles: string[];
    glasses: string[];
    makeup: string[];
  };
}

interface FaceShapeResultProps {
  result: FaceShapeData;
  imageUrl: string;
  landmarks?: { x: number, y: number }[];
}

const FaceShapeResult: React.FC<FaceShapeResultProps> = ({ 
  result, 
  imageUrl,
  landmarks
}) => {
  const { primary, scores, tips } = result;
  
  // Prepare data for radar chart
  const chartData = Object.entries(scores).map(([shape, score]) => ({
    shape,
    score: Math.round(score * 100),
    fullMark: 100,
  }));

  return (
    <div className="w-full max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Your Face Shape Analysis</CardTitle>
            <CardDescription>
              Based on the facial landmarks we detected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 rounded-lg gradient-bg text-center">
              <h3 className="text-lg font-semibold mb-1 text-black">Your Primary Face Shape</h3>
              <p className="text-3xl font-bold capitalize mb-2 text-black">{primary}</p>
              <p className="text-black text-sm opacity-90">
                {primary === 'oval' && 'Balanced proportions with a slightly narrower forehead and jaw'}
                {primary === 'round' && 'Soft angles with similar width and length measurements'}
                {primary === 'square' && 'Strong jawline with similar width measurements throughout'}
                {primary === 'heart' && 'Wider forehead, prominent cheekbones and a pointed chin'}
                {primary === 'oblong' && 'Elongated face with similar width measurements throughout'}
                {primary === 'diamond' && 'Narrow forehead and jawline with prominent cheekbones'}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Face Shape Match Percentages</h4>
              {Object.entries(scores)
                .sort(([_, a], [__, b]) => b - a)
                .map(([shape, score], index) => (
                  <div key={shape} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      shape === primary ? 'bg-primary' : 'bg-muted'
                    }`} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize font-medium">{shape}</span>
                        <span>{Math.round(score * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${shape === primary ? 'bg-primary' : 'bg-muted-foreground/50'}`}
                          style={{ width: `${score * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Recommendations</CardTitle>
            <CardDescription>
              Styling tips customized for your {primary} face shape
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-lavender flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                Hairstyles
              </h4>
              <ul className="pl-8 list-disc space-y-1">
                {tips.hairstyles.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{tip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-softBlue flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                Glasses Frames
              </h4>
              <ul className="pl-8 list-disc space-y-1">
                {tips.glasses.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{tip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-softPink flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                Makeup Tips
              </h4>
              <ul className="pl-8 list-disc space-y-1">
                {tips.makeup.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Uploaded Photo</CardTitle>
            <CardDescription>
              {landmarks && landmarks.length > 0 
                ? 'With facial landmarks detected' 
                : 'Original upload without landmarks'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="relative rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Your uploaded face" 
                className="w-full h-auto"
              />
              {landmarks && landmarks.length > 0 && (
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 1 1"
                  preserveAspectRatio="none"
                >
                  {landmarks.map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="0.003"
                      fill="#7C3AED"
                      opacity={0.7}
                    />
                  ))}
                </svg>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaceShapeResult;
