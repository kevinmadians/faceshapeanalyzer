import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import FaceShapeResult, { FaceShapeResultRef } from '@/components/FaceShapeResult';
import LoadingScreen from '@/components/LoadingScreen';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Share2, ChevronLeft, Info, Sparkles, ArrowLeft, Camera, ArrowRight, Shield, Award, CheckCircle, Scissors, Glasses, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaceShapeIcon from '@/components/icons/FaceShapeIcon';
import SEO from '@/components/SEO';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const result = location.state?.result;
  const faceShapeResultRef = useRef<FaceShapeResultRef>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Face Shape Analysis',
        text: `Check out my face shape: ${result.primaryShape}`,
        url: window.location.href
      }).catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Share this link with your friends"
        });
      });
    }
  };
  
  const handleTryAgain = () => {
    navigate('/');
  };
  
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-primary/10">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <Info className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">No Result Found</h1>
          <p className="mb-6 text-muted-foreground">Please start a new analysis to see your personalized recommendations.</p>
          <Button onClick={handleTryAgain} className="w-full bg-primary hover:bg-primary/90">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Start New Analysis
          </Button>
        </div>
      </div>
    );
  }
  
  // Format result for the FaceShapeResult component
  const formattedResult = {
    primary: result.primaryShape,
    scores: result.scores,
    tips: result.tips,
    metrics: result.metrics || {},
    analysisDate: result.analysisDate || new Date().toISOString()
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <SEO 
        title="Your Results - Face Shape Analyzer"
        description="View your personalized face shape analysis results with custom style recommendations for hairstyles, glasses, beard styles, and makeup based on your facial features."
        canonicalUrl="/result"
        keywords="face shape result, face shape analysis, personalized style recommendations, hairstyle recommendations, glasses for face shape, face shape beauty tips"
        noIndex={true}
      />
      
      {/* Use the Navbar component instead of custom header */}
      <Navbar showTryItButton={false} />

      <main className="container px-4 pb-16 pt-8 md:pt-12 flex-grow">
        {/* Hero Section with Result */}
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <div className="flex gap-2 mb-3 justify-center">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs md:text-sm font-medium inline-flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Analysis Complete
            </span>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs md:text-sm font-medium">
              100% Private
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-xl md:text-2xl block text-muted-foreground mb-1">
              Your Face Shape Is
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {formattedResult.primary}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {formattedResult.primary === 'Oval' && 'You have the most versatile face shape! Your balanced proportions allow you to experiment with various styles.'}
            {formattedResult.primary === 'Round' && 'Your face shape exudes youthfulness with its soft, curved features and natural charm.'}
            {formattedResult.primary === 'Square' && 'Your strong, defined jawline gives you a naturally photogenic and confident appearance.'}
            {formattedResult.primary === 'Heart' && 'Your romantic face shape features a graceful taper from forehead to chin, creating an enchanting look.'}
            {formattedResult.primary === 'Oblong' && 'Your elegant face shape is characterized by refined length and graceful proportions.'}
            {formattedResult.primary === 'Diamond' && 'Your rare and striking face shape is defined by prominent cheekbones and refined features.'}
          </p>
          
          {/* Action Buttons - Moved to top for better visibility */}
          <div className="flex flex-col gap-4 justify-center mb-8 px-4 max-w-sm mx-auto w-full">
            <Button 
              onClick={handleTryAgain}
              variant="outline" 
              size="lg" 
              className="w-full py-6 text-base gap-2 border-primary/20 hover:bg-primary/5"
            >
              <Camera className="h-5 w-5" />
              Try Another Photo
            </Button>
            <Button 
              onClick={() => {
                // Scroll to the advanced analysis section
                document.getElementById('advanced-analysis-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="default" 
              size="lg" 
              className="w-full py-6 text-base gap-2 bg-primary hover:bg-primary/90"
            >
              <Award className="h-5 w-5" />
              View Advanced Analysis
            </Button>
          </div>
        </div>

        {/* Your Image and Match Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Image Card */}
          <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/10 pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm md:text-base">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <FaceShapeIcon className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                </div>
                Your Analyzed Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full">
                <img 
                  src={result.imageUrl} 
                  alt="Your face shape analysis" 
                  className="w-full h-auto object-contain max-h-[400px]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-semibold capitalize">{formattedResult.primary} Face Shape Detected</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Match Percentages Card */}
          <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow face-shape-match-analysis">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/10 pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm md:text-base">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                </div>
                Face Shape Match Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {Object.entries(formattedResult.scores)
                  .sort(([_, a], [__, b]) => Number(b) - Number(a))
                  .map(([shape, score], index) => (
                    <div key={shape} className="space-y-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize font-medium flex items-center gap-1.5">
                          <div className={`w-3 h-3 rounded-full ${
                            shape === formattedResult.primary ? 'bg-primary' : 'bg-muted'
                          }`} />
                          {shape}
                          {index === 0 && (
                            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                              Primary
                            </span>
                          )}
                        </span>
                        <span className="font-semibold">{Math.round(Number(score) * 100)}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${shape === formattedResult.primary ? 'bg-primary' : 'bg-muted-foreground/50'}`}
                          style={{ width: `${Number(score) * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
              
              <div className="mt-6 p-4 bg-accent/30 rounded-lg text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Our AI analyzes your facial features to identify the closest match among the six main face shapes, while detecting unique variations of your face.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Style Recommendations Feature Cards */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Your Personalized Style Guide</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Based on your {formattedResult.primary} face shape, we've created custom recommendations to enhance your natural features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="bg-lavender p-2 md:p-3 rounded-full">
                    <Scissors className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base md:text-lg">Perfect Hairstyles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base mb-2">
                  Hairstyles that complement your {formattedResult.primary.toLowerCase()} face shape, enhancing your natural features.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full border-primary/20 hover:bg-primary/5 text-primary"
                  onClick={() => document.getElementById('face-shape-tips')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See Recommendations
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="bg-lavender p-2 md:p-3 rounded-full">
                    <Glasses className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base md:text-lg">Flattering Glasses</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base mb-2">
                  Eyewear frames that balance your {formattedResult.primary.toLowerCase()} face shape for a harmonious look.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full border-primary/20 hover:bg-primary/5 text-primary"
                  onClick={() => document.getElementById('face-shape-tips')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See Recommendations
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="bg-lavender p-2 md:p-3 rounded-full">
                    <Palette className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base md:text-lg">Makeup Techniques</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base mb-2">
                  Makeup approaches that highlight and complement your {formattedResult.primary.toLowerCase()} face shape features.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full border-primary/20 hover:bg-primary/5 text-primary"
                  onClick={() => document.getElementById('face-shape-tips')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See Recommendations
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Understanding Your Face Shape Card - styled like homepage sections */}
        <section className="bg-violet-50 py-6 md:py-12 rounded-xl mb-12">
          <div className="container">
            <div className="text-center mb-6 md:mb-10">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Info className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Understanding Your Face Shape</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                {formattedResult.primary} Face Shape Features
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base">
                Learn about the unique characteristics of your face shape and how to enhance them
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-primary/10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <FaceShapeIcon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      Key Characteristics
                    </h3>
                    {formattedResult.primary === 'Oval' && (
                      <div className="space-y-2">
                        <p>An oval face shape is characterized by balanced proportions with the forehead slightly wider than the chin. The facial length is about one and a half times the width, creating a harmonious look that is often considered the most versatile face shape.</p>
                        <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                          <li>Forehead is slightly wider than the chin</li>
                          <li>Cheekbones are the widest part of the face</li>
                          <li>Jawline is rounded with a slightly curved chin</li>
                          <li>Face length is about 1.5 times the width</li>
                        </ul>
                      </div>
                    )}
                    {formattedResult.primary === 'Round' && (
                      <div className="space-y-2">
                        <p>A round face shape has similar width and length measurements with soft angles. The fullness in the cheeks creates a youthful appearance with minimal angles and a softly curved jawline.</p>
                        <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                          <li>Face length and width are similar measurements</li>
                          <li>Rounded jawline with minimal definition</li>
                          <li>Full cheeks creating soft contours</li>
                          <li>Rounded chin without sharp angles</li>
                        </ul>
                      </div>
                    )}
                    {formattedResult.primary === 'Square' && (
                      <div className="space-y-2">
                        <p>Square face shapes feature a strong, angular jawline with similar width measurements at the forehead, cheekbones, and jawline. This creates a structured, defined appearance that is often associated with strength and confidence.</p>
                        <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                          <li>Forehead, cheekbones, and jawline have similar widths</li>
                          <li>Defined, angular jawline</li>
                          <li>Minimal tapering at the chin</li>
                          <li>Straight sides from forehead to jaw</li>
                        </ul>
                      </div>
                    )}
                    {formattedResult.primary === 'Heart' && (
                      <div className="space-y-2">
                        <p>The heart face shape features a wider forehead that gradually narrows down to a pointed chin, creating a heart-like or inverted triangle appearance. This shape is known for its high cheekbones and romantic appeal.</p>
                        <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                          <li>Wider forehead that tapers to a narrow chin</li>
                          <li>High, pronounced cheekbones</li>
                          <li>Narrow jawline with a pointed chin</li>
                          <li>Often has a widow's peak hairline</li>
                        </ul>
                      </div>
                    )}
                    {formattedResult.primary === 'Oblong' && (
                      <div className="space-y-2">
                        <p>An oblong face shape is characterized by being longer than it is wide with fairly straight sides. The length creates an elegant appearance, though the face may appear narrow from the front.</p>
                        <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                          <li>Face length is notably greater than width</li>
                          <li>Forehead, cheekbones, and jawline have similar widths</li>
                          <li>Long, straight cheeks</li>
                          <li>Slightly rounded jawline</li>
                        </ul>
                      </div>
                    )}
                    {formattedResult.primary === 'Diamond' && (
                      <div className="space-y-2">
                        <p>Diamond face shapes feature high, dramatic cheekbones with a narrow forehead and jawline. This creates striking facial angles and is considered one of the rarest face shapes.</p>
                        <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                          <li>Narrow forehead that widens at the cheekbones</li>
                          <li>Cheekbones are the widest part of the face</li>
                          <li>Dramatic tapering to a pointed chin</li>
                          <li>Angular features with defined structure</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-3.5 w-3.5 text-primary" />
                      </div>
                      Celebrity Matches
                    </h3>
                    {formattedResult.primary === 'Oval' && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          You share your face shape with celebrities like <span className="font-medium text-foreground">Bella Hadid</span>, <span className="font-medium text-foreground">George Clooney</span>, <span className="font-medium text-foreground">Jessica Alba</span>, <span className="font-medium text-foreground">Julia Roberts</span>, and <span className="font-medium text-foreground">Ryan Gosling</span>. This shape is common among models and actors due to its balanced proportions.
                        </p>
                      </div>
                    )}
                    {formattedResult.primary === 'Round' && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          You share your face shape with celebrities like <span className="font-medium text-foreground">Selena Gomez</span>, <span className="font-medium text-foreground">Chrissy Teigen</span>, <span className="font-medium text-foreground">Leonardo DiCaprio</span>, <span className="font-medium text-foreground">Drew Barrymore</span>, and <span className="font-medium text-foreground">Ginnifer Goodwin</span>. Many use styling to add definition to their soft features.
                        </p>
                      </div>
                    )}
                    {formattedResult.primary === 'Square' && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          You share your face shape with celebrities like <span className="font-medium text-foreground">Angelina Jolie</span>, <span className="font-medium text-foreground">Brad Pitt</span>, <span className="font-medium text-foreground">Olivia Wilde</span>, <span className="font-medium text-foreground">Henry Cavill</span>, and <span className="font-medium text-foreground">Sandra Bullock</span>. This strong jawline is often considered very photogenic on camera.
                        </p>
                      </div>
                    )}
                    {formattedResult.primary === 'Heart' && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          You share your face shape with celebrities like <span className="font-medium text-foreground">Reese Witherspoon</span>, <span className="font-medium text-foreground">Scarlett Johansson</span>, <span className="font-medium text-foreground">Zac Efron</span>, <span className="font-medium text-foreground">Kourtney Kardashian</span>, and <span className="font-medium text-foreground">Ryan Reynolds</span>. Their pointed chins and wide foreheads create a distinctive look.
                        </p>
                      </div>
                    )}
                    {formattedResult.primary === 'Oblong' && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          You share your face shape with celebrities like <span className="font-medium text-foreground">Sarah Jessica Parker</span>, <span className="font-medium text-foreground">Ben Affleck</span>, <span className="font-medium text-foreground">Liv Tyler</span>, <span className="font-medium text-foreground">Adam Levine</span>, and <span className="font-medium text-foreground">Gisele Bundchen</span>. They often style their hair to add width to their elongated faces.
                        </p>
                      </div>
                    )}
                    {formattedResult.primary === 'Diamond' && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          You share your face shape with celebrities like <span className="font-medium text-foreground">Jennifer Lopez</span>, <span className="font-medium text-foreground">Robert Pattinson</span>, <span className="font-medium text-foreground">Ashley Greene</span>, <span className="font-medium text-foreground">Rihanna</span>, and <span className="font-medium text-foreground">Vanessa Hudgens</span>. This rare shape is known for its dramatic cheekbones.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Security Notice Card */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 md:p-8 text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary mr-2" />
            <h2 className="text-xl md:text-2xl font-bold">Your Privacy is Protected</h2>
          </div>
          <p className="text-muted-foreground mb-0 max-w-2xl mx-auto">
            Your photos are processed securely in your browser and never stored on our servers. 
            All analysis happens locally on your device, ensuring your privacy is maintained.
          </p>
        </div>
        
        {/* Main FaceShapeResult component with tips */}
        <div id="face-shape-tips">
          <FaceShapeResult 
            ref={faceShapeResultRef}
            result={formattedResult}
            imageUrl={result.imageUrl}
          />
        </div>
        
        {/* CTA Section */}
        <div className="rounded-xl p-6 md:p-8 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 border shadow-lg text-center max-w-4xl mx-auto mt-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Camera className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <h2 className="text-xl md:text-3xl font-bold">
              Ready to explore more styles?
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-2 md:mb-4 max-w-xl">
              Analyze another photo to refine your results or try different looks
            </p>
            <div className="flex flex-col w-full gap-3 max-w-sm">
              <Button 
                onClick={handleTryAgain}
                size="lg"
                className="w-full py-6 text-base gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <Camera className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Try Another Photo</span>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="w-full py-6 text-base gap-2 border-primary/20 hover:bg-primary/5 shadow hover:shadow-md transition-all duration-200 group"
              >
                <Link to="/face-shapes">
                  <Info className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Explore All Face Shapes</span>
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your photos are processed privately and never stored</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Use the Footer component */}
      <Footer />
    </div>
  );
};

export default Result;
