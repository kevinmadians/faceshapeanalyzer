
import React, { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import LoadingScreen from '@/components/LoadingScreen';
import FaceShapeResult from '@/components/FaceShapeResult';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw } from 'lucide-react';
import {
  initializeTensorFlow,
  loadModel,
  detectFaceLandmarks,
  FaceShapeResult as FaceShapeResultType
} from '@/services/faceShapeAnalyzer';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<{ file: File; url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modelReady, setModelReady] = useState(false);
  const [result, setResult] = useState<FaceShapeResultType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const prepareModel = async () => {
      try {
        await initializeTensorFlow();
        // Pre-load the model in the background
        await loadModel(setLoadingProgress);
        setModelReady(true);
      } catch (error) {
        console.error("Failed to initialize TensorFlow.js or load model:", error);
        toast({
          title: "Error Preparing Model",
          description: "Failed to initialize the face detection model. Please try refreshing the page.",
          variant: "destructive",
        });
      }
    };

    prepareModel();
  }, [toast]);

  const handleImageSelected = (file: File, imageUrl: string) => {
    setSelectedImage({ file, url: imageUrl });
    // Reset any previous results
    setResult(null);
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
    
    try {
      // Run face detection
      const detectionResult = await detectFaceLandmarks(selectedImage.url, setLoadingProgress);
      
      if (!detectionResult) {
        toast({
          title: "No Face Detected",
          description: "We couldn't detect a clear face in your image. Please try a different photo with a clear, front-facing view.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      setResult(detectionResult);
      
      // In a real-world application, you would save results to Supabase here
      // For this demo, we'll just use local state
      
    } catch (error) {
      console.error("Error during face analysis:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing your face shape. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-mesh">
      <header className="py-6 mb-6 border-b">
        <div className="container">
          <div className="flex items-center justify-center">
            <Camera className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold text-center">Face Shape Oracle</h1>
          </div>
          <p className="text-center mt-2 text-muted-foreground max-w-md mx-auto">
            Upload your photo to discover your face shape and get personalized style recommendations
          </p>
        </div>
      </header>
      
      <main className="container px-4 pb-16">
        {!result ? (
          <>
            <div className="max-w-xl mx-auto mb-8">
              <ImageUploader onImageSelected={handleImageSelected} />
            </div>
            
            {selectedImage && (
              <div className="text-center mt-8">
                <Button 
                  onClick={handleAnalyze} 
                  size="lg" 
                  disabled={loading || !modelReady}
                  className="px-8"
                >
                  {loading ? "Analyzing..." : "Analyze My Face Shape"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Your photo is processed locally in your browser and is not uploaded to any server
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-8 text-center">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Analyze Another Photo
              </Button>
            </div>
            
            <FaceShapeResult 
              result={{
                primary: result.primaryShape,
                scores: result.scores,
                tips: result.tips
              }} 
              imageUrl={result.imageUrl} 
              landmarks={result.landmarks}
            />
          </>
        )}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Face Shape Oracle &copy; {new Date().getFullYear()} - Face analysis runs entirely in your browser
          </p>
        </div>
      </footer>
      
      <LoadingScreen isVisible={loading} progress={loadingProgress} />
    </div>
  );
};

export default Index;
