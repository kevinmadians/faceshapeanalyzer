import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ImageUploader from '@/components/ImageUploader';
import LoadingScreen from '@/components/LoadingScreen';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw, ArrowRight, Sparkles, Heart, Palette, Share2, Lock, Info, CheckCircle, ExternalLink, Users, Award, Check } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';
import {
  detectFaceLandmarks,
  FaceShapeResult as FaceShapeResultType,
  initializeTensorFlow,
  loadModel,
  resetModel
} from '@/services/faceShape';
import FaceShapeIcon from '@/components/icons/FaceShapeIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<{ file: File; url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [result, setResult] = useState<FaceShapeResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelError, setModelError] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadFaceModel = async () => {
    setModelError(false);
    setLoadingProgress(0);
    
    try {
      // Initialize TensorFlow
      await initializeTensorFlow(setLoadingProgress);
      
      // Load the model
      await loadModel(setLoadingProgress);
      
      console.log("Model loaded successfully");
      // Only show success message if user was previously seeing an error
      if (modelError) {
        toast({
          title: "Model Loaded",
          description: "Face detection model is now ready to use.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Failed to load model:", error);
      setModelError(true);
      setError("Face detection model failed to load. Please try refreshing the page.");
    }
  };

  useEffect(() => {
    // Start loading the model in the background without blocking the UI
    loadFaceModel();
  }, []);

  // Add useEffect to scroll to top if not already present
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageSelected = (file: File, imageUrl: string) => {
    setSelectedImage({ file, url: imageUrl });
    // Reset any previous results
    setResult(null);
    setError(null);
  };
  
  const handleImageCleared = () => {
    // Reset image-related state when the image is cleared
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };
  
  const handleRetryModelLoad = () => {
    // Reset the model state completely
    resetModel();
    setError(null);
    setModelError(false);
    
    // Show loading indicator
    setLoading(true);
    setLoadingMessage('Retrying model initialization...');
    setLoadingProgress(0);
    
    // Try to load the model again with a small delay
    setTimeout(() => {
      loadFaceModel()
        .then(() => {
          // Show success message
          toast({
            title: "Model Loaded Successfully",
            description: "You can now analyze your face shape.",
            variant: "default",
          });
        })
        .catch((error) => {
          console.error("Retry failed:", error);
          setModelError(true);
          setError("Face detection model failed to load. Please try using a different browser like Chrome.");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500); // Small delay before retry
  };
  
  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setLoadingProgress(0);
    setLoadingMessage('Analyzing your face shape...');
    setError(null);
    
    // Set start time to track minimum display duration
    const analysisStartTime = Date.now();
    const minimumAnalysisTime = 4000; // 4 seconds minimum display time
    
    try {
      // Try to initialize and load model if not already loaded
      try {
        await initializeTensorFlow(setLoadingProgress);
        await loadModel(setLoadingProgress);
      } catch (modelError) {
        console.error("Error loading model during analysis:", modelError);
        setModelError(true);
        toast({
          title: "Model Loading Error",
          description: "Could not load the face detection model. Please try refreshing the page.",
          variant: "destructive",
        });
        setLoading(false);
        setError("Face detection model is not available. Please refresh and try again.");
        return;
      }
      
      // Gradually increase progress for visual effect
      setLoadingProgress(35);
      setLoadingMessage('Scanning facial features...');
      
      // Run face detection
      const detectionResult = await detectFaceLandmarks(selectedImage.url, (progress) => {
        // Map the progress to the 35-85% range for visual effect
        setLoadingProgress(35 + (progress * 0.5));
      });
      
      // After detection, increase progress further
      setLoadingProgress(85);
      setLoadingMessage('Finalizing analysis...');
      
      if (!detectionResult) {
        toast({
          title: "No Face Detected",
          description: "We couldn't detect a clear face in your image. Please try a different photo with a clear, front-facing view.",
          variant: "destructive",
        });
        setError("No face detected in the image. Please upload a clear, front-facing photo.");
        setLoading(false);
        return;
      }
      
      setResult(detectionResult);
      
      // Calculate how much time has passed and wait if needed to meet minimum time
      const elapsedTime = Date.now() - analysisStartTime;
      const remainingTime = Math.max(0, minimumAnalysisTime - elapsedTime);
      
      if (remainingTime > 0) {
        // Show completion message but keep the loading screen
        setLoadingProgress(95);
        setLoadingMessage('Preparing your personalized results...');
        
        // Wait until minimum time has passed
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      // Final progress indication
      setLoadingProgress(100);
      
      // Short delay after 100% for visual completion
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Navigate to result page with the analysis result
      navigate('/result', { 
        state: { 
          result: {
            ...detectionResult,
            imageUrl: selectedImage.url
          }
        } 
      });
      
    } catch (error) {
      console.error("Error during face analysis:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Analysis failed: ${errorMessage}`);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <SEO 
        title="Face Shape Analyzer - AI-Powered Face Shape Analysis"
        description="Discover your perfect face shape with Face Shape Analyzer! Our advanced AI technology accurately detects whether your face is oblong, oval, round, diamond, square, or heart-shaped in seconds. Perfect for choosing the right hairstyle, glasses, or makeup style—Face Shape Analyzer helps you look your best with personalized insights. Fast, easy, and 100% free online tool. Try it now!"
        canonicalUrl="/"
        keywords="face shape analyzer, face shape identification, face shape quiz, what face shape do I have, online face analysis, face shape detection tool, hairstyle recommendations"
      />
      
      {/* Header with Navbar */}
      <Navbar />

      {/* Hero Section - Enhanced with more visual appeal */}
      <div className="bg-background">
        {/* Hero Section */}
        <section className="pt-4 pb-6 md:pt-12 md:pb-20">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8">
              <div className="lg:w-1/2">
                <div className="flex gap-2 mb-3 md:mb-4">
                  <span className="bg-primary/20 text-primary px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium">
                    AI-Powered
                  </span>
                  <span className="bg-primary/20 text-primary px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium">
                    Free
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 md:mb-6">
                  <span className="text-xl md:text-3xl lg:text-4xl block text-muted-foreground mb-1 md:mb-2">
                    Discover Your
                  </span>
                  <span className="text-primary">
                    Face Shape <span className="md:whitespace-nowrap">with AI</span>
                  </span>
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground max-w-md">
                  Our advanced AI analyzes your facial features to determine your face shape and provide personalized style recommendations.
                </p>
                <div className="hidden md:flex md:flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                  <div className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Heart</span>
                  </div>
                  <div className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Square</span>
                  </div>
                  <div className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Oval</span>
                  </div>
                  <div className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Round</span>
                  </div>
                  <div className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Diamond</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex lg:w-1/2 justify-center">
                <div className="relative">
                  <div className="p-2 rounded-2xl">
                    <div className="overflow-hidden">
                      <img 
                        src="/face-shape-icon.svg" 
                        alt="Face Shape Analysis" 
                        className="w-3/4 max-w-xs mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main className="container px-4 flex-grow">
        {/* Upload Section */}
        <section className="max-w-2xl mx-auto -mt-4 mb-8 md:mb-16 upload-section">
          <div className="bg-card rounded-xl shadow-sm p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center">Analyze Your Face Shape</h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-medium">{error}</p>
                <p className="text-sm mt-2">
                  {modelError ? (
                    <>
                      Please try 
                      <Button 
                        variant="link" 
                        className="text-red-700 p-0 h-auto font-medium"
                        onClick={handleRetryModelLoad}
                      >
                        clicking here to retry loading the model
                      </Button>, refreshing the page, or using a different browser like Chrome.
                    </>
                  ) : (
                    "Please try uploading a different photo or refresh the page."
                  )}
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              {/* Image Uploader Component */}
              <ImageUploader 
                onImageSelected={handleImageSelected} 
                onImageCleared={handleImageCleared}
              />
              
              {/* Analyze Button - Only appears when an image is selected */}
              {selectedImage && (
                <div className="text-center">
                  <Button 
                    onClick={handleAnalyze} 
                    size="lg" 
                    disabled={loading || modelError}
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    {loading ? "Analyzing..." : "Analyze My Face Shape"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Your photo is processed in your browser and not stored on any servers
                  </p>
                </div>
              )}
              
              {/* Tips for better photos */}
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="font-medium text-center text-primary mb-2">📸 Maximize Your Analysis Accuracy!</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li><strong>Choose a clear photo</strong> with good, even lighting</li>
                  <li><strong>Face the camera directly</strong> - avoid angles or tilted poses</li>
                  <li><strong>Pull back your hair</strong> to reveal your complete face shape</li>
                  <li><strong>Remove glasses</strong> for better facial feature detection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="bg-violet-50 py-6 md:py-12">
          <div className="container">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                Advanced Face Shape Analysis
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base">
                Our AI-powered technology accurately identifies your face shape and provides personalized recommendations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 md:pb-4">
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="bg-lavender p-2 md:p-3 rounded-full">
                      <FaceShapeIcon className="h-5 w-5 md:h-6 md:w-6 text-primary" color="#6D28D9" />
                    </div>
                    <CardTitle className="text-base md:text-lg">Personalized Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Get tailored style advice for hairstyles, glasses, and makeup that complement your face shape.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 md:pb-4">
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="bg-lavender p-2 md:p-3 rounded-full">
                      <img src="/face-shape-icon.svg" alt="Face Shape" className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <CardTitle className="text-base md:text-lg">AI-Powered Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Our advanced AI technology accurately analyzes your facial features to determine your face shape.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 md:pb-4">
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="bg-lavender p-2 md:p-3 rounded-full">
                      <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <CardTitle className="text-base md:text-lg">Privacy First</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Your photos are processed securely in your browser and never stored on our servers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-6 md:py-16">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <span className="text-lg md:text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">Upload Your Photo</h3>
              <p className="text-xs md:text-base text-muted-foreground">
                Take a clear, front-facing photo or upload an existing one
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <span className="text-lg md:text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">AI Analysis</h3>
              <p className="text-xs md:text-base text-muted-foreground">
                Our AI analyzes your facial features to determine your face shape
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <span className="text-lg md:text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">Get Recommendations</h3>
              <p className="text-xs md:text-base text-muted-foreground">
                Receive personalized style tips and recommendations
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 md:py-16">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Info className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">FAQ</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="max-w-3xl mx-auto divide-y">
              <div className="py-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">How accurate is the face shape analysis?</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  Our AI-powered analyzer has been trained on thousands of facial images and can accurately detect the primary characteristics of your face shape. However, face shapes exist on a spectrum, and many people have a combination of features.
                </p>
              </div>
              
              <div className="py-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">Is my photo stored anywhere?</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  No, your privacy is our priority. All processing happens directly in your browser, and your photos are never uploaded to or stored on our servers. The analysis results are only stored temporarily in your browser session.
                </p>
              </div>
              
              <div className="py-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">What kind of photo works best?</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  For the most accurate results, use a front-facing photo with good lighting, where your face is clearly visible. Pull hair away from your face, remove glasses if possible, and maintain a neutral expression looking directly at the camera.
                </p>
              </div>
              
              <div className="py-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">Why does the app need to use my camera?</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  We only access your camera if you choose to take a photo directly in the app. You can always upload an existing photo instead. Camera access is requested solely to provide you with the convenience of taking a photo without leaving the app.
                </p>
              </div>
              
              <div className="py-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">Can I save or share my results?</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  Yes! After analyzing your face shape, you can take a screenshot of your results or use the built-in share options to send your results to friends or save for reference when shopping for glasses, getting a haircut, or applying makeup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-6 md:py-16">
          <div className="container">
            <div className="rounded-xl p-4 md:p-8 bg-card border shadow-lg text-center max-w-4xl mx-auto">
              <h2 className="text-lg md:text-3xl font-bold mb-2 md:mb-4">
                Ready to discover your true face shape?
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-8 max-w-xl mx-auto">
                Join thousands who've unlocked their perfect style with our AI face shape analyzer.
              </p>
              <Button 
                onClick={() => document.querySelector('.upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="gap-2"
              >
                Try It Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      <LoadingScreen 
        isVisible={loading}
        progress={loadingProgress}
        message={loadingMessage} 
        imageUrl={selectedImage?.url}
      />
    </div>
  );
};

export default Index;
