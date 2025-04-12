import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, Share2, Download, Camera, ChevronDown, ChevronUp, Scissors, Glasses, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

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

  const renderTipCard = (
    title: string, 
    tips: string[], 
    icon: React.ReactNode, 
    showAll: boolean, 
    setShowAll: (value: boolean) => void,
    gradientClass: string
  ) => (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className={cn("pb-2", gradientClass)}>
        <CardTitle className="text-2xl flex items-center gap-2 text-white">
          <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {tips.slice(0, showAll ? undefined : 2).map((tip, i) => (
            <li key={i} className="flex items-start gap-3 group/tip hover:bg-accent p-3 rounded-lg transition-colors">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5 text-primary group-hover/tip:scale-110 transition-transform" />
              </span>
              <span className="text-foreground group-hover/tip:text-foreground transition-colors">{tip}</span>
            </li>
          ))}
        </ul>
        {tips.length > 2 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "mt-4 w-full font-medium",
              gradientClass.includes("violet") && "text-violet-600 hover:text-violet-700 hover:bg-violet-50",
              gradientClass.includes("blue") && "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
              gradientClass.includes("pink") && "text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            )}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <><ChevronUp className="h-4 w-4 mr-1" /> Show Less Tips</>
            ) : (
              <><ChevronDown className="h-4 w-4 mr-1" /> Show More Tips</>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Tabs defaultValue="recommendations" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 p-1 md:p-1.5">
          <TabsTrigger 
            value="recommendations" 
            className="text-xs md:text-sm lg:text-base px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <span className="flex items-center gap-1 md:gap-2">
              <Check className="hidden md:inline-block h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Styling Tips</span>
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            className="text-xs md:text-sm lg:text-base px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <span className="flex items-center gap-1 md:gap-2">
              <ChevronDown className="hidden md:inline-block h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Shape Analysis</span>
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="celebrities" 
            className="text-xs md:text-sm lg:text-base px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <span className="flex items-center gap-1 md:gap-2">
              <Share2 className="hidden md:inline-block h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Celebrity Matches</span>
            </span>
          </TabsTrigger>
        </TabsList>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTipCard(
              "Hairstyles",
              tips.hairstyles,
              <Scissors className="h-5 w-5 text-white" />,
              showAllHairstyles,
              setShowAllHairstyles,
              "bg-gradient-to-br from-violet-600 to-violet-700"
            )}
            
            {renderTipCard(
              "Glasses",
              tips.glasses,
              <Glasses className="h-5 w-5 text-white" />,
              showAllGlasses,
              setShowAllGlasses,
              "bg-gradient-to-br from-blue-600 to-blue-700"
            )}
            
            {renderTipCard(
              "Makeup",
              tips.makeup,
              <Palette className="h-5 w-5 text-white" />,
              showAllMakeup,
              setShowAllMakeup,
              "bg-gradient-to-br from-pink-600 to-pink-700"
            )}
          </div>
          
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-lavender/30 to-softBlue/30 rounded-xl backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2">Ready to Explore More Styles?</h3>
            <p className="text-muted-foreground mb-4">Try analyzing another photo to refine your results</p>
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Camera className="h-4 w-4" />
              Analyze Another Photo
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
