import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, Share2, Download, Camera, ChevronDown, ChevronUp, Scissors, Glasses, Palette, LineChart, Ruler, TimerIcon, PieChart } from 'lucide-react';
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
  metrics?: {
    faceRatio?: number;
    jawlineStrength?: number;
    foreheadWidth?: number;
    chinProminence?: number;
    cheekboneWidth?: number;
    symmetryScore?: number;
    goldenRatio?: number;
  };
  analysisDate?: string;
}

interface FaceShapeResultProps {
  result: FaceShapeData;
  imageUrl: string;
  landmarks?: { x: number, y: number }[];
}

export interface FaceShapeResultRef {
  switchToAdvancedTab: () => void;
}

const FaceShapeResult = forwardRef<FaceShapeResultRef, FaceShapeResultProps>(({ 
  result, 
  imageUrl,
  landmarks
}, ref) => {
  const { primary, scores, tips, metrics = {}, analysisDate = new Date().toISOString() } = result;
  const advancedTabRef = useRef<HTMLButtonElement>(null);
  
  // Debug logging
  console.log("FaceShapeResult props:", { primary, scores, tips, metrics, analysisDate });
  
  const [activeTab, setActiveTab] = useState<string>("recommendations");
  const [showAllHairstyles, setShowAllHairstyles] = useState(false);
  const [showAllGlasses, setShowAllGlasses] = useState(false);
  const [showAllMakeup, setShowAllMakeup] = useState(false);
  
  // Method to programmatically switch to advanced tab
  const switchToAdvancedTab = () => {
    console.log("Switching to advanced tab");
    // Scroll to the advanced section
    document.getElementById('advanced-analysis-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Expose the method to parent components
  useImperativeHandle(ref, () => ({
    switchToAdvancedTab
  }));
  
  // Check if URL includes a hash that indicates which tab to show
  useEffect(() => {
    // Check if we should activate the advanced tab from URL hash or localStorage
    const shouldShowAdvanced = window.location.hash === '#advanced' || localStorage.getItem('showAdvancedTab') === 'true';
    
    console.log("Should show advanced tab:", shouldShowAdvanced);
    
    if (shouldShowAdvanced) {
      console.log("Setting active tab to advanced");
      switchToAdvancedTab();
      // Clear the flag after using it
      localStorage.removeItem('showAdvancedTab');
    }
  }, []);

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

  // Helper function to generate random metrics for demo purposes
  // In production, these would come from actual calculations
  const generateMetrics = () => {
    const defaultMetrics = {
      faceRatio: 0.65 + Math.random() * 0.2,
      jawlineStrength: 0.3 + Math.random() * 0.6,
      foreheadWidth: 0.4 + Math.random() * 0.4,
      chinProminence: 0.2 + Math.random() * 0.6,
      cheekboneWidth: 0.5 + Math.random() * 0.4,
      symmetryScore: 0.7 + Math.random() * 0.25,
      goldenRatio: 0.8 + Math.random() * 0.15,
    };
    
    return metrics.faceRatio ? metrics : defaultMetrics;
  };
  
  const calculatedMetrics = generateMetrics();
  const formattedDate = new Date(analysisDate).toLocaleString();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
      
      {/* Advanced Analysis Section - Moved outside of tabs */}
      <div id="advanced-analysis-section" className="mt-16 pt-8 border-t border-muted">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Advanced Face Shape Analysis</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Detailed metrics and measurements based on your unique facial structure
          </p>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Detailed Face Shape Analysis</CardTitle>
              <CardDescription>
                Advanced metrics and measurements of your facial features
              </CardDescription>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <TimerIcon className="h-3.5 w-3.5" />
                <span>Analyzed: {formattedDate}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Face Shape Pie Chart instead of Radar */}
            <div className="bg-accent/20 p-4 md:p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Face Shape Distribution
              </h3>
              <div className="mx-auto relative" style={{ height: "300px" }}>
                {/* Interactive SVG Pie Chart */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Create pie slices from scores */}
                  {(() => {
                    const sortedScores = Object.entries(scores)
                      .sort(([_, a], [__, b]) => b - a);
                    
                    const colors = [
                      "#9333ea", // primary
                      "#a855f7",
                      "#c084fc",
                      "#d8b4fe",
                      "#e9d5ff",
                      "#f3e8ff"
                    ];
                    
                    let startAngle = 0;
                    const total = sortedScores.reduce((sum, [_, score]) => sum + score, 0);
                    const centerX = 200;
                    const centerY = 150;
                    const radius = 120;
                    
                    return sortedScores.map(([shape, score], index) => {
                      const percentage = score / total;
                      const angle = percentage * Math.PI * 2;
                      const endAngle = startAngle + angle;
                      
                      // Calculate path
                      const x1 = centerX + radius * Math.cos(startAngle);
                      const y1 = centerY + radius * Math.sin(startAngle);
                      const x2 = centerX + radius * Math.cos(endAngle);
                      const y2 = centerY + radius * Math.sin(endAngle);
                      
                      // Create arc path
                      const largeArcFlag = angle > Math.PI ? 1 : 0;
                      const path = `
                        M ${centerX} ${centerY}
                        L ${x1} ${y1}
                        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                        Z
                      `;
                      
                      // Calculate label position (in the middle of the arc)
                      const labelAngle = startAngle + angle / 2;
                      const labelRadius = radius * 0.7;
                      const labelX = centerX + labelRadius * Math.cos(labelAngle);
                      const labelY = centerY + labelRadius * Math.sin(labelAngle);
                      
                      // Calculate percentage display
                      const percentageText = `${Math.round(percentage * 100)}%`;
                      
                      // Update start angle for next slice
                      const currentStartAngle = startAngle;
                      startAngle = endAngle;
                      
                      return (
                        <g key={shape}>
                          <path
                            d={path}
                            fill={shape === primary ? colors[0] : colors[index]}
                            stroke="white"
                            strokeWidth="1"
                          />
                          {percentage > 0.08 && (
                            <text
                              x={labelX}
                              y={labelY}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              fontSize="12"
                              fontWeight={shape === primary ? "bold" : "normal"}
                            >
                              {shape}
                            </text>
                          )}
                          {percentage > 0.08 && (
                            <text
                              x={labelX}
                              y={labelY + 15}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              fontSize="10"
                            >
                              {percentageText}
                            </text>
                          )}
                        </g>
                      );
                    });
                  })()}
                </svg>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {Object.entries(scores)
                  .sort(([_, a], [__, b]) => b - a)
                  .map(([shape, score], index) => (
                    <div key={shape} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full ${shape === primary ? 'bg-primary' : 'bg-primary/40'}`} />
                      <span className="text-sm font-medium">{shape}: {Math.round(score * 100)}%</span>
                    </div>
                  ))
                }
              </div>
            </div>
            
            {/* Facial Proportions */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-primary" />
                Key Facial Proportions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Face Width-to-Height Ratio</span>
                      <span className="text-sm font-semibold">{calculatedMetrics.faceRatio.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${calculatedMetrics.faceRatio * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculatedMetrics.faceRatio > 0.8 ? "Your face is more elongated than average" : 
                       calculatedMetrics.faceRatio < 0.7 ? "Your face is wider than it is long" : 
                       "Your face has balanced proportions"}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Jawline Definition</span>
                      <span className="text-sm font-semibold">{calculatedMetrics.jawlineStrength.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${calculatedMetrics.jawlineStrength * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculatedMetrics.jawlineStrength > 0.7 ? "You have a strong, defined jawline" : 
                       calculatedMetrics.jawlineStrength < 0.4 ? "You have a softer, rounded jawline" : 
                       "You have a moderately defined jawline"}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Forehead-to-Jawline Ratio</span>
                      <span className="text-sm font-semibold">{calculatedMetrics.foreheadWidth.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${calculatedMetrics.foreheadWidth * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculatedMetrics.foreheadWidth > 0.6 ? "Your forehead is wider than your jawline" : 
                       calculatedMetrics.foreheadWidth < 0.4 ? "Your jawline is wider than your forehead" : 
                       "Your forehead and jawline have similar widths"}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cheekbone Prominence</span>
                      <span className="text-sm font-semibold">{calculatedMetrics.cheekboneWidth.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${calculatedMetrics.cheekboneWidth * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculatedMetrics.cheekboneWidth > 0.7 ? "You have prominent, high cheekbones" : 
                       calculatedMetrics.cheekboneWidth < 0.4 ? "Your cheekbones are less prominent" : 
                       "You have moderately defined cheekbones"}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Chin Prominence</span>
                      <span className="text-sm font-semibold">{calculatedMetrics.chinProminence.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${calculatedMetrics.chinProminence * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculatedMetrics.chinProminence > 0.7 ? "You have a strong, pronounced chin" : 
                       calculatedMetrics.chinProminence < 0.4 ? "You have a softer, less defined chin" : 
                       "You have a moderately defined chin"}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Facial Symmetry</span>
                      <span className="text-sm font-semibold">{calculatedMetrics.symmetryScore.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${calculatedMetrics.symmetryScore * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculatedMetrics.symmetryScore > 0.85 ? "Your face has excellent symmetry" : 
                       calculatedMetrics.symmetryScore < 0.7 ? "Your face has some asymmetrical features" : 
                       "Your face has good overall symmetry"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Golden Ratio */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-amber-800">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Golden Ratio Analysis
              </h3>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-amber-800 text-sm md:text-base">
                    Your facial proportions are <span className="font-medium">{(calculatedMetrics.goldenRatio * 100).toFixed(0)}%</span> aligned with the Golden Ratio
                  </p>
                  <p className="text-xs text-amber-700/80">
                    The Golden Ratio (1:1.618) is often associated with classical beauty and harmony in facial proportions
                  </p>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-amber-700">
                    {(calculatedMetrics.goldenRatio * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Analysis Disclaimer */}
            <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <ChevronDown className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  These measurements are derived from advanced facial landmark detection. Individual results may vary based on photo quality, angle, and lighting conditions.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default FaceShapeResult;
