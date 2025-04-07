
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, Share2, Download, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState<string>("recommendations");
  const [showAllHairstyles, setShowAllHairstyles] = useState(false);
  const [showAllGlasses, setShowAllGlasses] = useState(false);
  const [showAllMakeup, setShowAllMakeup] = useState(false);
  
  // Celebrity examples for each face shape (for engagement)
  const celebrityExamples: Record<string, string[]> = {
    'Oval': ['Bella Hadid', 'George Clooney', 'Jessica Alba'],
    'Round': ['Selena Gomez', 'Chrissy Teigen', 'Leonardo DiCaprio'],
    'Square': ['Angelina Jolie', 'Brad Pitt', 'Olivia Wilde'],
    'Heart': ['Reese Witherspoon', 'Ryan Gosling', 'Scarlett Johansson'],
    'Oblong': ['Sarah Jessica Parker', 'Ben Affleck', 'Liv Tyler'],
    'Diamond': ['Jennifer Lopez', 'Robert Pattinson', 'Ashley Greene']
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Photo Card - Centered at Top */}
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-center">Your Face Shape: <span className="text-primary capitalize">{primary}</span></CardTitle>
            <CardDescription className="text-center">
              {primary === 'oval' && 'Balanced proportions with a slightly narrower forehead and jaw'}
              {primary === 'round' && 'Soft angles with similar width and length measurements'}
              {primary === 'square' && 'Strong jawline with similar width measurements throughout'}
              {primary === 'heart' && 'Wider forehead, prominent cheekbones and a pointed chin'}
              {primary === 'oblong' && 'Elongated face with similar width measurements throughout'}
              {primary === 'diamond' && 'Narrow forehead and jawline with prominent cheekbones'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-2">
            <div className="relative rounded-md overflow-hidden w-64 h-64">
              <img 
                src={imageUrl} 
                alt="Your uploaded face" 
                className="w-full h-full object-cover"
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
          <CardFooter className="flex justify-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" /> Save
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Tabs for different content sections */}
      <Tabs defaultValue="recommendations" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="recommendations">Styling Tips</TabsTrigger>
          <TabsTrigger value="analysis">Shape Analysis</TabsTrigger>
          <TabsTrigger value="celebrities">Celebrity Matches</TabsTrigger>
        </TabsList>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </span>
                Recommended Hairstyles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.hairstyles.slice(0, showAllHairstyles ? undefined : 2).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              {tips.hairstyles.length > 2 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-primary" 
                  onClick={() => setShowAllHairstyles(!showAllHairstyles)}
                >
                  {showAllHairstyles ? (
                    <><ChevronUp className="h-4 w-4 mr-1" /> Show Less</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 mr-1" /> Show More</>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-softBlue flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </span>
                Glasses Frames
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.glasses.slice(0, showAllGlasses ? undefined : 2).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              {tips.glasses.length > 2 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-primary" 
                  onClick={() => setShowAllGlasses(!showAllGlasses)}
                >
                  {showAllGlasses ? (
                    <><ChevronUp className="h-4 w-4 mr-1" /> Show Less</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 mr-1" /> Show More</>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-softPink flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </span>
                Makeup Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.makeup.slice(0, showAllMakeup ? undefined : 2).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              {tips.makeup.length > 2 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-primary" 
                  onClick={() => setShowAllMakeup(!showAllMakeup)}
                >
                  {showAllMakeup ? (
                    <><ChevronUp className="h-4 w-4 mr-1" /> Show Less</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 mr-1" /> Show More</>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center p-4 bg-lavender/10 rounded-lg">
            <p className="text-muted-foreground">Want to experiment with different looks?</p>
            <Button className="mt-2 gap-2">
              <Camera className="h-4 w-4" />
              Try Another Photo
            </Button>
          </div>
        </TabsContent>
        
        {/* Analysis Tab */}
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Face Shape Match Percentages</CardTitle>
              <CardDescription>
                See how well your face matches with different face shapes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(scores)
                .sort(([_, a], [__, b]) => b - a)
                .map(([shape, score], index) => (
                  <div key={shape} className="space-y-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize font-medium flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${
                          shape === primary ? 'bg-primary' : 'bg-muted'
                        }`} />
                        {shape}
                      </span>
                      <span className="font-semibold">{Math.round(score * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${shape === primary ? 'bg-primary' : 'bg-muted-foreground/50'}`}
                        style={{ width: `${score * 100}%` }} 
                      />
                    </div>
                    {index === 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Your primary face shape based on our analysis
                      </p>
                    )}
                  </div>
                ))
              }
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Celebrities Tab */}
        <TabsContent value="celebrities">
          <Card>
            <CardHeader>
              <CardTitle>Celebrity Matches</CardTitle>
              <CardDescription>
                Famous people who share your {primary} face shape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(celebrityExamples[primary] || []).map((celebrity, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full mb-3 flex items-center justify-center text-2xl">
                      {celebrity.charAt(0)}
                    </div>
                    <p className="font-medium">{celebrity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>What Makes a {primary} Face Shape?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {primary === 'Oval' && 'Oval face shapes are characterized by balanced proportions with a slightly narrower forehead and jaw. The face length is about one and a half times the width.'}
                {primary === 'Round' && 'Round face shapes have soft angles with similar width and length measurements. The cheekbones are the widest part of the face with a rounded jawline.'}
                {primary === 'Square' && 'Square face shapes feature a strong, angular jawline with similar measurements at the forehead, cheekbones, and jaw line.'}
                {primary === 'Heart' && 'Heart face shapes have a wider forehead and cheekbones that narrow down to a small, sometimes pointed chin.'}
                {primary === 'Oblong' && 'Oblong face shapes are elongated with similar width measurements at the forehead, cheeks, and jawline.'}
                {primary === 'Diamond' && 'Diamond face shapes have a narrow forehead and jawline with the cheekbones as the widest part of the face.'}
              </p>
              <div className="p-4 border rounded-lg bg-accent flex gap-2 items-center">
                <div className="rounded-full bg-primary/20 p-2 flex-shrink-0">
                  <Camera className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">
                  Your unique facial structure is what makes you special. These categorizations are just guidelines to help with style choices.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FaceShapeResult;
